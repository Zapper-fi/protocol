---
sidebar_position: 3
---

---


*Get most valuable NFTs owned by a user. *

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