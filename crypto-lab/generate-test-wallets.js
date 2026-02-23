/**
 * Test Wallet Generator
 * Generates TEST/MOCK wallet addresses for the crypto lab
 * 
 * ⚠️ WARNING: These are for TESTING ONLY - NOT real wallets!
 * 
 * To create real wallets:
 * 1. Buy a hardware wallet (Ledger/Trezor)
 * 2. Set up through official apps
 * 3. Never share seed phrases
 */

const { generateKeyPairSync, randomBytes } = require('crypto');

// Generate test Ethereum address
function generateTestEthAddress() {
    // This creates a valid-format address but is NOT a real wallet
    const randomHex = randomBytes(20).toString('hex');
    return '0x' + randomHex;
}

// Generate test Solana address
function generateTestSolAddress() {
    // Base58 encoded random bytes (valid format only)
    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let address = '';
    for (let i = 0; i < 44; i++) {
        address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
}

// Generate test Bitcoin address
function generateTestBtcAddress() {
    const randomHex = randomBytes(20).toString('hex');
    // Legacy address format (starts with 1)
    return '1' + randomHex.substring(0, 33);
}

console.log('\n🔐 Test Wallet Generator (Crypto Lab)\n');
console.log('⚠️  WARNING: These are TEST wallets only!\n');
console.log('-'.repeat(40));

const testWallets = {
    ethereum: {
        type: 'cold',
        chain: 'ethereum',
        address: generateTestEthAddress(),
        label: 'Test Cold Wallet',
        note: 'For testing only - NOT REAL CRYPTO'
    },
    solana: {
        type: 'hot',
        chain: 'solana', 
        address: generateTestSolAddress(),
        label: 'Test Trading Wallet',
        note: 'For testing only - NOT REAL CRYPTO'
    },
    base: {
        type: 'newcoin',
        chain: 'base',
        address: generateTestEthAddress(),
        label: 'Test New Coin Wallet',
        note: 'For testing only - NOT REAL CRYPTO'
    }
};

console.log('\n📋 Generated Test Wallets:\n');

Object.entries(testWallets).forEach(([name, wallet]) => {
    console.log(`${wallet.chain.toUpperCase()} (${wallet.type}):`);
    console.log(`  Address: ${wallet.address}`);
    console.log(`  Note: ${wallet.note}\n`);
});

console.log('─'.repeat(40));
console.log('\n💡 To add REAL wallets:');
console.log('   1. Buy Ledger or Trezor');
console.log('   2. Set up through official apps');
console.log('   3. Add public address to vault.html');
console.log('   4. NEVER share seed phrases\n');

// Export for use
module.exports = { testWallets };