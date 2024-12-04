---
sidebar_position: 3
sidebar_label: NFT Net Worth
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Net Worth

Calculate the total value of NFT holdings for one or more wallet addresses across networks.

---

### `nftNetWorth`

The `nftNetWorth` query takes an array of addresses and optionally a specific network to calculate the total estimated value of all NFTs held by these addresses. The value is returned in USD.

### Example Use Case: Portfolio Valuation

When you need to display the total value of a user's NFT portfolio, either across all networks or for a specific network, you can use this query to get an aggregated value in USD.

#### Example Variables

```js
{
  "addresses": [
    "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    "0x52c8ff44260056f896e20d8a43610dd88f05701b"
  ],
  "network": "ETHEREUM_MAINNET"
}
```

#### Example Query

```graphql
query($addresses: [Address!]!, $network: Network, $withOverrides: Boolean) {
  nftNetWorth(
    addresses: $addresses
    network: $network
    withOverrides: $withOverrides
  )
}
```

#### Example Response

```js
{
  "data": {
    "nftNetWorth": "32614.18746971089491"
  }
}
```

---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `addresses` | Array of wallet addresses to calculate NFT net worth | `[Address!]!` | Yes |
| `network` | Specific network to calculate NFT worth (optional) | `Network` | No |
| `withOverrides` | Include NFT value overrides in the calculation | `Boolean` | No |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `nftNetWorth` | Total value of NFT holdings in USD | `BigDecimal` |

### Notes
- Returns the combined value of all NFTs held by the specified addresses
- When `network` is not specified, calculates value across all supported networks
- Value is based on floor prices and recent sales data
- The `withOverrides` parameter allows including manual value overrides if available