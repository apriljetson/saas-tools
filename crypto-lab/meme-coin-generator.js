/**
 * MEME COIN GENERATOR
 * Generates an ERC-20 meme coin contract
 * 
 * To deploy:
 * 1. Go to https://remix.ethereum.org
 * 2. Paste this code
 * 3. Compile
 * 4. Deploy via MetaMask
 * 
 * Or use pump.fun (easier - just needs SOL)
 */

const TOKEN_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)", 
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint256 value)"
];

// Example meme coin configurations
const MEME_COINS = [
    {
        name: "April",
        symbol: "APRIL",
        description: "AI assistant token",
        maxSupply: "1000000000" // 1 billion
    },
    {
        name: "AdventuresOf", 
        symbol: "ADVENTURE",
        description: "Personalized storybooks",
        maxSupply: "1000000000"
    },
    {
        name: "LunaToken",
        symbol: "LUNA", 
        description: "For Luna the dog 🐕",
        maxSupply: "1000000000"
    },
    {
        name: "AIPowered",
        symbol: "AIPOW",
        description: "AI revolution token",
        maxSupply: "1000000000"
    }
];

function generateMemeCoin(config) {
    return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * ${config.name} (${config.symbol})
 * ${config.description}
 */
contract ${config.name} is ERC20, Ownable {
    
    uint256 private constant MAX_SUPPLY = ${config.maxSupply} * 10**18;
    
    mapping(address => bool) public isExcludedFromFees;
    
    constructor() ERC20("${config.name}", "${config.symbol}") Ownable(msg.sender) {
        _mint(msg.sender, MAX_SUPPLY);
        isExcludedFromFee[msg.sender] = true;
    }
    
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        _mint(to, amount);
    }
    
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
    
    // Standard ERC20 functions included via inheritance
}
`;
}

// Show available coin options
console.log("🐕 MEME COIN GENERATOR\n");
console.log("Available coin templates:\n");

MEME_COINS.forEach((coin, i) => {
    console.log(`${i + 1}. ${coin.name} (${coin.symbol})`);
    console.log(`   ${coin.description}`);
    console.log(`   Max supply: ${parseInt(coin.maxSupply).toLocaleString()}\n`);
});

// Generate first coin (APRIL)
const aprilCoin = MEME_COINS[0];
const contractCode = generateMemeCoin(aprilCoin);

console.log("═".repeat(50));
console.log(`\n📝 Generated: ${aprilCoin.name} (${aprilCoin.symbol})\n`);
console.log(contractCode.substring(0, 500) + "...\n");
console.log("═".repeat(50));

console.log(`
🚀 TO DEPLOY ON ETHEREUM/Base:

Option 1: pump.fun (EASIEST)
- Go to: https://pump.fun/coin/${aprilCoin.symbol.toLowerCase()}
- Connect wallet with SOL/ETH
- Pay ~$1-2 to launch
- No coding needed!

Option 2: Remix IDE (FREE but requires setup)
- Go to: https://remix.ethereum.org
- Create new file: ${aprilCoin.symbol}.sol
- Paste the generated contract
- Compile & deploy via MetaMask
- Costs ~$50-100 in gas

Option 3: Deploy on Base (cheaper)
- Use Base.org deployer
- Similar to option 2 but ~$10 gas

💡 For quick meme coin: Use pump.fun
💡 For custom token: Use Remix

`);

module.exports = { generateMemeCoin, MEME_COINS };