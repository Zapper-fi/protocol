---
sidebar_position: 3
---

---

Note: NFT tokens estimated value in USD is calculated using in-house built algorithm. NFT valuation can be overridden to be the top offer, last sale or any other user hard coded value. NFT tokens can be set as hidden to remove them from the default portfolio view.

### `NftUserTokenListQuery`

Returns the the NFTs owned by an address.

```sh
uery NftUserTokenListQuery(
  $network: Network
  $owners: [Address!]!
  $minEstimatedValueUsd: Float
  $collectionIds: [ID!]
  $standard: NftStandard
  $onlyHidden: Boolean
  $withOverrides: Boolean
  $first: Int!
)
```
*Get most valuable NFTs owned by a user*