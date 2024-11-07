---
sidebar_position: 5
---
import ApolloSandboxComponent from '@site/src/components/ApolloSandboxComponent';

---

:::note

NFT tokens estimated value in USD is calculated using in-house built algorithm. NFT valuation can be overridden to be the top offer, last sale or any other user hard coded value. NFT tokens can be set as hidden to remove them from the default portfolio view.

:::

### `nftBalances`

Returns the the NFTs owned by an address.

```sh
query($addresses: [Address!]!) {
    portfolio(addresses: $addresses) {
      nftBalances {
        
      }
    }
)
```

<ApolloSandboxComponent />


Arguments for `nftBalances`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Addresses for which to retrieve       | `String!` | 
| `networks`      | Returns only NFTs from network provided. If not provided, NFTs across all supported chains for NFTs will be returned      | `Network!` | 
| `withOverrides`      | Include user value overrides, default off.      | `Boolean = false` | 

Fields for `nftBalances`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | Returns the network that an NFT is on      | `Network!`       |
| `balanceUSD`      | Returns the estimated USD value      | `Float!` | 