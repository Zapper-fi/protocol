---
sidebar_position: 6
sidebar_label: Onchain Prices
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Onchain Prices

Get comprehensive onchain prices current and historical, for any token that has an onchain market across supported networks.

---

### `fungibleToken`

The `fungibleToken` query returns detailed information about a token including its onchain market data and price history. This is particularly useful for getting accurate, onchain-sourced pricing information, including price ticks for price graphs.

### Example Use Case: Token Price Chart

Let's say you want to create a token page providing the price, historical graphs and relevant token information like holders, supply and the token's image:

#### Example Variables

```js
{
  "address": "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b",
  "network": "BASE_MAINNET",
  "first": 3,
  "currency": "USD",
  "timeFrame": "DAY"
}
```

#### Example Query

```graphql
query($address: Address!, $network: Network!, $first: Float!, $currency: Currency!, $timeFrame: TimeFrame!) {
  fungibleToken(address: $address, network: $network) {
    address
    decimals
    holders(first: $first) {
      edges {
        node {
          holderAddress
          percentileShare
          value
        }
      }
    }
    imageUrl
    isVerified
    name
    onchainMarketData {
      marketCap
      price
      priceChange1h
      priceChange24h
      priceChange5m
      totalGasTokenLiquidity
      totalLiquidity
      priceTicks(currency: $currency, timeFrame: $timeFrame) {
        open
        close
        timestamp
      }
    }
    totalSupply
    credibility
    securityRisk {
      reason
    }
  }
}
```

<SandboxButton/>

---

#### Example Response

```js
{
  "data": {
    "fungibleToken": {
      "address": "0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b",
      "decimals": 18,
      "holders": {
        "edges": [
          {
            "node": {
              "holderAddress": "0x33e34b8684565fcf6a9dd52a7e92c4e70211a045",
              "percentileShare": 13.676185263198864,
              "value": "50774461457002159101610000"
            }
          },
          {
            "node": {
              "holderAddress": "0xbedaf4736c7bc4ec837b270956794804b51a8f15",
              "percentileShare": 10.734552863561005,
              "value": "39853301936153000000000000"
            }
          },
          {
            "node": {
              "holderAddress": "0xf1c429b0ce94ef9893ef110d2cc100201dce71c8",
              "percentileShare": 7.3448334665283745,
              "value": "27268566239582812320742551"
            }
          }
        ]
      },
      "imageUrl": "https://storage.googleapis.com/zapper-fi-assets/tokens/base/0x0b3e328455c4059eeb9e3f84b5543f74e24e7e1b.png",
      "isVerified": false,
      "name": "Virtuals Protocol",
      "onchainMarketData": {
        "marketCap": 0,
        "price": 1.6734657858256867,
        "priceChange1h": -1.2189248852312207,
        "priceChange24h": -0.1052080164544833,
        "priceChange5m": -1.772950044856858,
        "totalGasTokenLiquidity": 2086.377403161272,
        "totalLiquidity": 8029017.21838576,
        "priceTicks": [
          {
            "open": 1.7317099434546546,
            "close": 1.713129470854715,
            "timestamp": 1733266800000
          },
          {
            "open": 1.7099732835315944,
            "close": 1.6687759419061745,
            "timestamp": 1733267400000
          },
          {
            "open": 1.692603420681665,
            "close": 1.6718833478924444,
            "timestamp": 1733268000000
          },
          ...
        ]
      },
      "totalSupply": "371261872.224199445718111888",
      "credibility": null
      "securityRisk": null
    }
  }
}
```


---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `address` | Token contract address | `Address!` | Yes |
| `network` | Network where the token exists | `Network!` | Yes |
| `currency` | Price currency (USD/ETH/BTC) | `Currency!` | Yes |
| `timeFrame` | Time interval for price data | `TimeFrame!` | Yes |
| `first` | Number of holders to fetch | `Float!` | Yes |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `id` | Unique identifier for the token | `ID!` |
| `address` | Contract address | `Address!` |
| `name` | Token name | `String!` |
| `symbol` | Token symbol | `String!` |
| `decimals` | Number of decimals | `Int!` |
| `totalSupply` | Total supply of the token | `String` |
| `credibility` | Token credibility score | `Float` |
| `rank` | Token rank | `Int` |
| `securityRisk` | Security risk assessment | `FungibleTokenSecurityRisk` |
| `isHoldersSupported` | Whether holder data is available | `Boolean!` |
| `imageUrl` | Token logo URL | `String!` |
| `onchainMarketData` | Detailed onchain market data | `OnchainMarketData` |
| `isVerified` | Token verification status | `Boolean!` |

### OnchainMarketData Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `price` | Current token price | `Float!` |
| `marketCap` | Market capitalization | `Float` |
| `totalLiquidity` | Total liquidity across all pairs | `Float!` |
| `totalGasTokenLiquidity` | Native token liquidity | `Float!` |
| `priceChange5m` | 5-minute price change percentage | `Float` |
| `priceChange1h` | 1-hour price change percentage | `Float` |
| `priceChange24h` | 24-hour price change percentage | `Float` |
| `priceTicks` | Historical price data points | `[PriceTick!]!` |

### Enums

```graphql
enum TimeFrame {
  HOUR
  DAY
  WEEK
  MONTH
  YEAR
}

enum Currency {
  USD
  EUR
  GBP
  CAD
  CNY
  KRW
  JPY
  RUB
  AUD
  NZD
  CHF
  SGD
  INR
  BRL
  ETH
  BTC
  HKD
  SEK
  NOK
  MXN
  TRY
}
```

### Notes
- Provides real-time onchain price data
- Includes price history with customizable timeframes
- Offers security and credibility metrics
- Supports multiple price currencies (default: USD)
- Tracks liquidity and market cap data
- Includes token holders statistics when available