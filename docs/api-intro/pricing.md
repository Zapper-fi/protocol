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

#### Portfolio Data: 3 Credits

The `portfolio` query can be called with one or more of the following fields for **3 credits**:

| Field | Description |
| ----------- | ----------- |
| [`appBalances`](/docs/api-intro/portfolio/app-balances)  | Surfaces balances that a user might hold inside of an onchain application.|
| [`nftBalances`](/docs/api-intro/portfolio/nft-balances)  | Returns an aggregation of estimated NFTs values. |
| [`tokenBalances`](/docs/api-intro/portfolio/token-balances) | Surfaces any onchain token balances held by an address. |
| [`claimables`](/docs/api-intro/portfolio/claimables) | Surfaces all available claimable tokens for a given address across all indexed onchain apps.|
| [`totals`](/docs/api-intro/portfolio/portfolio-totals) | Surfaces various aggregations of onchain portfolio data. |

#### Other Queries: 2 Credits

| Field | Description | Credit Price |
| ----------- | ----------- | ----------- |
| [`timelineEvent`](/docs/api-intro/human-readable-transactions/timeline-event)  | Returns the details of a single onchain transaction. |
| [`timelineForApp`](/docs/api-intro/human-readable-transactions/app-timelines) | Returns a timeline of transactions that happened in a particular onchain app via their smart contracts. |
| [`accountsTimeline`](/docs/api-intro/human-readable-transactions/account-timelines) | Returns the onchain activity of a specific address(s).|
| [`accounts`](/docs/api-intro/onchain-identity#accounts) | Surfaces various aggregations of onchain portfolio data. |


:::info
Each address used in a query counts as a query. If you bundle multiple addresses into a single call the cost = query price multiplied by the # of addresses.
:::

### Credit Pricing Tiers

We offer volume-based discounts through our tiered pricing system:

| Tier | Credit Range | Price per Credit | Price per 1,000 Credits | Discount |
|------|--------------|------------------|------------------------|----------|
| 1 | 0-15,000,000 | $0.001 | $1.00 | - |
| 2 | 15,000,001-50,000,000 | $0.0008 | $0.80 | 20% |
| 3 | 50,000,001+ | $0.0007 | $0.70 | 30% |

For example, purchasing 60,000,000 credits would cost:
- First 15,000,000 credits at $0.001 each
- Next 35,000,000 credits at $0.0008 each
- Final 10,000,000 credits at $0.0007 each

### Free Tier

All API clients can use up to 5,000 credits for free. This gives clients at least 1,500 queries without having to purchase credits and can be a great way to try the API.

The GraphQL [Sandbox](/docs/api-intro/sandbox) can also be used to test queries in-browser without using the free tier.


Note that it is against the Zapper API [Terms of Service](https://zapper.xyz/docs/api-terms-of-use.pdf) to create multiple API keys with the goal of accumulating free credits.


<LinkButton href="/dashboard" type="primary" buttonCopy="Get Started" />

---

:::note
API calls are initially rate limited at **30 requests per minute**. Please contact us at api@zapper.xyz to increase your limit.
:::