---
sidebar_position: 10
sidebar_label: Pricing
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Pricing

The Zapper API uses a credit system to manage how many queries an API key can perform. Each query made costs a certain amount of credits, and these credits are deducted from the accounts credit balance.

---

### Buying Credits

Credits can be purchased onchain with any wallet. Payment is supported in over a hundred different tokens including ETH, MATIC, USDC, USDT, DAI, and much more. Once purchased, credits can be spent for API usage. 

The rate for purchasing credits is **$1 USD = 1,000 Credits**.


If you run out of credits and have used your 5,000 credit free tier, then you will need to purchase more credits in order to continue using the API.

Clients can track query usage and credits over time and purchase additional credits on the [Dashboard](/dashboard).

### Query Prices

#### `portfolio`: 3 Credits ($3.00/1,000 Queries)

The `portfolio` query can be called with one or more of the following fields for **3 credits**:

| Query | Description
| ----------- | ----------- | ----------- |
| [`appBalances`](/docs/api-intro/portfolio/app-balances)  | blah blah |
| [`nftBalances`](/docs/api-intro/portfolio/nft-balances)  | blah blah |
| [`tokenBalances`](/docs/api-intro/portfolio/token-balances) | 3 |
| [`claimables`](/docs/api-intro/portfolio/claimables) | 3 |
| [`totals`](/docs/api-intro/portfolio/portfolio-totals) | 3 |


#### [`accountsTimeline`](/docs/api-intro/human-readable-transactions): 2 Credits ($2.00/1,000 Queries)

#### [`account`](/docs/api-intro/onchain-identity) and [`accounts`](/docs/api-intro/onchain-identity#accounts): 2 Credits ($2.00/1,000 Queries)

:::info
Each address used in a query counts as 1 query. If you bundle multiple addresses into 1 call the cost = query price * # of addresses.
:::

### Free Tier

All API clients can use up to 5,000 credits for free. This gives clients at least 1,500 queries without having to purchase credits and can be a great way to try the API.

The GraphQL [Sandbox](/docs/api-intro/sandbox) can also be used to test queries in-browser without using the free tier.


Note that it is against the Zapper API [Terms of Service](https://zapper.xyz/docs/api-terms-of-use.pdf) to create multiple API keys with the goal of accumulating free credits.


<LinkButton href="/dashboard" type="primary" buttonCopy="Get Started" />

---

:::note
API calls are initially rate limited at **30 requests per minute**. Please contact us at ops@zapper.xyz to increase your limit.
:::