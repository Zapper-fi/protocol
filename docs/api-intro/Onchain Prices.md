---
sidebar_position: 6
---

---

The `FungibleToken` queries are what you would expect from the ERC-20 standard. The standardized context is provided from this resolver along with onchain sourced pricing data, current and historical, for any given token that has an `onchainMarketData` (that has an available onchain market).



```sh
query FungibleToken($address: Address!, $network: Network!, $currency: Currency)
```

*Retrieve basic token & onchain pricing information*

---


```sh
query FungibleTokenPriceChart($address: Address!, $network: Network!, $currency: Currency!, $timeFrame: TimeFrame!)
```

*Retrieve historical price points to populate a price chart*

---

```sh
query FungibleTokenLatestSwaps($address: Address!, $network: Network!, $currency: Currency!, $first: Int)
```
*Gather latest swaps happening onchain for a given fungible token*