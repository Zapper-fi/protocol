---
sidebar_position: 5
---

Description of the category of queries goes here. How it could be used in applications...etc.etc.


---

Onchain token prices are provided from this resolver along with onchain sourced pricing data, current and historical, for any given token that has an `onchainMarketData` (that has an available onchain market).

The price can be sourced from multiple onchain sources. If that is the case the price returned is the average price.

### `FungibleToken`
Retrieve basic token & onchain pricing information.

```sh
query FungibleToken($address: Address!, $network: Network!, $currency: Currency)
```

Fields for `FungibleToken`

| Field      | Description |
| ----------- | ----------- |
| `name`      | Description goes here.       |


---
### `FungibleTokenPriceChart`
 Returns historical price data to populate price charts.


```sh
query FungibleTokenPriceChart($address: Address!, $network: Network!, $currency: Currency!, $timeFrame: TimeFrame!)
```

Fields for `FungibleTokenPriceChart`

| Field      | Description |
| ----------- | ----------- |
| `name`      | Description goes here.       |
---

### `FungibleTokenLatestSwaps`
Returns the most recent onchain swaps for a given fungible token.


```sh
query FungibleTokenLatestSwaps($address: Address!, $network: Network!, $currency: Currency!, $first: Int)
```

Fields for `FungibleTokenLatestSwaps`

| Field      | Description |
| ----------- | ----------- |
| `name`      | Description goes here.       |