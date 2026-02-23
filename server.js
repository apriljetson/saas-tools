/**
 * SaaS Tools - API Server
 * Provides orchestration and automation capabilities
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001;

// ============================================
// HEALTH & STATUS
// ============================================

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        tools: [
            { name: 'prompt-generator', status: 'ready' },
            { name: 'crypto-tracker', status: 'ready' },
            { name: 'content-scheduler', status: 'ready' },
            { name: 'automation-tools', status: 'ready' }
        ]
    });
});

app.get('/api/status', (req, res) => {
    const toolsDir = path.join(__dirname, 'saas-tools');
    
    const tools = [
        { 
            name: 'prompt-generator', 
            path: 'prompt-generator/index.html',
            api: 'prompt-generator/index.js'
        },
        { 
            name: 'crypto-tracker', 
            path: 'crypto-tracker/index.html',
            api: null
        },
        { 
            name: 'content-scheduler', 
            path: 'content-scheduler/index.html',
            api: null
        },
        { 
            name: 'automation-tools', 
            path: 'automation-tools/README.md',
            api: 'automation-tools/file-organizer.js'
        }
    ];
    
    const status = tools.map(tool => ({
        name: tool.name,
        status: fs.existsSync(path.join(toolsDir, tool.path)) ? 'ready' : 'missing',
        hasApi: tool.api ? fs.existsSync(path.join(toolsDir, tool.api)) : false
    }));
    
    res.json({ status });
});

// ============================================
// PROMPT GENERATOR API
// ============================================

app.post('/api/prompt/generate', (req, res) => {
    try {
        const promptGen = require('./saas-tools/prompt-generator/index.js');
        const { category, type, params } = req.body;
        
        const result = promptGen.generatePrompt(category, type, params || {});
        
        res.json({ success: true, prompt: result });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/prompt/templates', (req, res) => {
    try {
        const promptGen = require('./saas-tools/prompt-generator/index.js');
        res.json({ templates: promptGen.promptTemplates });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// AUTOMATION APIs
// ============================================

app.post('/api/automate/file-organize', (req, res) => {
    const { source, dest } = req.body;
    
    if (!source || !dest) {
        return res.status(400).json({ error: 'source and dest required' });
    }
    
    try {
        const FileOrganizer = require('./saas-tools/automation-tools/file-organizer.js');
        const organizer = new FileOrganizer(source, dest);
        const stats = organizer.organize();
        
        res.json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/automate/system-stats', (req, res) => {
    try {
        const SystemMonitor = require('./saas-tools/automation-tools/system-monitor.js');
        const monitor = new SystemMonitor({ cpu: 100, mem: 100 });
        
        const cpu = monitor.getCPUUsage();
        const mem = monitor.getMemoryUsage();
        const info = monitor.getSystemInfo();
        
        res.json({ cpu, memory: mem, system: info });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ============================================
// TEST RUNNER API
// ============================================

app.post('/api/test/run', async (req, res) => {
    const { testName } = req.body;
    
    // This would run specific tests
    // For now, return info
    res.json({ 
        message: 'Use npm test to run the full test suite',
        availableTests: [
            'prompt-generator',
            'crypto-tracker', 
            'content-scheduler',
            'automation-tools',
            'dashboard'
        ]
    });
});

// ============================================
// ORCHESTRATION
// ============================================

app.post('/api/orchestrate', async (req, res) => {
    const { actions } = req.body;
    
    const results = [];
    
    for (const action of actions) {
        try {
            let result;
            
            switch (action.type) {
                case 'prompt':
                    const promptGen = require('./saas-tools/prompt-generator/index.js');
                    result = promptGen.generatePrompt(action.category, action.template, action.params);
                    break;
                    
                case 'system-stats':
                    const SystemMonitor = require('./saas-tools/automation-tools/system-monitor.js');
                    const monitor = new SystemMonitor({ cpu: 100, mem: 100 });
                    result = {
                        cpu: monitor.getCPUUsage(),
                        memory: monitor.getMemoryUsage()
                    };
                    break;
                    
                default:
                    result = { error: 'Unknown action type' };
            }
            
            results.push({ action: action.type, success: true, result });
        } catch (error) {
            results.push({ action: action.type, success: false, error: error.message });
        }
    }
    
    res.json({ results });
});

// ============================================
// SERVE STATIC FILES
// ============================================

app.use(express.static(path.join(__dirname, 'saas-tools')));

// Start server
app.listen(PORT, () => {
    console.log(`🚀 SaaS Tools API running on http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log(`   Status: http://localhost:${PORT}/api/status`);
});

module.exports = app;