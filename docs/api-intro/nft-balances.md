---
sidebar_position: 5
sidebar_label: NFT Balances
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# NFT Balances

---

### `nftBalances`

The `nftBalances` query takes an `address` with optional `networks` and returns `balanceUSD` — useful for getting estimated NFT values for addresses.

### Sandbox

<ApolloSandboxComponent 
  query={nftBalancesQuery}
  variables={nftBalancesVars}
/>

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

Fields for `nftBalances`

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