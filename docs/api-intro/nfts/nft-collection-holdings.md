---
sidebar_position: 5
sidebar_label: Collection Holdings
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# NFT Collection Holdings

Query NFT collections owned by specific addresses, with detailed collection information and filtering options.

---

### `nftUsersCollections`

The `nftUsersCollections` query returns collections owned by specified addresses with support for filtering by network, minimum value, and specific collections. It includes information about collection floor prices, total value, and metadata.

### Example Use Case: User's NFT Portfolio

When displaying a user's NFT portfolio grouped by collections, this query provides comprehensive collection data with filtering capabilities for better organization and display.

#### Example Variables

```js
{
  "owners": ["0x3d280fde2ddb59323c891cf30995e1862510342f"],
  "network": "ETHEREUM_MAINNET",
  "minCollectionValueUsd": 1000,
  "first": 10,
  "withOverrides": true
}
```

#### Example Query

```graphql
query($owners: [Address!]!, $network: Network, $minCollectionValueUsd: Float, $first: Int, $withOverrides: Boolean) {
  nftUsersCollections(
    owners: $owners
    network: $network
    minCollectionValueUsd: $minCollectionValueUsd
    first: $first
    withOverrides: $withOverrides
  ) {
    edges {
      node {
        id
        name
        symbol
        description
        network
        supply
        holdersCount
        floorPrice {
          valueUsd
          valueWithDenomination
          denomination {
            symbol
          }
        }
        medias {
          banner {
            url
          }
          logo {
            url
          }
        }
        socialLinks {
          name
          url
        }
        nftStandard
        type
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
    "nftUsersCollections": {
      "edges": [
        {
          "node": {
            "id": "TmZ0Q29sbGVjdGlvbi03NTQ5NDA=",
            "name": "Opepen Edition",
            "symbol": "OPEPEN",
            "description": "This artwork may or may not be handmade.",
            "network": "ETHEREUM_MAINNET",
            "supply": "16000",
            "holdersCount": "3725",
            "floorPrice": {
              "valueUsd": 763.589709030906,
              "valueWithDenomination": 0.1998,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "medias": {
              "banner": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0x6339e5e072086621540d0362c4e3cea0d643e114%2Fbanner.svg&checksum=35506"
              },
              "logo": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0x6339e5e072086621540d0362c4e3cea0d643e114%2Flogo.png&checksum=0f7f6"
              }
            },
            "socialLinks": [
              {
                "name": "opensea",
                "url": "https://opensea.io/collection/opepen-edition"
              },
              {
                "name": "website",
                "url": "http://opepen.art"
              },
              {
                "name": "twitter",
                "url": "https://twitter.com/jackbutcher"
              }
            ],
            "nftStandard": "ERC_721",
            "type": "GENERAL"
          }
        },
        {
          "node": {
            "id": "TmZ0Q29sbGVjdGlvbi00MTMxOA==",
            "name": "CryptoPunks",
            "symbol": "PUNK",
            "description": "CryptoPunks launched as a fixed set of 10,000 items in mid-2017 and became one of the inspirations for the ERC-721 standard. They have been featured in places like The New York Times, Christie’s of London, Art|Basel Miami, and The PBS NewsHour.",
            "network": "ETHEREUM_MAINNET",
            "supply": "10000",
            "holdersCount": "3861",
            "floorPrice": {
              "valueUsd": 169113.3364595475,
              "valueWithDenomination": 44.25,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "medias": {
              "banner": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb%2Fbanner.png&checksum=0fade"
              },
              "logo": {
                "url": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fcollections%2Fethereum%2F0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb%2Flogo.png&checksum=cf0e4"
              }
            },
            "socialLinks": [
              {
                "name": "opensea",
                "url": "https://opensea.io/collection/cryptopunks"
              },
              {
                "name": "website",
                "url": "https://cryptopunks.app/"
              },
              {
                "name": "discord",
                "url": "https://discord.gg/tQp4pSE"
              },
              {
                "name": "twitter",
                "url": "https://twitter.com/cryptopunksnfts"
              }
            ],
            "nftStandard": "ERC_721",
            "type": "GENERAL"
          }
        },
    }
  }
}
```

<SandboxButton/>

---

### Arguments

| Argument | Description | Type | Required |
| -------- | ----------- | ---- | -------- |
| `owners` | Array of addresses to query collections for | `[Address!]!` | Yes |
| `network` | Filter collections by specific network | `Network` | No |
| `minCollectionValueUsd` | Minimum USD value threshold for collections | `Float` | No |
| `search` | Search string to filter collections | `String` | No |
| `collectionIds` | Array of specific collection IDs to include | `[ID!]` | No |
| `standard` | Filter by NFT standard (ERC721/ERC1155) | `NftStandard` | No |
| `onlyHidden` | Show only hidden collections | `Boolean` | No |
| `first` | Number of collections to return (default: 24) | `Int` | No |
| `after` | Cursor for pagination | `String` | No |
| `withOverrides` | Include value overrides | `Boolean` | No |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `edges` | Array of collection edges | `[NftUserCollectionEdge!]!` |
| `pageInfo` | Pagination information | `PageInfo!` |
| `node` | Collection information | `NftCollection!` |
| `cursor` | Pagination cursor | `String!` |

### Related Types

- `NftCollection`: Detailed collection information
- `NftValueDenomination`: Price information in USD and native currency
- `NftCollectionMedias`: Collection media assets
- `SocialLink`: Social media links
- `PageInfo`: Pagination metadata

### Notes
- Supports pagination for handling large collections
- Can filter by network, value, and NFT standard
- Returns comprehensive collection metadata including floor prices and media
- Includes social links and collection statistics