---
sidebar_position: 4
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

Arguments for `nftBalances`

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | Description goes here.       | `String!` | 
| `networks`      | Description goes here.       | `Network!` | 
| `appIds`      | Description goes here.       | `String!` | 
| `withOverrides`      | Description goes here.       | `Boolean = false` | 

Fields for `nftBalances`

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | Description goes here.       | `Network!`       |
| `balanceUSD`      | Description goes here.       | `Float!` | 