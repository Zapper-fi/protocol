---
sidebar_position: 5
sidebar_label: NFT Balances
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Balances

---

### `nftBalances`

The `nftBalances` field from the `portfolio` query takes an `address` with optional `networks`. It returns `balanceUSD` — an aggregation of estimated NFTs values.

:::note

Estimated value in USD for NFTs is calculated using Zapper's algorithm. It can be overridden to be the top offer, last sale, or a user submitted value. NFTs can also be set as hidden by the owner to remove them from the default portfolio view — removing its value from `nftBalances`.

:::


### Example Variable

```js
{
  "addresses": ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
  "networks": ["BASE_MAINNET"]
}
```

### Example Query

```graphql
query($addresses: [Address!]!, $networks: [Network!]) {
  portfolio(addresses: $addresses, networks: $networks) {
    nftBalances {
      balanceUSD
      network
    }
  }
}
```

#### Example Response

```js
{
  "data": {
    "portfolio": {
      "nftBalances": [
        {
          "balanceUSD": 1662.061734333,
          "network": "BASE_MAINNET"
        }
      ]
    }
  }
}
```

<SandboxButton/>

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `addresses`      | The address(s) that is being queried, input as an array.       | `Address!` | 
| `networks`      | Returns only NFTs from network provided. If not provided, NFTs across all supported chains for NFTs will be returned.      | `Network!` | 
| `withOverrides`      | Includes user submitted NFT value overrides, default is off.      | `Boolean = false` | 

### Fields

Fields for `nftBalances`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | Returns the network for balances.     | `Network!`       |
| `balanceUSD`      | Returns the estimated USD value.      | `Float!` | 
