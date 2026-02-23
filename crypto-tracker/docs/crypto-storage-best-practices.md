# Crypto Storage Best Practices - Research

## Wallet Types

### Hot Wallets (Online) - USE FOR SMALL AMOUNTS
| Wallet | Type | Security | Best For |
|--------|------|----------|----------|
| **MetaMask** | Browser/Mobile | Medium | Daily trading |
| **Phantom** | Solana | Medium | Solana tokens |
| **Rainbow** | Mobile | Medium | iOS/Android |
| **Coinbase Wallet** | Custodial | Medium-High | Beginners |

### Cold Wallets (Offline) - USE FOR LARGE AMOUNTS
| Wallet | Type | Security | Best For |
|--------|------|----------|----------|
| **Ledger** | Hardware | Very High | Long-term storage |
| **Trezor** | Hardware | Very High | Maximum security |
| **Paper Wallet** | Paper | Very High | Air-gapped storage |
| **Brain Wallet** | Memory | Very High | Maximum anonymity |

---

## Security Best Practices

### 1. The 3-2-1 Rule
- **3** copies of your keys
- **2** different storage types
- **1** copy offsite (safe deposit box)

### 2. Never Store Keys In:
- ❌ Cloud storage (Google Drive, iCloud)
- ❌ Email
- ❌ Screenshots
- ❌ Plain text files
- ❌ Exchanges (not your keys)

### 3. Always Do:
- ✅ Use hardware wallet for >$1K
- ✅ Write down seed phrases on PAPER
- ✅ Store seed in SAFE PLACE (safe deposit box)
- ✅ Use密码 manager for addresses
- ✅ Test with small amount first
- ✅ Enable 2FA on everything

### 4. Seed Phrase Security
- Write on PAPER (not metal - harder to read in fire)
- Store in multiple locations
- Never digital copy
- Use BIP39 standard (12/24 words)
- Never share with anyone

---

## Multi-Sig (For Large Amounts)

### Gnosis Safe
- Requires multiple signatures to transact
- Good for: Teams, family, large holdings
- Setup: safe.global

### Multi-Sig Best Practices:
- 2-of-3 is good for most people
- Each signer in different location
- Use different wallet apps

---

## Exchange Security

### Use These Only for Trading:
- Coinbase (regulated, US-based)
- Kraken (good security, global)
- Binance (large volume, good fees)
- Bybit (derivatives, growth)

### NEVER:
- Leave large amounts on exchange
- Use same password twice
- Skip 2FA

---

## For Meme Coins / Trading

### Recommended Setup:
1. **Trading Wallet** (Hot)
   - MetaMask or Phantom
   - Only keep what you're trading with
   - $100-500 max

2. **Main Wallet** (Cold)
   - Ledger or Trezor
   - Long-term holdings
   - Majority of funds

3. **New Coin Wallet** (Isolated)
   - Fresh wallet for new/meme coins
   - Separate from main holdings
   - Only send what you can afford to lose

---

## Quick Start Setup

### Step 1: Get Hardware Wallet
- Order Ledger or Trezor
- Wait for delivery (don't expedite)

### Step 2: Generate Wallets
- Generate fresh seed phrase
- Write on paper IMMEDIATELY
- Verify 3 times

### Step 3: Configure
- Install MetaMask for trading
- Connect to hardware wallet
- Add ledger/trezor as "cold" in portfolio

### Step 4: Test
- Send $10 test transaction
- Verify receipt
- Then proceed with larger amounts

---

## Storage Structure Recommendation

```
COLD STORAGE (80% of portfolio)
├── Ledger / Trezor (hardware)
│   ├── Bitcoin (BTC)
│   ├── Ethereum (ETH)
│   └── Blue chip tokens
│
HOT TRADING (20% of portfolio)
├── MetaMask (Ethereum/Base/Solana)
│   ├── Trading funds
│   └── New coin experiments
│
NEW COIN ISOLATED (5% max)
├── Fresh wallet per project
│   └── Only for meme coins
```

---

## Emergency Contacts

Set up with trusted person:
- Seed phrase location
- How to access
- Legal instructions

Consider:
- Safe deposit box
- Estate planning
- Legal will with crypto instructions

---

*Last Updated: February 2026*
