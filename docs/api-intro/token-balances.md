---
sidebar_position: 3
sidebar_label: Token Balances
---

import { LinkButton } from '@site/src/components/LinkButton';
import Link from '@docusaurus/Link';

# Token Balances

Surfaces any onchain token balances held by an address.

---

### `tokenBalances`

Returns all token balances with USD prices for an address on a set of networks.

### Reference

<details>
<summary>Arguments for tokenBalances</summary>

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `address`      | -       | `String!` | 
| `networks`      | -       | `Network!` | 
| `appIds`      | -       | `String!` | 
| `withOverrides`      | -       | `Boolean = false` | 

</details>

<details>
<summary>Fields for tokenBalances</summary>

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | -       | `String!`       |
| `address`      | -       | `String!` | 
| `network`      | -       | `Network!` | 
| `token`      | -       | `BaseTokenBalance!` | 
| `updatedAt`      | -       | `Timestamp!` | 
| `balance`      | -       | `Float!` | 
| `baseToken`      | -       | `WalletTokenBalance!` | 
| `balanceUSD`      | Balance in USD ex: `2810.08`      | `Float!` | 
| `balanceRaw`      | Balance in units of the token address       | `String!` | 

</details>

### Example Query

```graphql
query Portfolio($addresses: [Address!]!) {
  portfolio(addresses: $addresses) {
    tokenBalances {
      address
      network
      token {
        balanceUSD
        balance
        baseToken {
          symbol
        }
      }
      updatedAt
    }
  }
}
```

### Example Variables

```json
{
  "addresses": ["0x3d280fde2ddb59323c891cf30995e1862510342f"]
}
```

<LinkButton href="/sandbox" type="primary" buttonCopy="Try in sandbox" />