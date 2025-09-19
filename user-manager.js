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
        // Save current data before logout
        this.savePlayerData();
        
        // Clear current player
        this.currentPlayer = null;
        localStorage.removeItem('fiquest_current_player');
        
        // Clear game data from localStorage
        localStorage.removeItem('fiquest_scenarios');
        localStorage.removeItem('fiquest_active_scenario');
        localStorage.removeItem('fiquest_net_worth_setup');
        
        // Redirect to game start screen
        window.location.href = 'index.html';
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
                    <span class="icon">🚪</span>Logout
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