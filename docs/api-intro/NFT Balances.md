---
sidebar_position: 5
---

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

**Apollo Sandbox Goes Here**


Arguments for `nftBalances`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Filter by Address       | `String!` | 
| `networks`      | Filter by chain       | `Network!` | 
| `appIds`      | Filter by app      | `String!` | 
| `withOverrides`      | Include user value overrides       | `Boolean = false` | 

Fields for `nftBalances`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | Returns the chain      | `Network!`       |
| `balanceUSD`      | Returns the estimated USD value      | `Float!` | 