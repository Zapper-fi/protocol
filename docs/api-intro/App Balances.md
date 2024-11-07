---
sidebar_position: 4
---

---

The `GetAppBalancesQuery` returns any DeFi or other App balances for a given account(s) across the set of networks.

Also note that smart accounts accounts like Maker’s `DSProxy` are automatically included in the balance response as part of an “implicit” bundle.
Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.


```sh
query GetAppBalancesQuery(
  $addresses: [Address!]!
  $networks: [Network!]!
  $appIds: [String!]
)
```
*Retrieve all indexed DeFi app balances for an account address on a set of networks (and optionally, for a set of app slugs)*