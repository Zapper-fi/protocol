---
sidebar_position: 4
sidebar_label: Single NFT Holdings
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Single NFT Holdings

Query individual NFTs owned by specific addresses, with detailed token information and filtering capabilities.


### `nftUsersTokens`
Takes an array of `addresses` as input, with optional parameters for `network`, `standard`, and `minEstimatedValueUsd`. It returns comprehensive NFT holdings data including:
* Individual NFT tokens owned
* Balance and quantity information 
* Collection metadata
* Current valuations
* Ownership history
* Media/trait details

### Example Use Case: User's NFT Gallery

Let's say you want to display all NFTs owned by a user or group of users. Start by passing the `owners` addresses you want to query. Then return details about each NFT including its `collection` information, `mediasV3` for displaying images, and the current `estimatedValue`. You can filter results by `network` or minimum value, and use pagination with `first` and `after` arguments to load results in batches.


#### Example Variables

```js
{
  "owners": ["0x3d280fde2ddb59323c891cf30995e1862510342f" ],
  "network": "ETHEREUM_MAINNET",
  "first": 12
}
```

#### Example Query

```graphql
query($owners: [Address!]!, $network: Network, $first: Int) {
  nftUsersTokens(
    owners: $owners
    network: $network
    first: $first
  ) {
    edges {
      node {
        id
        tokenId
        name
        collection {
          name
          address
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
        estimatedValue {
          valueUsd
          valueWithDenomination
          denomination {
            symbol
          }
        }
        traits {
          attributeName
          attributeValue
        }
      }
      ownedAt
      balances {
        balance
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
            "collection": {
              "name": "CryptoPunks",
              "address": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"
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
            "estimatedValue": {
              "valueUsd": 168069.32980255378,
              "valueWithDenomination": 43.374677,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "traits": [
              {
                "attributeName": "accessory",
                "attributeValue": "Mohawk Dark"
              },
              {
                "attributeName": "accessory",
                "attributeValue": "Regular Shades"
              },
              {
                "attributeName": "type",
                "attributeValue": "Male"
              },
              {
                "attributeName": "accessory",
                "attributeValue": "Cigarette"
              }
            ]
          },
          "ownedAt": null,
          "balances": [
            {
              "balance": "1",
              "account": {
                "address": "0x3d280fde2ddb59323c891cf30995e1862510342f"
              }
            }
          ]
        },
        {
          "node": {
            "id": "TmZ0VG9rZW4tNjc1MjE4ODY=",
            "tokenId": "45",
            "name": "#38 The Toper",
            "collection": {
              "name": "Des Monsters",
              "address": "0xe386be399846782a355a2afb6e4c6bf44351cc25"
            },
            "mediasV3": {
              "images": {
                "edges": [
                  {
                    "node": {
                      "original": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F64e27a4f85d918098a6d7e5a459ddd2bfdc4bf606550264be36c3a0ee7e5f5af.gif&checksum=1670f",
                      "thumbnail": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F64e27a4f85d918098a6d7e5a459ddd2bfdc4bf606550264be36c3a0ee7e5f5af.gif&width=100&checksum=2ff90"
                    }
                  }
                ]
              }
            },
            "estimatedValue": {
              "valueUsd": 17436.717375705,
              "valueWithDenomination": 4.5,
              "denomination": {
                "symbol": "ETH"
              }
            },
            "traits": []
          },
          "ownedAt": null,
          "balances": [
            {
              "balance": "1",
              "account": {
                "address": "0x3d280fde2ddb59323c891cf30995e1862510342f"
              }
            }
          ]
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

#### NftUserTokenConnection
| Field | Description | Type |
| ----- | ----------- | ---- |
| `edges` | Array of NFT edges | `[NftUserTokenEdge!]!` |
| `pageInfo` | Pagination information | `PageInfo!` |

#### NftToken (node)
| Field | Description | Type |
| ----- | ----------- | ---- |
| `id` | Unique identifier | `ID!` |
| `tokenId` | Token ID within collection | `String!` |
| `name` | Token name | `String!` |
| `description` | Token description | `String` |
| `supply` | Total token supply | `BigDecimal!` |
| `circulatingSupply` | Circulating supply | `BigDecimal!` |
| `holdersCount` | Number of token holders | `BigDecimal!` |
| `socialLinks` | Social media links | `[SocialLink!]!` |
| `collection` | Parent collection data | `NftCollection!` |
| `traits` | Token attributes | `[NftTrait!]!` |
| `mediasV2` | Legacy media assets | `[NftMediaV2!]!` |
| `mediasV3` | Current media assets | `NftMedias!` |
| `estimatedValue` | Current value estimate | `NftValueDenomination` |
| `lastSale` | Last sale details | `NftValueDenomination` |
| `rarityRank` | Token rarity ranking (deprecated) | `Int` |
| `lastSaleEth` | Last sale in ETH (deprecated) | `BigDecimal` |
| `estimatedValueEth` | Estimated value in ETH (deprecated) | `BigDecimal` |
| `isHidden` | Hidden status | `Boolean!` |



### Enums
```graphql

enum NftValuationStrategy {
  TOP_OFFER
  ESTIMATED_VALUE
  OVERRIDE
}
```

### Notes
- Supports pagination for handling large NFT collections
- Filter by network, value, and NFT standard
- Returns comprehensive token metadata including estimated values
- Includes ownership information and acquisition dates
- Supports both ERC721 and ERC1155 tokens