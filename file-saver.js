/**
 * Cross-Browser File Saver for FIQuest
 * Handles file downloads across all browsers including Safari and mobile
 */

class CrossBrowserFileSaver {

    /**
     * Save data as a file with cross-browser compatibility
     * @param {string} data - The data to save
     * @param {string} filename - The filename to save as
     * @param {string} mimeType - MIME type (default: application/json)
     */
    static saveAs(data, filename, mimeType = 'application/json') {
        try {
            // Method 1: Try standard blob + download approach (works on most modern browsers)
            if (this.canUseBlob()) {
                this.saveBlobMethod(data, filename, mimeType);
                return true;
            }

            // Method 2: Safari fallback - use data URL
            if (this.isSafari()) {
                this.saveSafariMethod(data, filename, mimeType);
                return true;
            }

            // Method 3: Mobile/fallback - open in new window with instructions
            this.saveFallbackMethod(data, filename, mimeType);
            return true;

        } catch (error) {
            console.error('FileSaver error:', error);
            // Final fallback - copy to clipboard
            this.copyToClipboard(data);
            alert('Unable to download file. Data has been copied to clipboard.');
            return false;
        }
    }

    /**
     * Check if browser supports blob downloads
     */
    static canUseBlob() {
        try {
            return window.Blob && window.URL && window.URL.createObjectURL && document.createElement;
        } catch (error) {
            return false;
        }
    }

    /**
     * Check if browser is Safari
     */
    static isSafari() {
        return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    }

    /**
     * Check if browser is mobile
     */
    static isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Standard blob download method (Chrome, Firefox, Edge)
     */
    static saveBlobMethod(data, filename, mimeType) {
        const blob = new Blob([data], { type: mimeType });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';

        // Add to DOM, click, remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up object URL
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }

    /**
     * Safari-specific method using data URL
     */
    static saveSafariMethod(data, filename, mimeType) {
        const encodedData = encodeURIComponent(data);
        const dataUrl = `data:${mimeType};charset=utf-8,${encodedData}`;

        // Open in new window
        const newWindow = window.open(dataUrl, '_blank');

        if (newWindow) {
            // Show instructions to user
            setTimeout(() => {
                if (this.isMobile()) {
                    alert('To save your FIQuest data:\n1. Tap and hold the content\n2. Select "Copy"\n3. Paste into a text file\n4. Save with filename: ' + filename);
                } else {
                    alert('To save your FIQuest data:\n1. Press Cmd+S (Mac) or Ctrl+S (PC)\n2. Save as filename: ' + filename);
                }
            }, 500);
        } else {
            // Popup blocked, fallback to copy to clipboard
            this.copyToClipboard(data);
            alert('Popup blocked. Your FIQuest data has been copied to clipboard.\nPlease paste into a text file and save as: ' + filename);
        }
    }

    /**
     * Fallback method for problematic browsers
     */
    static saveFallbackMethod(data, filename, mimeType) {
        if (this.isMobile()) {
            // Mobile fallback - try to use Web Share API if available
            if (navigator.share) {
                const file = new File([data], filename, { type: mimeType });
                navigator.share({
                    files: [file],
                    title: 'FIQuest Save File',
                    text: 'Your FIQuest game data'
                }).catch(() => {
                    // Share failed, copy to clipboard
                    this.copyToClipboard(data);
                    alert('Unable to share file. Data copied to clipboard.\nPlease paste into a text file and save as: ' + filename);
                });
            } else {
                // No share API, copy to clipboard
                this.copyToClipboard(data);
                alert('To save your FIQuest data:\n1. Data has been copied to clipboard\n2. Open Notes or Files app\n3. Create new text file\n4. Paste and save as: ' + filename);
            }
        } else {
            // Desktop fallback - open in new window
            const encodedData = encodeURIComponent(data);
            const dataUrl = `data:${mimeType};charset=utf-8,${encodedData}`;

            const newWindow = window.open(dataUrl, '_blank');
            if (newWindow) {
                alert('To save your FIQuest data:\n1. Press Ctrl+S (or Cmd+S on Mac)\n2. Save as filename: ' + filename);
            } else {
                this.copyToClipboard(data);
                alert('Popup blocked. Data copied to clipboard.\nPlease paste into a text file and save as: ' + filename);
            }
        }
    }

    /**
     * Copy data to clipboard as fallback
     */
    static copyToClipboard(data) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(data);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = data;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        } catch (error) {
            console.error('Clipboard copy failed:', error);
        }
    }

    /**
     * Generate standardized filename for FIQuest saves
     */
    static generateFilename(playerName, includeTimestamp = true) {
        const safeName = playerName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const timestamp = includeTimestamp ? '_' + new Date().toISOString().slice(0, 10).replace(/-/g, '') : '';
        return `fiquest_${safeName}${timestamp}.json`;
    }

    /**
     * Show platform-specific save instructions
     */
    static showSaveInstructions(filename) {
        const isMobile = this.isMobile();
        const isSafari = this.isSafari();

        let instructions = 'Your FIQuest save file has been prepared.\n\n';

        if (isMobile) {
            if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
                instructions += 'iOS Instructions:\n';
                instructions += '1. Tap "Share" → "Save to Files"\n';
                instructions += '2. Choose location (iCloud Drive recommended)\n';
                instructions += '3. Filename: ' + filename;
            } else {
                instructions += 'Android Instructions:\n';
                instructions += '1. File should download automatically\n';
                instructions += '2. Check Downloads folder\n';
                instructions += '3. Filename: ' + filename;
            }
        } else if (isSafari) {
            instructions += 'Safari Instructions:\n';
            instructions += '1. Press Cmd+S to save\n';
            instructions += '2. Choose location\n';
            instructions += '3. Filename: ' + filename;
        } else {
            instructions += 'Desktop Instructions:\n';
            instructions += '1. File should download automatically\n';
            instructions += '2. Check Downloads folder\n';
            instructions += '3. Filename: ' + filename;
        }

        return instructions;
    }
}

// Export for use in other files
window.CrossBrowserFileSaver = CrossBrowserFileSaver;