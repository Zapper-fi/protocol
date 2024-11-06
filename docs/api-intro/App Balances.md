---
sidebar_position: 4
---

---

The `portfolio` query enables requesting token, DeFi, and NFT balances for a given account(s) across the set of networks supported by Zapper.

Prior to fetching balances, or to recompute stale balances, the developer should trigger jobs to recompute app and token balances as documented below. The job statuses can be monitored until completed, at which point the balances query can be refetched. Token balances are recomputed in the background for one day for a tracked account.

Also note that smart accounts accounts like Maker’s `DSProxy` are automatically included in the balance response as part of an “implicit” bundle.
Typically, a single transaction generates multiple timeline events: one for each wallet impacted by the transaction and one for the associated application, if any.

*Retrieve all indexed DeFi app balances for an account address on a set of networks (and optionally, for a set of app slugs)*

```sh
query GetAppBalancesQuery(
  $addresses: [Address!]!
  $networks: [Network!]!
  $appIds: [String!]
)
```