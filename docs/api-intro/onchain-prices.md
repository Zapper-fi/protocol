---
sidebar_position: 6
sidebar_label: Onchain Prices
---

# Onchain Prices (Coming Soon)

---




# Onchain Prices

Get comprehensive onchain prices current and historical, for any token that has an onchain market across supported networks.

---

### `fungibleToken`

The `fungibleToken` query returns detailed information about a token including its onchain market data, price history, and real-time swap data. This is particularly useful for getting accurate, onchain-sourced pricing information.

### Example Use Case: Token Price Chart

Let's say you want to create a graph that illustrates the current and historical price for a token....

#### Example Variables

```js
{
  "address": "0x00ef6220b7e28e890a5a265d82589e072564cc57",
  "network": "BASE_MAINNET"
}
```

#### Example Query

```graphql
query($address: Address!, $network: Network!) {
  fungibleToken(address: $address, network: $network) {
    id
    name
    symbol
    decimals
    marketData {
      ... on OnchainMarketData {
        type
        price(currency: USD)
        priceChange1h
        priceChange24h
        totalLiquidity(currency: USD)
        marketCap
        latestSwaps(first: 5) {
          edges {
            node {
              transactionHash
              timestamp
              soldAmount
              boughtAmount
              volumeUsd
            }
          }
        }
        priceTicks(currency: USD, timeFrame: DAY) {
          timestamp
          open
          close
          high
          low
          median
        }
      }
    }
    isVerified
    totalSupply
    imageUrl
    credibility
    rank
  }
}
```

#### Example Response

```js
{
soon
}
```

:::note
It is possible for a token to have different prices from multiple onchain sources. If so, the average price across all sources is returned.
:::

---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `address` | Token contract address | `Address!` | Yes |
| `network` | Network where the token exists | `Network!` | Yes |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `id` | Unique identifier for the token | `ID!` |
| `address` | Contract address | `Address!` |
| `name` | Token name | `String!` |
| `symbol` | Token symbol | `String!` |
| `decimals` | Number of decimals | `Int!` |
| `totalSupply` | Total supply of the token | `String` |
| `marketData` | Price and market information | `MarketData` |
| `credibility` | Token credibility score | `Float` |
| `rank` | Token rank | `Int` |
| `securityRisk` | Security risk assessment | `FungibleTokenSecurityRisk` |
| `isHoldersSupported` | Whether holder data is available | `Boolean!` |
| `imageUrl` | Token logo URL | `String!` |
| `onchainMarketData` | Detailed onchain market data | `OnchainMarketData` |
| `isVerified` | Token verification status | `Boolean!` |

### Notes
- Provides real-time onchain price data
- Includes price history with customizable timeframes
- Shows recent swap activity
- Offers security and credibility metrics
- Supports multiple price currencies (default: USD)
- Can track liquidity and market cap data
- Includes holder statistics when available