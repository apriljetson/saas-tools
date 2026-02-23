// System Monitor - Track and alert on system resources
// Monitor CPU, Memory, Disk, Network and alert on thresholds

const os = require('os');
const fs = require('fs');

class SystemMonitor {
    constructor(options = {}) {
        this.cpuThreshold = options.cpu || 80;
        this.memThreshold = options.mem || 80;
        this.diskThreshold = options.disk || 90;
        this.interval = (options.interval || 60) * 1000; // Default 60s
        this.alertCallback = options.onAlert || console.log;
        this.history = [];
    }
    
    getCPUUsage() {
        const cpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;
        
        cpus.forEach(cpu => {
            for (let type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });
        
        return {
            idle: totalIdle / totalTick * 100,
            used: 100 - (totalIdle / totalTick * 100),
            cores: cpus.length
        };
    }
    
    getMemoryUsage() {
        const total = os.totalmem();
        const free = os.freemem();
        const used = total - free;
        
        return {
            total: (total / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            used: (used / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            free: (free / 1024 / 1024 / 1024).toFixed(2) + ' GB',
            percent: (used / total * 100).toFixed(1)
        };
    }
    
    getDiskUsage() {
        // Simplified - on macOS/Linux use df command
        return { percent: 'N/A' }; // Would need platform-specific code
    }
    
    getSystemInfo() {
        return {
            hostname: os.hostname(),
            platform: os.platform(),
            uptime: (os.uptime() / 60 / 60 / 24).toFixed(1) + ' days',
            loadavg: os.loadavg()
        };
    }
    
    check() {
        const cpu = this.getCPUUsage();
        const mem = this.getMemoryUsage();
        const info = this.getSystemInfo();
        
        const snapshot = {
            timestamp: new Date().toISOString(),
            cpu: cpu.used,
            memory: mem.percent,
            info
        };
        
        this.history.push(snapshot);
        if (this.history.length > 100) this.history.shift();
        
        // Check thresholds
        if (cpu.used > this.cpuThreshold) {
            this.alertCallback(`⚠️ HIGH CPU: ${cpu.used.toFixed(1)}% (threshold: ${this.cpuThreshold}%)`);
        }
        
        if (parseFloat(mem.percent) > this.memThreshold) {
            this.alertCallback(`⚠️ HIGH MEMORY: ${mem.percent}% (threshold: ${this.memThreshold}%)`);
        }
        
        return snapshot;
    }
    
    start() {
        console.log('📊 System Monitor Started');
        console.log(`CPU Threshold: ${this.cpuThreshold}%`);
        console.log(`Memory Threshold: ${this.memThreshold}%`);
        console.log(`Interval: ${this.interval/1000}s\n`);
        
        this.check();
        
        this.timer = setInterval(() => {
            this.check();
        }, this.interval);
    }
    
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            console.log('\n🛑 Monitor stopped');
        }
    }
    
    getHistory() {
        return this.history;
    }
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    const cpu = parseInt(args.find(a => a.startsWith('--cpu='))?.split('=')[1]) || 80;
    const mem = parseInt(args.find(a => a.startsWith('--mem='))?.split('=')[1]) || 80;
    const interval = parseInt(args.find(a => a.startsWith('--interval='))?.split('=')[1]) || 60;
    
    const monitor = new SystemMonitor({
        cpu,
        mem,
        interval,
        onAlert: (msg) => {
            console.log(`[${new Date().toISOString()}] ${msg}`);
        }
    });
    
    // Handle graceful shutdown
    process.on('SIGINT', () => {
        monitor.stop();
        process.exit(0);
    });
    
    monitor.start();
}

module.exports = SystemMonitor;