---
sidebar_position: 5
sidebar_label: NFT Balances
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# NFT Balances

Returns the estimated value in USD of NFTs owned by an address across networks.

---

### `nftBalances`

Returns the estimated value in USD of NFTs owned by an address across networks.

:::note
NFT tokens estimated value in USD is calculated using in-house built algorithm. NFT valuation can be overridden to be the top offer, last sale or any other user hard coded value. NFT tokens can be set as hidden to remove them from the default portfolio view.
:::

### Reference

<details>
<summary>Arguments for nftBalances</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Addresses for which to retrieve       | `String!` | 
| `networks`      | Returns only NFTs from network provided. If not provided, NFTs across all supported chains for NFTs will be returned      | `Network!` | 
| `withOverrides`      | Include user value overrides, default off.      | `Boolean = false` | 

</details>

<details>
<summary>Fields for nftBalances</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | Returns the network that an NFT is on      | `Network!`       |
| `balanceUSD`      | Returns the estimated USD value      | `Float!` | 

</details>

### Example Query

```graphql
query Portfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    nftBalances {
      balanceUSD
      network
    }
  }
}
```

### Example Variables

```json
{
  "addresses": ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"]
}
```

<LinkButton href="/sandbox" type="primary" buttonCopy="Try in sandbox" />