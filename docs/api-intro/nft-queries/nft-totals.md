---
sidebar_position: 5
sidebar_label: Totals & Stats
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Totals & Stats

Get aggregate statistics for NFT holdings, including total count and total value of NFTs owned by specified addresses.

---

### `nftUsersTokensTotals`

The `nftUsersTokensTotals` query returns aggregate statistics about NFTs owned by specified addresses, with support for the same filtering options as `nftUsersTokens`. This is useful for getting quick summaries of NFT holdings without fetching individual token details.

### Example Use Case: Portfolio Summary

Let's say you want to show the total value and count of NFTs in a user's portfolio. Start by passing the `owners` addresses you want to check. Then return the `count` of NFTs matching your filters, the `totalCount` of all NFTs owned, and the combined `balanceUSD` value. You can optionally specify a `network` or other filters to narrow down the results.

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


---


### `nftUsersCollectionsTotals`

The `nftUsersCollectionsTotals` query takes an array of `owners` addresses and returns aggregate statistics about their NFT collection holdings.

### Example Use Case: Collection Statistics

Let's say you want to show summary statistics about a user's NFT collections. Start by passing the `owners` addresses you want to check. Then return the `count` of collections matching your filters, the `totalCount` of all collections owned, and the combined `balanceUSD` value. You can optionally specify a `network` or minimum value to filter the results.

#### Example Variables

```js
{
  "owners": ["0x3d280fde2ddb59323c891cf30995e1862510342f"],
  "network": "ETHEREUM_MAINNET"
}
```

#### Example Query

```graphql
query($owners: [Address!]!, $network: Network) {
  nftUsersCollectionsTotals(
    owners: $owners
    network: $network
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
    "nftUsersCollectionsTotals": {
      "count": "216",
      "totalCount": "216",
      "balanceUSD": "669563.3800342071"
    }
  }
}
```

<SandboxButton/>

---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `owners` | Wallet addresses to check collection holdings | `[Address!]!` | Yes |
| `network` | Filter collections by specific network | `Network` | No |
| `minCollectionValueUsd` | Minimum USD value threshold for collections | `Float` | No |
| `collectionIds` | Only count specific collections | `[ID!]` | No |
| `standard` | Filter by NFT standard (ERC721/ERC1155) | `NftStandard` | No |
| `search` | Search string to filter collections | `String` | No |
| `onlyHidden` | Show only hidden collections | `Boolean` | No |
| `withOverrides` | Include manual value overrides | `Boolean` | No |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `count` | Number of collections matching your filters | `BigDecimal!` |
| `totalCount` | Total number of collections owned, regardless of filters | `BigDecimal` |
| `balanceUSD` | Total value in USD of collections matching your filters | `BigDecimal!` |

### Notes
- Perfect for collection portfolio summaries
- Works across multiple wallet addresses
- Can filter by network, value, and NFT standard
- Values are based on floor prices and recent sales
- Supports both ERC721 and ERC1155 collections