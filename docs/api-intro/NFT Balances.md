---
sidebar_position: 3
---

---

`NftUserTokenListQuery` returns the the NFTs owned by an address.

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

*Get most valuable NFTs owned by a user. *