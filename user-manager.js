/**
 * FIQuest User Management System
 * Handles player data persistence and synchronization
 */

/**
 * Browser Timezone and DateTime Utilities
 * Provides accurate local time regardless of server timezone
 */
class DateTimeUtils {
    static getUserLocalDate() {
        const now = new Date();
        return {
            date: now.toLocaleDateString('en-US'), // MM/DD/YYYY format
            time: now.toLocaleTimeString('en-US'), // HH:MM:SS AM/PM format
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            iso: now.toISOString(),
            timestamp: now.getTime()
        };
    }

    static getFilenameDateFormat() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const year = String(now.getFullYear()).slice(-2);
        return `${month}${day}${year}`; // e.g., "091025"
    }

    static formatDateForDisplay(date = new Date()) {
        return {
            short: date.toLocaleDateString('en-US'), // 9/10/2025
            long: date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }), // Tuesday, September 10, 2025
            time: date.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            }) // 3:45 PM
        };
    }

    static getTimezoneInfo() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const now = new Date();
        const offsetMinutes = now.getTimezoneOffset();
        const offsetHours = Math.abs(offsetMinutes / 60);
        const offsetSign = offsetMinutes > 0 ? '-' : '+';
        
        return {
            timezone: timezone,
            offset: `UTC${offsetSign}${offsetHours}`,
            name: timezone.split('/').pop().replace('_', ' ')
        };
    }

    static logCurrentDateTime() {
        const dateTime = this.getUserLocalDate();
        return dateTime;
    }
}

class UserManager {
    constructor() {
        this.currentPlayer = null;
        this.init();
    }

