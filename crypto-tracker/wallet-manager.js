/**
 * Crypto Wallet Manager CLI
 * Manage multiple wallets securely (local storage only)
 * NEVER store private keys - only public addresses
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const WALLETS_FILE = path.join(__dirname, 'wallets.json');

// In-memory storage
let wallets = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function loadWallets() {
    if (fs.existsSync(WALLETS_FILE)) {
        wallets = JSON.parse(fs.readFileSync(WALLETS_FILE, 'utf8'));
    }
}

function saveWallets() {
    fs.writeFileSync(WALLETS_FILE, JSON.stringify(wallets, null, 2));
}

function listWallets() {
    console.log('\n📋 Your Wallets:\n');
    wallets.forEach((w, i) => {
        console.log(`${i + 1}. ${w.name}`);
        console.log(`   Type: ${w.type} | Chain: ${w.chain}`);
        console.log(`   Address: ${w.address.substring(0, 20)}...`);
        console.log(`   Balance: $${w.balance || 0}\n`);
    });
}

function addWallet() {
    return new Promise((resolve) => {
        rl.question('Wallet name: ', (name) => {
            rl.question('Type (cold/hot/newcoin): ', (type) => {
                rl.question('Chain (ethereum/solana/base/bitcoin): ', (chain) => {
                    rl.question('Public address: ', (address) => {
                        rl.question('Balance (USD): ', (balance) => {
                            wallets.push({
                                id: Date.now(),
                                name,
                                type,
                                chain,
                                address,
                                balance: parseFloat(balance) || 0,
                                created: new Date().toISOString()
                            });
                            saveWallets();
                            console.log('\n✅ Wallet added!\n');
                            resolve();
                        });
                    });
                });
            });
        });
    });
}

function removeWallet() {
    return new Promise((resolve) => {
        listWallets();
        rl.question('Enter wallet number to remove: ', (num) => {
            const index = parseInt(num) - 1;
            if (index >= 0 && index < wallets.length) {
                const removed = wallets.splice(index, 1)[0];
                saveWallets();
                console.log(`\n✅ Removed: ${removed.name}\n`);
            } else {
                console.log('\n❌ Invalid selection\n');
            }
            resolve();
        });
    });
}

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    
    loadWallets();
    
    console.log('\n🔐 Crypto Wallet Manager\n');
    
    switch (command) {
        case 'list':
            listWallets();
            break;
            
        case 'add':
            await addWallet();
            listWallets();
            break;
            
        case 'remove':
            await removeWallet();
            break;
            
        case 'cold':
            console.log('\n🔒 Cold Wallets (Hardware):\n');
            wallets.filter(w => w.type === 'cold').forEach(w => 
                console.log(`- ${w.name} (${w.chain})`)
            );
            break;
            
        case 'hot':
            console.log('\n🔥 Hot Wallets:\n');
            wallets.filter(w => w.type === 'hot').forEach(w => 
                console.log(`- ${w.name} (${w.chain})`)
            );
            break;
            
        case 'newcoin':
            console.log('\n🆕 New Coin Wallets:\n');
            wallets.filter(w => w.type === 'newcoin').forEach(w => 
                console.log(`- ${w.name} (${w.chain})`)
            );
            break;
            
        case 'export':
            // Export only public info (never private keys!)
            console.log('\n📤 Exporting wallet data (public addresses only)...\n');
            const exportData = wallets.map(w => ({
                name: w.name,
                type: w.type,
                chain: w.chain,
                address: w.address
            }));
            console.log(JSON.stringify(exportData, null, 2));
            break;
            
        default:
            console.log(`
Usage: node wallet-manager.js <command>

Commands:
  list      - List all wallets
  add       - Add new wallet
  remove    - Remove wallet
  cold      - Show cold wallets only
  hot       - Show hot wallets only
  newcoin   - Show new coin wallets only
  export    - Export wallet data (addresses only)

⚠️  Security: Never store private keys or seed phrases!
            `);
    }
    
    rl.close();
}

main();