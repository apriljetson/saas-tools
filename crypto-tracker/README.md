# Crypto Storage Structure

## Secure Wallet Management

This directory contains tools for secure cryptocurrency storage management.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Portfolio tracker |
| `vault.html` | Secure wallet vault manager |
| `wallet-manager.js` | CLI wallet management |
| `docs/crypto-storage-best-practices.md` | Security guide |

## Quick Start

### Web Interface
Open `vault.html` in a browser to:
- Track multiple wallets
- Monitor portfolio distribution
- Security checklist

### CLI
```bash
# List wallets
node wallet-manager.js list

# Add wallet
node wallet-manager.js add

# Show cold wallets
node wallet-manager.js cold

# Export (addresses only)
node wallet-manager.js export
```

## Security Principles

1. **Never store private keys digitally**
2. **Use hardware wallets for >$1K**
3. **Separate wallets for trading vs long-term**
4. **Isolate new coin experiments**

## Wallet Types

- **Cold** - Hardware wallet (Ledger/Trezor)
- **Hot** - Trading wallet (MetaMask)
- **New Coin** - Isolated experiments

---

*Remember: Not your keys, not your crypto!*
