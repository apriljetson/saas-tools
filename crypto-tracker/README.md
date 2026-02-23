# Crypto Portfolio Tracker
## Track your holdings across wallets and exchanges

---

## Features

- **Multi-wallet tracking** - Add wallet addresses
- **Price alerts** - Get notified on price moves
- **P&L calculations** - Profit/loss tracking
- **Historical charts** - Visualize portfolio over time
- **DeFi integration** - Track staking, lending positions

---

## Supported Chains

| Chain | Status |
|-------|--------|
| Ethereum | ✅ |
| Solana | ✅ |
| Base | ✅ |
| Polygon | ✅ |
| Arbitrum | ✅ |
| Avalanche | ✅ |
| BSC | ✅ |

---

## API Endpoints

```
GET /api/portfolio/:address
GET /api/prices?coins=btc,eth,sol
POST /api/alerts
  { coin, condition, price, notification }
```

---

## Data Sources

- **Prices:** CoinGecko API (free tier)
- **Balances:** RPC nodes /wallet APIs
- **Historical:** CoinGecko historical data
