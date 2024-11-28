---
sidebar_position: 11
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

#### Portfolio Data: 3 Credits

The `portfolio` query can be called with one or more of the following fields for **3 credits**:

| Field | Description |
| ----------- | ----------- |
| [`appBalances`](/docs/api-intro/portfolio/app-balances)  | Surfaces balances that a user might hold inside of an onchain application.|
| [`nftBalances`](/docs/api-intro/portfolio/nft-balances)  | Returns an aggregation of estimated NFTs values. |
| [`tokenBalances`](/docs/api-intro/portfolio/token-balances) | Surfaces any onchain token balances held by an address. |
| [`claimables`](/docs/api-intro/portfolio/claimables) | Surfaces all available claimable tokens for a given address across all indexed onchain apps.|
| [`totals`](/docs/api-intro/portfolio/portfolio-totals) | Surfaces various aggregations of onchain portfolio data. |

#### [`timelineEvent`](/docs/api-intro/human-readable-transactions/timeline-event): 2 Credits

#### [`timelineForApp`](/docs/api-intro/human-readable-transactions/app-timelines): 2 Credits

#### [`accountsTimeline`](/docs/api-intro/human-readable-transactions/account-timelines): 2 Credits

#### [`account`](/docs/api-intro/onchain-identity) and [`accounts`](/docs/api-intro/onchain-identity#accounts): 2 Credits

:::info
Each address used in a query counts as a query. If you bundle multiple addresses into a single call the cost = query price multiplied by the # of addresses.
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