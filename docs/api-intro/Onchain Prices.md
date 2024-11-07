---
sidebar_position: 5
---

---

The `FungibleToken` queries are what you would expect from the ERC-20 standard. The standardized context is provided from this resolver along with onchain sourced pricing data, current and historical, for any given token that has an `onchainMarketData` (that has an available onchain market).

The price can be sourced from multiple onchain sources. If that is the case the price returned is the average price.



```sh
query FungibleToken($address: Address!, $network: Network!, $currency: Currency)
```

*Retrieve basic token & onchain pricing information*

---


 `FungibleTokenPriceChart` returns historical price data to populate price charts.


```sh
query FungibleTokenPriceChart($address: Address!, $network: Network!, $currency: Currency!, $timeFrame: TimeFrame!)
```

*Retrieve historical price points to populate a price chart*

---

 `FungibleTokenLatestSwaps` returns the most recent swaps for a given fungible token.


```sh
query FungibleTokenLatestSwaps($address: Address!, $network: Network!, $currency: Currency!, $first: Int)
```
*Gather latest swaps happening onchain for a given fungible token*