    init() {
        // Log current browser datetime info for debugging
        DateTimeUtils.logCurrentDateTime();
        
        // Check if user is logged in
        const currentPlayerName = localStorage.getItem('fiquest_current_player');
        if (currentPlayerName) {
            this.loadPlayer(currentPlayerName);
        }
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    isLoggedIn() {
        return this.currentPlayer !== null;
    }

    loadPlayer(playerName) {
        try {
            const playerData = localStorage.getItem(`fiquest_player_${playerName.toLowerCase()}`);
            if (playerData) {
                this.currentPlayer = JSON.parse(playerData);
                this.loadPlayerGameData();
                return true;
            }
        } catch (error) {
            console.error('Error loading player:', error);
        }
        return false;
    }

    loadPlayerGameData() {
        if (!this.currentPlayer) return;

        const gameData = this.currentPlayer.gameData;

        // Load scenarios (always set, even if empty to clear previous data)
        if (gameData.scenarios && gameData.scenarios.length > 0) {
            localStorage.setItem('fiquest_scenarios', JSON.stringify(gameData.scenarios));
        } else {
            localStorage.removeItem('fiquest_scenarios');
        }

        // Load active scenario (always set/clear)
        if (gameData.activeScenario) {
            localStorage.setItem('fiquest_active_scenario', JSON.stringify(gameData.activeScenario));
        } else {
            localStorage.removeItem('fiquest_active_scenario');
        }

        // Load net worth setup (always set/clear)
        if (gameData.netWorthSetup) {
            localStorage.setItem('fiquest_net_worth_setup', JSON.stringify(gameData.netWorthSetup));
        } else {
            localStorage.removeItem('fiquest_net_worth_setup');
        }

        // Load net worth tracking history from localStorage into UserManager
        const netWorthHistory = localStorage.getItem('fiquest_net_worth_history');
        if (netWorthHistory) {
            try {
                const parsedHistory = JSON.parse(netWorthHistory);
                if (!this.currentPlayer.gameData.netWorthTracking) {
                    this.currentPlayer.gameData.netWorthTracking = [];
                }
                // Merge localStorage data with existing player data, avoiding duplicates
                parsedHistory.forEach(entry => {
                    const existingIndex = this.currentPlayer.gameData.netWorthTracking.findIndex(existing =>
                        existing.date === entry.date && existing.dateCreated === entry.dateCreated
                    );
                    if (existingIndex === -1) {
                        this.currentPlayer.gameData.netWorthTracking.push(entry);
                    }
                });
                // Sort by date (newest first)
                this.currentPlayer.gameData.netWorthTracking.sort((a, b) => new Date(b.date) - new Date(a.date));
            } catch (error) {
                console.warn('Error parsing net worth history from localStorage:', error);
                if (!this.currentPlayer.gameData.netWorthTracking) {
                    this.currentPlayer.gameData.netWorthTracking = [];
                }
            }
        } else {
            if (!this.currentPlayer.gameData.netWorthTracking) {
                this.currentPlayer.gameData.netWorthTracking = [];
            }
        }
    }

    savePlayerData() {
        if (!this.currentPlayer) return;

        try {
            // Collect current game data from localStorage
            const scenarios = localStorage.getItem('fiquest_scenarios');
            const activeScenario = localStorage.getItem('fiquest_active_scenario');
            const netWorthSetup = localStorage.getItem('fiquest_net_worth_setup');

            // Update player's game data (preserve existing netWorthTracking)
            this.currentPlayer.gameData = {
                scenarios: scenarios ? JSON.parse(scenarios) : [],
                activeScenario: activeScenario ? JSON.parse(activeScenario) : null,
                netWorthSetup: netWorthSetup ? JSON.parse(netWorthSetup) : null,
                netWorthTracking: this.currentPlayer.gameData.netWorthTracking || [], // Preserve existing tracking data
                preferences: this.currentPlayer.gameData.preferences || {
                    currency: 'USD',
                    dateFormat: 'MM/DD/YYYY'
                }
            };

            // Update last played date using local browser time
            const localDateTime = DateTimeUtils.getUserLocalDate();
            this.currentPlayer.lastPlayedDate = localDateTime.iso;
            this.currentPlayer.lastPlayedLocal = localDateTime.date;
            this.currentPlayer.timezone = localDateTime.timezone;

            // Save back to localStorage (will be database later)
            localStorage.setItem(
                `fiquest_player_${this.currentPlayer.playerName.toLowerCase()}`, 
                JSON.stringify(this.currentPlayer)
            );

            return true;
        } catch (error) {
            console.error('Error saving player data:', error);
            return false;
        }
    }

    logout() {
        // NEW FILE-BASED STORAGE: Clear ALL localStorage data on logout
        // Users must import their save file to continue playing

        try {
            // Ask user if they want to create a final save file before logout
            const playerName = this.currentPlayer ? this.currentPlayer.playerName : 'Unknown';
            const shouldExport = confirm(
                `🚨 LOGOUT WARNING 🚨\n\n` +
                `Logging out will clear ALL data from this browser.\n` +
                `To continue playing later, you'll need to import your save file.\n\n` +
                `Would you like to create/update your save file before logging out?\n\n` +
                `Click OK to create save file, or Cancel to logout without saving.`
            );

            if (shouldExport && this.currentPlayer) {
                // Save current data first
                this.savePlayerData();

                // Create export data
                const exportData = {
                    version: '1.0.0',
                    exportDate: DateTimeUtils.getUserLocalDate().iso,
                    exportTimezone: DateTimeUtils.getUserLocalDate().timezone,
                    playerData: { ...this.currentPlayer },
                    gameData: {
                        scenarios: this.getStoredData('fiquest_scenarios'),
                        activeScenario: this.getStoredData('fiquest_active_scenario'),
                        netWorthSetup: this.getStoredData('fiquest_net_worth_setup'),
                        netWorthHistory: this.getStoredData('fiquest_net_worth_history'),
                        currentNetWorth: this.getStoredData('fiquest_current_net_worth')
                    },
                    metadata: {
                        exportedBy: 'FIQuest Web Application',
                        playerName: this.currentPlayer.playerName,
                        lastPlayedDate: this.currentPlayer.lastPlayedDate,
                        exportTrigger: 'logout'
                    }
                };

                // Remove sensitive data
                if (exportData.playerData.password) {
                    delete exportData.playerData.password;
                }

                // Generate save file
                const filename = `fiquest_${playerName.toLowerCase().replace(/[^a-z0-9]/g, '')}_${DateTimeUtils.getFilenameDateFormat()}.json`;
                const jsonData = JSON.stringify(exportData, null, 2);

                // Try to save the file
                if (window.CrossBrowserFileSaver) {
                    window.CrossBrowserFileSaver.saveAs(jsonData, filename, 'application/json');
                } else {
                    // Fallback if FileSaver not available
                    const blob = new Blob([jsonData], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    link.click();
                    URL.revokeObjectURL(url);
                }

                // Give user time to save the file
                alert(`✅ Save file created: ${filename}\n\nMake sure to save this file - you'll need it to continue playing!\n\nLogging out in 3 seconds...`);

                setTimeout(() => {
                    this.clearAllData();
                }, 3000);
            } else {
                // User chose not to save, or no player data
                if (confirm('Are you sure you want to logout without saving? All progress will be lost unless you have a save file.')) {
                    this.clearAllData();
                }
            }
        } catch (error) {
            console.error('Error during logout:', error);
            // Fallback - clear data anyway
            this.clearAllData();
        }
    }

    clearAllData() {
        try {
            // Clear current player reference
            this.currentPlayer = null;

            // Clear ALL FIQuest data from localStorage
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('fiquest_')) {
                    localStorage.removeItem(key);
                }
            });

            console.log('All FIQuest data cleared from localStorage');

            // Show confirmation message
            alert('✅ Logged out successfully!\n\nAll data has been cleared from this browser.\nTo continue playing, you\'ll need to import your save file.');

            // Redirect to start screen
            window.location.href = 'index.html';

        } catch (error) {
            console.error('Error clearing data:', error);
            // Force redirect even if cleanup fails
            window.location.href = 'index.html';
        }
    }

    requireLogin() {
        if (!this.isLoggedIn()) {
            // Redirect to start page if not logged in
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    addPlayerInfoToUI() {
        if (!this.currentPlayer) return;

        // Add player info to sidebar or header
        const playerInfo = document.querySelector('.user-info');
        if (playerInfo) {
            playerInfo.innerHTML = `Player: ${this.currentPlayer.playerName}`;
        }

        // Add logout button if not present
        this.addLogoutButton();
    }

    addLogoutButton() {
        // Check if logout button already exists
        if (document.getElementById('logoutBtn')) return;

        const sidebar = document.querySelector('.nav-menu');
        if (sidebar) {
            const logoutItem = document.createElement('li');
            logoutItem.innerHTML = `
                <a href="#" onclick="userManager.logout(); return false;" id="logoutBtn">
                    <span class="icon">💾</span>Save & Logout
                </a>
            `;
            sidebar.appendChild(logoutItem);
        }
    }

    // Auto-save functionality
    enableAutoSave(intervalMinutes = 2) {
        setInterval(() => {
            if (this.isLoggedIn()) {
                this.savePlayerData();
                console.log('Auto-saved player data');
            }
        }, intervalMinutes * 60 * 1000);
    }

    // Net Worth Tracking Methods
    addNetWorthEntry(entryData) {
        if (!this.currentPlayer) return false;

        try {
            // Initialize net worth tracking if it doesn't exist
            if (!this.currentPlayer.gameData.netWorthTracking) {
                this.currentPlayer.gameData.netWorthTracking = [];
            }

            // Generate unique ID for entry
            const entryId = 'nw_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            
            // Create complete entry with metadata
            const completeEntry = {
                id: entryId,
                date: entryData.date || DateTimeUtils.getUserLocalDate().date,
                dateCreated: DateTimeUtils.getUserLocalDate().iso,
                timezone: DateTimeUtils.getUserLocalDate().timezone,
                accounts: entryData.accounts,
                totals: this.calculateNetWorthTotals(entryData.accounts),
                notes: entryData.notes || '',
                projectedData: entryData.projectedData || null
            };

            // Add to tracking array
            this.currentPlayer.gameData.netWorthTracking.push(completeEntry);

            // Sort by date (newest first)
            this.currentPlayer.gameData.netWorthTracking.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Save player data
            this.savePlayerData();

            console.log('Net worth entry added:', completeEntry.id);
            return completeEntry;
        } catch (error) {
            console.error('Error adding net worth entry:', error);
            return false;
        }
    }

    updateNetWorthEntry(entryId, updatedData) {
        if (!this.currentPlayer || !this.currentPlayer.gameData.netWorthTracking) return false;

        try {
            const entryIndex = this.currentPlayer.gameData.netWorthTracking.findIndex(entry => entry.id === entryId);
            if (entryIndex === -1) return false;

            // Update entry with new data
            const existingEntry = this.currentPlayer.gameData.netWorthTracking[entryIndex];
            const updatedEntry = {
                ...existingEntry,
                ...updatedData,
                dateModified: DateTimeUtils.getUserLocalDate().iso,
                totals: this.calculateNetWorthTotals(updatedData.accounts || existingEntry.accounts)
            };

            this.currentPlayer.gameData.netWorthTracking[entryIndex] = updatedEntry;

            // Re-sort by date
            this.currentPlayer.gameData.netWorthTracking.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Save player data
            this.savePlayerData();

            console.log('Net worth entry updated:', entryId);
            return updatedEntry;
        } catch (error) {
            console.error('Error updating net worth entry:', error);
            return false;
        }
    }

    deleteNetWorthEntry(entryId) {
        if (!this.currentPlayer || !this.currentPlayer.gameData.netWorthTracking) return false;

        try {
            const entryIndex = this.currentPlayer.gameData.netWorthTracking.findIndex(entry => entry.id === entryId);
            if (entryIndex === -1) return false;

            // Remove entry
            this.currentPlayer.gameData.netWorthTracking.splice(entryIndex, 1);

            // Save player data
            this.savePlayerData();

            console.log('Net worth entry deleted:', entryId);
            return true;
        } catch (error) {
            console.error('Error deleting net worth entry:', error);
            return false;
        }
    }

    getNetWorthEntries() {
        if (!this.currentPlayer || !this.currentPlayer.gameData.netWorthTracking) {
            return [];
        }
        return [...this.currentPlayer.gameData.netWorthTracking];
    }

    getLatestNetWorthEntry() {
        const entries = this.getNetWorthEntries();
        return entries.length > 0 ? entries[0] : null;
    }

    calculateNetWorthTotals(accounts) {
        let totalAssets = 0;
        let totalLiabilities = 0;
        let projectedAssets = 0;
        let projectedLiabilities = 0;

        // Calculate asset totals
        if (accounts.assets) {
            Object.values(accounts.assets).forEach(account => {
                totalAssets += account.actual || 0;
                projectedAssets += account.projected || 0;
            });
        }

        // Calculate liability totals
        if (accounts.liabilities) {
            Object.values(accounts.liabilities).forEach(account => {
                totalLiabilities += account.actual || 0;
                projectedLiabilities += account.projected || 0;
            });
        }

        const netWorth = totalAssets - totalLiabilities;
        const projectedNetWorth = projectedAssets - projectedLiabilities;
        const netVariance = netWorth - projectedNetWorth;

        return {
            totalAssets,
            totalLiabilities,
            netWorth,
            projectedNetWorth,
            netVariance,
            assetVariance: totalAssets - projectedAssets,
            liabilityVariance: totalLiabilities - projectedLiabilities
        };
    }

    importNetWorthData(entriesArray) {
        if (!this.currentPlayer) return false;

        try {
            let successCount = 0;
            let errorCount = 0;

            entriesArray.forEach(entryData => {
                const result = this.addNetWorthEntry(entryData);
                if (result) {
                    successCount++;
                } else {
                    errorCount++;
                }
            });

            console.log(`Net worth import completed: ${successCount} successful, ${errorCount} errors`);
            return { success: successCount, errors: errorCount };
        } catch (error) {
            console.error('Error importing net worth data:', error);
            return false;
        }
    }

    exportNetWorthData(format = 'json') {
        const entries = this.getNetWorthEntries();
        
        if (format === 'csv') {
            return this.convertToCSV(entries);
        } else if (format === 'excel') {
            return this.convertToExcelData(entries);
        } else {
            return entries; // JSON format
        }
    }

    convertToCSV(entries) {
        if (!entries || entries.length === 0) return '';

        // CSV headers
        const headers = [
            'Date', 'Total Assets', 'Total Liabilities', 'Net Worth', 
            'Projected Net Worth', 'Net Variance', 'Notes'
        ];

        // Add account headers dynamically based on first entry
        const accountHeaders = [];
        if (entries[0] && entries[0].accounts) {
            if (entries[0].accounts.assets) {
                Object.keys(entries[0].accounts.assets).forEach(account => {
                    accountHeaders.push(`${account}_actual`, `${account}_projected`, `${account}_variance`);
                });
            }
            if (entries[0].accounts.liabilities) {
                Object.keys(entries[0].accounts.liabilities).forEach(account => {
                    accountHeaders.push(`${account}_actual`, `${account}_projected`, `${account}_variance`);
                });
            }
        }

        const allHeaders = [...headers, ...accountHeaders];
        
        // Convert entries to CSV rows
        const rows = entries.map(entry => {
            const baseRow = [
                entry.date,
                entry.totals.totalAssets,
                entry.totals.totalLiabilities,
                entry.totals.netWorth,
                entry.totals.projectedNetWorth,
                entry.totals.netVariance,
                entry.notes
            ];

            // Add account data
            const accountData = [];
            if (entry.accounts.assets) {
                Object.values(entry.accounts.assets).forEach(account => {
                    accountData.push(account.actual, account.projected, account.variance);
                });
            }
            if (entry.accounts.liabilities) {
                Object.values(entry.accounts.liabilities).forEach(account => {
                    accountData.push(account.actual, account.projected, account.variance);
                });
            }

            return [...baseRow, ...accountData];
        });

        // Combine headers and rows
        const csvContent = [allHeaders, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        return csvContent;
    }

    convertToExcelData(entries) {
        // Return structured data that can be converted to Excel by a library
        return {
            summary: {
                title: 'Net Worth Tracking Summary',
                data: entries.map(entry => ({
                    Date: entry.date,
                    'Total Assets': entry.totals.totalAssets,
                    'Total Liabilities': entry.totals.totalLiabilities,
                    'Net Worth': entry.totals.netWorth,
                    'Projected Net Worth': entry.totals.projectedNetWorth,
                    'Variance': entry.totals.netVariance,
                    Notes: entry.notes
                }))
            },
            detailed: {
                title: 'Account-Level Details',
                data: this.flattenAccountData(entries)
            }
        };
    }

    flattenAccountData(entries) {
        const flattened = [];
        
        entries.forEach(entry => {
            // Add asset accounts
            if (entry.accounts.assets) {
                Object.entries(entry.accounts.assets).forEach(([accountName, accountData]) => {
                    flattened.push({
                        Date: entry.date,
                        Type: 'Asset',
                        Account: accountName,
                        Actual: accountData.actual,
                        Projected: accountData.projected,
                        Variance: accountData.variance
                    });
                });
            }

            // Add liability accounts
            if (entry.accounts.liabilities) {
                Object.entries(entry.accounts.liabilities).forEach(([accountName, accountData]) => {
                    flattened.push({
                        Date: entry.date,
                        Type: 'Liability',
                        Account: accountName,
                        Actual: accountData.actual,
                        Projected: accountData.projected,
                        Variance: accountData.variance
                    });
                });
            }
        });

        return flattened;
    }

    // Check if user has completed initial setup (has saved net worth setup)
    hasCompletedInitialSetup() {
        if (!this.currentPlayer) return false;

        // Check if player has netWorthSetup in their gameData
        if (this.currentPlayer.gameData && this.currentPlayer.gameData.netWorthSetup) {
            return true;
        }

        // Fallback: check localStorage for setup data
        const savedSetup = localStorage.getItem('fiquest_net_worth_setup');
        return savedSetup && savedSetup !== 'null';
    }

    // Complete Data Export/Import System for Local Storage
    exportAllUserData(format = 'json', includeEncryption = false) {
        if (!this.currentPlayer) {
            throw new Error('No user logged in to export data');
        }

        try {
            // Ensure all current data is saved before export
            this.savePlayerData();

            // Collect all localStorage data related to current user
            const exportData = {
                version: '1.0.0',
                exportDate: DateTimeUtils.getUserLocalDate().iso,
                exportTimezone: DateTimeUtils.getUserLocalDate().timezone,
                playerData: { ...this.currentPlayer },
                gameData: {
                    scenarios: this.getStoredData('fiquest_scenarios'),
                    activeScenario: this.getStoredData('fiquest_active_scenario'),
                    netWorthSetup: this.getStoredData('fiquest_net_worth_setup'),
                    netWorthHistory: this.getStoredData('fiquest_net_worth_history'),
                    currentNetWorth: this.getStoredData('fiquest_current_net_worth')
                },
                metadata: {
                    exportedBy: 'FIQuest Web Application',
                    dataIntegrity: this.generateDataHash(),
                    playerName: this.currentPlayer.playerName,
                    lastPlayedDate: this.currentPlayer.lastPlayedDate
                }
            };

            // Remove sensitive/redundant data for security
            if (exportData.playerData.password) {
                delete exportData.playerData.password;
            }

            if (format === 'json') {
                const jsonData = JSON.stringify(exportData, null, 2);
                return includeEncryption ? this.encryptData(jsonData) : jsonData;
            } else if (format === 'csv') {
                return this.convertCompleteDataToCSV(exportData);
            } else {
                throw new Error('Unsupported export format: ' + format);
            }
        } catch (error) {
            console.error('Error exporting user data:', error);
            throw error;
        }
    }

    getStoredData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.warn(`Error parsing stored data for ${key}:`, error);
            return null;
        }
    }

    generateDataHash() {
        // Simple hash for data integrity checking
        const dataString = JSON.stringify(this.currentPlayer);
        let hash = 0;
        for (let i = 0; i < dataString.length; i++) {
            const char = dataString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(16);
    }

    encryptData(data) {
        // Simple encryption for export files (base64 + simple cipher)
        // Note: This is basic protection, not cryptographically secure
        const encoded = btoa(data);
        let encrypted = '';
        const key = 'FIQuest2025';
        for (let i = 0; i < encoded.length; i++) {
            encrypted += String.fromCharCode(
                encoded.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return btoa(encrypted);
    }

    decryptData(encryptedData) {
        try {
            const encrypted = atob(encryptedData);
            let decrypted = '';
            const key = 'FIQuest2025';
            for (let i = 0; i < encrypted.length; i++) {
                decrypted += String.fromCharCode(
                    encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            return atob(decrypted);
        } catch (error) {
            throw new Error('Failed to decrypt data - invalid encryption or corrupted file');
        }
    }

    convertCompleteDataToCSV(exportData) {
        let csv = '';

        // Header and Export Information
        csv += '"FIQuest Complete Data Export"\n';
        csv += `"Export Date: ${exportData.exportDate}"\n`;
        csv += `"Data Version: ${exportData.version}"\n`;
        csv += `"Export Timezone: ${exportData.exportTimezone}"\n\n`;

        // Player Profile Information
        csv += '"=== PLAYER PROFILE ==="\n';
        csv += '"Field","Value"\n';
        csv += `"Player Name","${exportData.playerData.playerName}"\n`;
        csv += `"Date Created","${exportData.playerData.createdDate || 'Unknown'}"\n`;
        csv += `"Last Played Date","${exportData.playerData.lastPlayedDate}"\n`;
        csv += `"Player Timezone","${exportData.playerData.timezone || exportData.exportTimezone}"\n\n`;

        // Financial Independence Scenarios - Detailed
        if (exportData.gameData.scenarios && exportData.gameData.scenarios.length > 0) {
            csv += '"=== FINANCIAL INDEPENDENCE SCENARIOS - SUMMARY ==="\n';
            csv += '"Scenario Name","Initial Age","Active Until Age","Life Expectancy","Starting Capital","Annual Contributions","Annual Active Spending","Annual Inactive Spending","Rate of Return %","Inflation Rate %","Withdrawal Rate %","FI Year","FI Age","Final Portfolio Value","Monthly Savings Required"\n';

            exportData.gameData.scenarios.forEach((scenario, scenarioIndex) => {
                // Read from nested inputs structure if available, otherwise fall back to flat structure
                const inputs = scenario.inputs || scenario;
                const results = scenario.results || {};

                csv += `"${scenario.name || 'Unnamed Scenario'}",`;
                csv += `"${inputs.currentAge || inputs.initialAge || 'N/A'}",`;
                csv += `"${inputs.activeUntilAge || 'N/A'}",`;
                csv += `"${inputs.lifeExpectancy || 'N/A'}",`;
                csv += `"${inputs.startingCapital || 0}",`;
                csv += `"${inputs.annualContributions || 0}",`;
                csv += `"${inputs.activeSpending || inputs.annualActiveSpending || 0}",`;
                csv += `"${inputs.inactiveSpending || inputs.annualInactiveSpending || inputs.annualSpending || 0}",`;
                csv += `"${((inputs.rateOfReturn || 0.07) * 100).toFixed(2)}",`;
                csv += `"${((inputs.inflationRate || 0.02) * 100).toFixed(2)}",`;
                csv += `"${((inputs.withdrawalRate || 0.04) * 100).toFixed(2)}",`;
                csv += `"${results.fiYear || scenario.fiYear || 'Not Achieved'}",`;
                csv += `"${results.fiAge || scenario.fiAge || 'N/A'}",`;
                csv += `"${results.finalPortfolioValue ? '$' + results.finalPortfolioValue.toLocaleString('en-US', {maximumFractionDigits: 0}) : 'Not Calculated'}",`;
                csv += `"${results.monthlySavingsRequired ? '$' + results.monthlySavingsRequired.toLocaleString('en-US', {maximumFractionDigits: 2}) : 'Not Calculated'}"\n`;
            });

            csv += '\n';

            // Year-by-Year Projections for Each Scenario
            exportData.gameData.scenarios.forEach((scenario, scenarioIndex) => {
                const results = scenario.results || {};

                if (results.years && results.years.length > 0) {
                    csv += `"=== SCENARIO ${scenarioIndex + 1}: ${scenario.name || 'Unnamed'} - YEAR-BY-YEAR PROJECTIONS ==="\n`;
                    csv += '"Year","Age","Portfolio Value","Annual Spending","Withdrawal Capacity","Contributions","Remaining Debt","Status"\n';

                    results.years.forEach(yearData => {
                        csv += `"${yearData.year}",`;
                        csv += `"${yearData.age}",`;
                        csv += `"$${yearData.portfolioValue.toLocaleString('en-US', {maximumFractionDigits: 0})}",`;
                        csv += `"$${yearData.annualSpending.toLocaleString('en-US', {maximumFractionDigits: 0})}",`;
                        csv += `"$${yearData.withdrawalCapacity.toLocaleString('en-US', {maximumFractionDigits: 0})}",`;
                        csv += `"$${yearData.contributions.toLocaleString('en-US', {maximumFractionDigits: 0})}",`;
                        csv += `"$${yearData.totalRemainingDebt.toLocaleString('en-US', {maximumFractionDigits: 0})}",`;
                        csv += `"${yearData.status}"\n`;
                    });

                    csv += '\n';
                }
            });

            // Input Parameters for Each Scenario
            exportData.gameData.scenarios.forEach((scenario, scenarioIndex) => {
                const inputs = scenario.inputs || scenario;

                csv += `"=== SCENARIO ${scenarioIndex + 1}: ${scenario.name || 'Unnamed'} - INPUT PARAMETERS ==="\n`;
                csv += '"Parameter","Value"\n';
                csv += `"Current Age","${inputs.currentAge || inputs.initialAge || 'N/A'}"\n`;
                csv += `"Active Until Age","${inputs.activeUntilAge || 'N/A'}"\n`;
                csv += `"Life Expectancy","${inputs.lifeExpectancy || 'N/A'}"\n`;
                csv += `"Starting Capital","$${(inputs.startingCapital || 0).toLocaleString('en-US')}"\n`;
                csv += `"Annual Contributions","$${(inputs.annualContributions || 0).toLocaleString('en-US')}"\n`;
                csv += `"Annual Active Spending","$${(inputs.activeSpending || inputs.annualActiveSpending || 0).toLocaleString('en-US')}"\n`;
                csv += `"Annual Inactive Spending","$${(inputs.inactiveSpending || inputs.annualInactiveSpending || inputs.annualSpending || 0).toLocaleString('en-US')}"\n`;
                csv += `"Rate of Return","${((inputs.rateOfReturn || 0.07) * 100).toFixed(2)}%"\n`;
                csv += `"Inflation Rate","${((inputs.inflationRate || 0.02) * 100).toFixed(2)}%"\n`;
                csv += `"Withdrawal Rate","${((inputs.withdrawalRate || 0.04) * 100).toFixed(2)}%"\n`;

                // Debt details
                if (inputs.debts) {
                    csv += `"Mortgage Balance","$${(inputs.debts.mortgage?.balance || 0).toLocaleString('en-US')}"\n`;
                    csv += `"Mortgage Rate","${((inputs.debts.mortgage?.rate || 0) * 100).toFixed(2)}%"\n`;
                    csv += `"Mortgage Payment","$${(inputs.debts.mortgage?.payment || 0).toLocaleString('en-US')}/month"\n`;
                    csv += `"Mortgage Extra Payment","$${(inputs.debts.mortgage?.extraPayment || 0).toLocaleString('en-US')}/month"\n`;
                    csv += `"Mortgage Affects Contributions","${inputs.debts.mortgage?.affectContributions ? 'Yes' : 'No'}"\n`;

                    csv += `"Vehicle Balance","$${(inputs.debts.vehicle?.balance || 0).toLocaleString('en-US')}"\n`;
                    csv += `"Vehicle Rate","${((inputs.debts.vehicle?.rate || 0) * 100).toFixed(2)}%"\n`;
                    csv += `"Vehicle Payment","$${(inputs.debts.vehicle?.payment || 0).toLocaleString('en-US')}/month"\n`;
                    csv += `"Vehicle Extra Payment","$${(inputs.debts.vehicle?.extraPayment || 0).toLocaleString('en-US')}/month"\n`;
                    csv += `"Vehicle Affects Contributions","${inputs.debts.vehicle?.affectContributions ? 'Yes' : 'No'}"\n`;

                    csv += `"Other Debt Balance","$${(inputs.debts.other?.balance || 0).toLocaleString('en-US')}"\n`;
                    csv += `"Other Debt Rate","${((inputs.debts.other?.rate || 0) * 100).toFixed(2)}%"\n`;
                    csv += `"Other Debt Payment","$${(inputs.debts.other?.payment || 0).toLocaleString('en-US')}/month"\n`;
                    csv += `"Other Debt Extra Payment","$${(inputs.debts.other?.extraPayment || 0).toLocaleString('en-US')}/month"\n`;
                    csv += `"Other Debt Affects Contributions","${inputs.debts.other?.affectContributions ? 'Yes' : 'No'}"\n`;
                }

                csv += '\n';
            });

            // Account-Level Contribution Details
            exportData.gameData.scenarios.forEach((scenario, scenarioIndex) => {
                const inputs = scenario.inputs || scenario;

                if (inputs.accounts && inputs.accounts.length > 0) {
                    csv += `"=== SCENARIO ${scenarioIndex + 1}: ${scenario.name || 'Unnamed'} - ACCOUNT BREAKDOWN ==="\n`;
                    csv += '"Account Name","Account Value"\n';

                    inputs.accounts.forEach(account => {
                        csv += `"${account.name}","$${account.value.toLocaleString('en-US')}"\n`;
                    });

                    csv += '\n';
                }
            });

            csv += '\n';
        }

        // Net Worth Setup Configuration
        if (exportData.gameData.netWorthSetup) {
            csv += '"=== NET WORTH SETUP CONFIGURATION ==="\n';
            csv += '"Category","Account Name","Account Type","Initial Value","Growth Rate %","Notes"\n';

            const setup = exportData.gameData.netWorthSetup;

            // Assets
            if (setup.assetCategories) {
                Object.entries(setup.assetCategories).forEach(([categoryName, accounts]) => {
                    if (typeof accounts === 'object') {
                        Object.entries(accounts).forEach(([accountName, accountData]) => {
                            csv += `"${categoryName}","${accountName}","Asset","${accountData.initialValue || 0}","${accountData.growthRate || 0}","${accountData.notes || ''}"\n`;
                        });
                    }
                });
            }

            // Liabilities
            if (setup.liabilityCategories) {
                Object.entries(setup.liabilityCategories).forEach(([categoryName, accounts]) => {
                    if (typeof accounts === 'object') {
                        Object.entries(accounts).forEach(([accountName, accountData]) => {
                            csv += `"${categoryName}","${accountName}","Liability","${accountData.initialValue || 0}","${accountData.interestRate || 0}","${accountData.notes || ''}"\n`;
                        });
                    }
                });
            }

            csv += '\n';
        }

        // Net Worth Tracking History with Account Details
        if (exportData.playerData.gameData && exportData.playerData.gameData.netWorthTracking) {
            csv += '"=== NET WORTH TRACKING HISTORY ==="\n';
            csv += '"Entry Date","Date Created","Total Assets","Total Liabilities","Net Worth","Projected Net Worth","Net Variance","Asset Variance","Liability Variance","Entry Notes","Entry ID"\n';

            exportData.playerData.gameData.netWorthTracking.forEach(entry => {
                csv += `"${entry.date}","${entry.dateCreated || 'Unknown'}","${entry.totals.totalAssets}","${entry.totals.totalLiabilities}","${entry.totals.netWorth}","${entry.totals.projectedNetWorth || 0}","${entry.totals.netVariance || 0}","${entry.totals.assetVariance || 0}","${entry.totals.liabilityVariance || 0}","${entry.notes || ''}","${entry.id || 'Unknown'}"\n`;
            });

            // Individual Account Values for each Net Worth Entry
            csv += '\n"=== INDIVIDUAL ACCOUNT VALUES ==="\n';
            csv += '"Entry Date","Account Category","Account Name","Account Type","Actual Value","Projected Value","Variance","Entry ID"\n';

            exportData.playerData.gameData.netWorthTracking.forEach(entry => {
                // Asset accounts
                if (entry.accounts && entry.accounts.assets) {
                    Object.entries(entry.accounts.assets).forEach(([accountName, accountData]) => {
                        const category = accountData.category || 'Unknown Category';
                        csv += `"${entry.date}","${category}","${accountName}","Asset","${accountData.actual || 0}","${accountData.projected || 0}","${accountData.variance || 0}","${entry.id || 'Unknown'}"\n`;
                    });
                }

                // Liability accounts
                if (entry.accounts && entry.accounts.liabilities) {
                    Object.entries(entry.accounts.liabilities).forEach(([accountName, accountData]) => {
                        const category = accountData.category || 'Unknown Category';
                        csv += `"${entry.date}","${category}","${accountName}","Liability","${accountData.actual || 0}","${accountData.projected || 0}","${accountData.variance || 0}","${entry.id || 'Unknown'}"\n`;
                    });
                }
            });

            csv += '\n';
        }

        // Active Scenario Information
        if (exportData.gameData.activeScenario) {
            csv += '"=== ACTIVE SCENARIO ==="\n';
            csv += '"Field","Value"\n';
            csv += `"Active Scenario Name","${exportData.gameData.activeScenario.name || 'Unnamed'}"\n`;
            csv += `"Selected Date","${exportData.gameData.activeScenario.selectedDate || 'Unknown'}"\n`;
            csv += `"Setup Year","${exportData.gameData.activeScenario.setupYear || 'Unknown'}"\n`;
            csv += `"Current Year","${new Date().getFullYear()}"\n\n`;
        }

        // Data Statistics
        csv += '"=== DATA STATISTICS ==="\n';
        csv += '"Metric","Count"\n';
        csv += `"Total Scenarios","${exportData.gameData.scenarios ? exportData.gameData.scenarios.length : 0}"\n`;
        csv += `"Net Worth Entries","${exportData.playerData.gameData && exportData.playerData.gameData.netWorthTracking ? exportData.playerData.gameData.netWorthTracking.length : 0}"\n`;
        csv += `"Export File Size (chars)","${JSON.stringify(exportData).length}"\n\n`;

        // Footer
        csv += '"=== END OF EXPORT ==="\n';
        csv += `"Generated by FIQuest Data Management System on ${exportData.exportDate}"\n`;
        csv += '"For data import, use the JSON format for full compatibility"\n';

        return csv;
    }

    importAllUserData(importData, isEncrypted = false) {
        try {
            // Decrypt if needed
            let parsedData;
            if (isEncrypted) {
                const decryptedData = this.decryptData(importData);
                parsedData = JSON.parse(decryptedData);
            } else {
                parsedData = typeof importData === 'string' ? JSON.parse(importData) : importData;
            }

            // Validate import data structure
            if (!this.validateImportData(parsedData)) {
                throw new Error('Invalid import data format');
            }

            // Backup current data before import
            const backupData = this.exportAllUserData();
            const backupKey = `fiquest_backup_${Date.now()}`;
            localStorage.setItem(backupKey, backupData);

            try {
                // Import player data
                this.currentPlayer = { ...parsedData.playerData };

                // Restore game data to localStorage
                if (parsedData.gameData.scenarios) {
                    localStorage.setItem('fiquest_scenarios', JSON.stringify(parsedData.gameData.scenarios));
                }
                if (parsedData.gameData.activeScenario) {
                    localStorage.setItem('fiquest_active_scenario', JSON.stringify(parsedData.gameData.activeScenario));
                }
                if (parsedData.gameData.netWorthSetup) {
                    localStorage.setItem('fiquest_net_worth_setup', JSON.stringify(parsedData.gameData.netWorthSetup));
                }
                if (parsedData.gameData.netWorthHistory) {
                    localStorage.setItem('fiquest_net_worth_history', JSON.stringify(parsedData.gameData.netWorthHistory));
                }
                if (parsedData.gameData.currentNetWorth) {
                    localStorage.setItem('fiquest_current_net_worth', JSON.stringify(parsedData.gameData.currentNetWorth));
                }

                // Save imported player data
                localStorage.setItem(
                    `fiquest_player_${this.currentPlayer.playerName.toLowerCase()}`,
                    JSON.stringify(this.currentPlayer)
                );
                localStorage.setItem('fiquest_current_player', this.currentPlayer.playerName);

                // Clean up backup after successful import
                localStorage.removeItem(backupKey);

                console.log('User data imported successfully');
                return {
                    success: true,
                    message: 'Data imported successfully',
                    playerName: this.currentPlayer.playerName,
                    importDate: parsedData.exportDate
                };

            } catch (importError) {
                // Restore from backup if import fails
                localStorage.setItem(backupKey.replace('backup_', 'restore_'), backupData);
                throw importError;
            }

        } catch (error) {
            console.error('Error importing user data:', error);
            return {
                success: false,
                message: error.message || 'Unknown import error occurred'
            };
        }
    }

    validateImportData(data) {
        // Check required structure
        if (!data || typeof data !== 'object') return false;
        if (!data.version || !data.playerData) return false;
        if (!data.playerData.playerName) return false;

        // Check version compatibility
        const supportedVersions = ['1.0.0'];
        if (!supportedVersions.includes(data.version)) {
            console.warn('Import data version may not be fully compatible:', data.version);
        }

        return true;
    }

    downloadExportFile(data, filename, format = 'json') {
        const mimeTypes = {
            'json': 'application/json',
            'csv': 'text/csv',
            'txt': 'text/plain'
        };

        const blob = new Blob([data], { type: mimeTypes[format] || 'text/plain' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    generateExportFilename(format = 'json', includeEncryption = false) {
        const date = DateTimeUtils.getFilenameDateFormat();
        const playerName = this.currentPlayer.playerName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const encryptSuffix = includeEncryption ? '_encrypted' : '';
        return `fiquest_${playerName}_${date}${encryptSuffix}.${format}`;
    }

    getDataManagementInfo() {
        if (!this.currentPlayer) return null;

        const scenarios = this.getStoredData('fiquest_scenarios') || [];
        const netWorthEntries = this.getNetWorthEntries();

        // Calculate storage usage (approximate)
        const playerDataSize = JSON.stringify(this.currentPlayer).length;
        const gameDataSize = JSON.stringify({
            scenarios: scenarios,
            netWorth: netWorthEntries
        }).length;

        return {
            playerName: this.currentPlayer.playerName,
            lastPlayed: this.currentPlayer.lastPlayedDate,
            dataSize: {
                player: Math.round(playerDataSize / 1024 * 100) / 100, // KB
                game: Math.round(gameDataSize / 1024 * 100) / 100, // KB
                total: Math.round((playerDataSize + gameDataSize) / 1024 * 100) / 100 // KB
            },
            counts: {
                scenarios: scenarios.length,
                netWorthEntries: netWorthEntries.length
            },
            hasSetup: this.hasCompletedInitialSetup()
        };
    }
}

// Create global instance
const userManager = new UserManager();

// Auto-save every 2 minutes
userManager.enableAutoSave(2);

// Save on page unload
window.addEventListener('beforeunload', () => {
    userManager.savePlayerData();
});

// Save when user navigates away
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        userManager.savePlayerData();
    }
});