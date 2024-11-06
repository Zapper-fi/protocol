---
sidebar_position: 2
---


---


*I want all indexed token balances for an account address on a set of networks.*

```sh
query GetTokenBalances(
  $addresses: [Address!]!
  $networks: [Network!]!
)
```