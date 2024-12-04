---
sidebar_position: 6
sidebar_label: Single NFT Holdings
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Token Holdings

Query individual NFTs owned by specific addresses, with detailed token information and filtering capabilities.

---

### `nftUsersTokens`

The `nftUsersTokens` query returns individual NFTs owned by specified addresses, with support for filtering by network, minimum value, and specific collections. It includes information about each NFT's metadata, traits, and current value.

### Example Use Case: User's NFT Gallery

Let's say you want to display a user's individual NFTs in a gallery view, this query provides comprehensive token data with filtering capabilities for better organization and display.

#### Example Variables

```js
{
  "owners": ["0x3d280fde2ddb59323c891cf30995e1862510342f"],
  "network": "ETHEREUM_MAINNET",
  "minEstimatedValueUsd": 1000,
  "first": 12,
  "withOverrides": true
}
```

#### Example Query

```graphql
query($owners: [Address!]!, $network: Network, $minEstimatedValueUsd: Float, $first: Int, $withOverrides: Boolean) {
  nftUsersTokens(
    owners: $owners
    network: $network
    minEstimatedValueUsd: $minEstimatedValueUsd
    first: $first
    withOverrides: $withOverrides
  ) {
    edges {
      node {
        id
        tokenId
        name
        description
        estimatedValue {
          valueUsd
          valueWithDenomination
          denomination {
            symbol
          }
        }
        collection {
          name
          address
          network
        }
        mediasV3 {
          images {
            edges {
              node {
                original
                thumbnail
              }
            }
          }
        }
        traits {
          attributeName
          attributeValue
          supplyPercentage
        }
      }
      ownedAt
      balances {
        balance
        valuationStrategy
        account {
          address
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

#### Example Response

```js
{
  "data": {
    "nftUsersTokens": {
      "edges": [
        {
          "node": {
            "id": "TmZ0VG9rZW4tNzE5MDk1MjA=",
            "tokenId": "1465",
            "name": "CryptoPunk #1465",
            "description": null,
            "estimatedValue": {
              "valueUsd": 165847.84872397,
              "valueWithDenomination": 43.374677,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "collection": {
              "name": "CryptoPunks",
              "address": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
              "network": "ETHEREUM_MAINNET"
            },
            "mediasV3": {
              "images": {
                "edges": [
                  {
                    "node": {
                      "original": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F4c7216792992be283dd9c65376998b1265b6a1ea1ee127ed55338ef0c0e119dd.png&checksum=c4bb5",
                      "thumbnail": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F4c7216792992be283dd9c65376998b1265b6a1ea1ee127ed55338ef0c0e119dd.png&width=100&checksum=31551"
                    }
                  }
                ]
              }
            },
            "traits": [
              {
                "attributeName": "accessory",
                "attributeValue": "Mohawk Dark",
                "supplyPercentage": 4.28
              },
              {
                "attributeName": "accessory",
                "attributeValue": "Regular Shades",
                "supplyPercentage": 5.27
              },
              {
                "attributeName": "type",
                "attributeValue": "Male",
                "supplyPercentage": 60.38
              },
              {
                "attributeName": "accessory",
                "attributeValue": "Cigarette",
                "supplyPercentage": 9.61
              }
            ]
          },
          "ownedAt": null,
          "balances": [
            {
              "balance": "1",
              "valuationStrategy": "OVERRIDE",
              "account": {
                "address": "0x3d280fde2ddb59323c891cf30995e1862510342f"
              }
            }
          ]
        }
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
| `first` | Number of NFTs to return (default: 24) | `Int` | No |
| `after` | Cursor for pagination | `String` | No |
| `withOverrides` | Include value overrides | `Boolean` | No |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `edges` | Array of NFT edges | `[NftUserTokenEdge!]!` |
| `pageInfo` | Pagination information | `PageInfo!` |
| `node` | NFT token information | `NftToken!` |
| `ownedAt` | Timestamp when the NFT was acquired | `DateTime` |
| `balances` | Current ownership balances | `[NftUserTokenBalance!]!` |

### Related Types

- `NftToken`: Detailed token information
- `NftValueDenomination`: Price information in USD and native currency
- `NftMedias`: Token media assets
- `NftTrait`: Token attributes and traits
- `PageInfo`: Pagination metadata

### Notes
- Supports pagination for handling large NFT collections
- Can filter by network, value, and NFT standard
- Returns comprehensive token metadata including estimated values
- Includes ownership information and acquisition dates
- Supports both ERC721 and ERC1155 tokens