---
sidebar_position: 4
sidebar_label: NFT Total Holdings
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Holdings Totals

Get aggregate statistics for NFT holdings, including total count and total value of NFTs owned by specified addresses.

---

### `nftUsersTokensTotals`

The `nftUsersTokensTotals` query returns aggregate statistics about NFTs owned by specified addresses, with support for the same filtering options as `nftUsersTokens`. This is useful for getting quick summaries of NFT holdings without fetching individual token details.

### Example Use Case: Portfolio Summary

When you need to display summary statistics of a user's NFT holdings, such as total number of NFTs and their combined value, this query provides the aggregated data with various filtering options.

#### Example Variables

```js
{
  "owners": ["0x3d280fde2ddb59323c891cf30995e1862510342f"],
  "network": "ETHEREUM_MAINNET",
  "withOverrides": false
}
```

#### Example Query

```graphql
query($owners: [Address!]!, $network: Network, $minEstimatedValueUsd: Float, $withOverrides: Boolean) {
  nftUsersTokensTotals(
    owners: $owners
    network: $network
    minEstimatedValueUsd: $minEstimatedValueUsd
    withOverrides: $withOverrides
  ) {
    count
    totalCount
    balanceUSD
  }
}
```

#### Example Response

```js
{
  "data": {
    "nftUsersTokensTotals": {
      "count": "1335",
      "totalCount": "1335",
      "balanceUSD": "669164.78802219"
    }
  }
}
```
<SandboxButton/>

---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `owners` | Array of addresses to query NFTs for | `[Address!]!` | Yes |
| `network` | Filter NFTs by specific network | `Network` | No |
| `minEstimatedValueUsd` | Minimum USD value threshold for NFTs | `Float` | No |
| `search` | Search string to filter NFTs | `String` | No |
| `collectionIds` | Array of specific collection IDs to include | `[ID!]` | No |
| `standard` | Filter by NFT standard (ERC721/ERC1155) | `NftStandard` | No |
| `onlyHidden` | Show only hidden NFTs | `Boolean` | No |
| `withOverrides` | Include value overrides | `Boolean` | No |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `count` | Number of NFTs matching the current filter criteria | `BigDecimal!` |
| `totalCount` | Total number of NFTs owned | `BigDecimal` |
| `balanceUSD` | Total USD value of NFTs matching the filter criteria | `BigDecimal!` |

### Notes
- Returns aggregate statistics without individual token details
- Uses the same filtering options as `nftUsersTokens`
- The `count` field shows NFTs matching current filters, while `totalCount` shows all NFTs
- Values include both ERC721 and ERC1155 tokens
- USD values are based on floor prices and recent sales data
- When `withOverrides` is true, includes any manual value overrides in the calculations