---
sidebar_position: 5
---

---

Onchain token prices are provided from this resolver along with onchain sourced pricing data, current and historical, for any given token that has an `onchainMarketData` (that has an available onchain market).

The price can be sourced from multiple onchain sources. If that is the case the price returned is the average price.

### `FungibleToken`
Retrieve basic token & onchain pricing information.

```sh
query FungibleToken($address: Address!, $network: Network!, $currency: Currency)
```



---
### `FungibleTokenPriceChart`
 Returns historical price data to populate price charts.


```sh
query FungibleTokenPriceChart($address: Address!, $network: Network!, $currency: Currency!, $timeFrame: TimeFrame!)
```

---

### `FungibleTokenLatestSwaps`
Returns the most recent onchain swaps for a given fungible token.


```sh
query FungibleTokenLatestSwaps($address: Address!, $network: Network!, $currency: Currency!, $first: Int)
```
