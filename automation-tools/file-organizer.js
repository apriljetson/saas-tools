// File Organizer - Automated file management
// Organize files by type, date, or custom rules

const fs = require('fs');
const path = require('path');

const FILE_TYPES = {
    images: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'],
    videos: ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    documents: ['.pdf', '.doc', '.docx', '.txt', '.md', '.rtf'],
    spreadsheets: ['.xls', '.xlsx', '.csv', '.ods'],
    presentations: ['.ppt', '.pptx', '.key'],
    archives: ['.zip', '.rar', '.7z', '.tar', '.gz'],
    code: ['.js', '.py', '.html', '.css', '.json', '.xml', '.java', '.cpp', '.go', '.rs'],
    audio: ['.mp3', '.wav', '.flac', '.aac', '.ogg'],
    executables: ['.exe', '.dmg', '.app', '.msi']
};

class FileOrganizer {
    constructor(sourceDir, destDir) {
        this.sourceDir = sourceDir;
        this.destDir = destDir;
        this.stats = { organized: 0, skipped: 0, errors: [] };
    }
    
    getFileType(filename) {
        const ext = path.extname(filename).toLowerCase();
        for (const [type, extensions] of Object.entries(FILE_TYPES)) {
            if (extensions.includes(ext)) return type;
        }
        return 'other';
    }
    
    organize() {
        try {
            const files = fs.readdirSync(this.sourceDir);
            
            files.forEach(file => {
                const srcPath = path.join(this.sourceDir, file);
                
                if (!fs.statSync(srcPath).isFile()) {
                    this.stats.skipped++;
                    return;
                }
                
                const type = this.getFileType(file);
                const destTypeDir = path.join(this.destDir, type);
                
                if (!fs.existsSync(destTypeDir)) {
                    fs.mkdirSync(destTypeDir, { recursive: true });
                }
                
                const destPath = path.join(destTypeDir, file);
                
                try {
                    fs.renameSync(srcPath, destPath);
                    this.stats.organized++;
                    console.log(`✓ Moved: ${file} → ${type}/`);
                } catch (err) {
                    // File might already exist, try copy + delete
                    try {
                        fs.copyFileSync(srcPath, destPath);
                        fs.unlinkSync(srcPath);
                        this.stats.organized++;
                        console.log(`✓ Copied: ${file} → ${type}/`);
                    } catch (e) {
                        this.stats.errors.push(e.message);
                        console.log(`✗ Error: ${file} - ${e.message}`);
                    }
                }
            });
            
            console.log('\n=== Summary ===');
            console.log(`Organized: ${this.stats.organized}`);
            console.log(`Skipped: ${this.stats.skipped}`);
            console.log(`Errors: ${this.stats.errors.length}`);
            
            return this.stats;
            
        } catch (err) {
            console.error('Fatal error:', err.message);
            return null;
        }
    }
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const source = args.find(a => a.startsWith('--source='))?.split('=')[1];
    const dest = args.find(a => a.startsWith('--dest='))?.split('=')[1];
    
    if (!source || !dest) {
        console.log('Usage: node file-organizer.js --source=PATH --dest=PATH');
        console.log('Example: node file-organizer.js --source=~/Downloads --dest=~/Organized');
        process.exit(1);
    }
    
    const organizer = new FileOrganizer(source, dest);
    organizer.organize();
}

module.exports = FileOrganizer;