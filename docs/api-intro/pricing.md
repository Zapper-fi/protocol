---
sidebar_position: 10
sidebar_label: Pricing
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Pricing

---

### How does pricing work?

The Zapper API uses a credit system to manage how many queries an API key can perform. Each query made costs a certain amount of credits, and these credits are deducted from the accounts credit balance.

### Buying Credits

Credits can be purchased onchain with any wallet and payment is supported in over a hundred different tokens. Once purchased, credits can be spent for API usage. If you run out of credits, and you have used your 10,000 free tier credits, then you will need to purchase additional credits in order to continue querying the API.


Clients can track query usage and credits over time and purchase additional credits on the [Dashboard](/dashboard).


### Free Tier

To support hobbyist developers and personal projects, all API clients can use up to 10,000 credits for free at the start of each month. The free credits will expire at the end of every month.

Note that it is against the Zapper API [Terms of Service](https://zapper.xyz/docs/api-terms-of-use.pdf) to create multiple API Keys with the goal of accumulating free credits.

### Query Prices

To make the API pricing simple, any portfolio related queries such as balaces, totals, or claimables have a fixed cost of 4 credits. All other queries cost 2 credits.

Please reference the table below to idenitfy how much certain queries will cost:

| Queries | Price |
| ----------- | ----------- |
| `appBalances` | 4 Credits | 
| `nftBalances` | 4 Credits | 
| `tokenBalances` | 4 Credits | 
| `claimables` | 4 Credits | 
| `totals` | 4 Credits | 
| `account` | 2 Credits | 
| `accountsTimeline` | 2 Credits | 


:::info
When making a query, each address counts as 1 query, even if multiple addresses are bundled into 1 call.
:::

<LinkButton href="./dashboard" type="primary" buttonCopy="Visit Dashboard" />


### Discounts for Credit Purchases

After the alpha concludes, discounts will be offered for purchasing larger amounts of credits. There will be more information provided on this soon.


:::note
API calls are initially rate limited at **30 times per minute**. Please contact us at ops@zapper.xyz to request a higher limit.
:::