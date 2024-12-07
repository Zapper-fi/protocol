---
sidebar_position: 2
sidebar_label: Single NFT Details
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Single NFT Details

Surfaces details about a single NFT with its metadata including the collection it belongs to, token ID, traits, name, description, media (images/animations/audio), holders, transfers, and estimated value information.


### `nftToken`
Takes `collectionAddress`, `network`, and `tokenId` as input. Returns detailed data about a specific NFT including:
* Token metadata
* Current ownership
* Transfer history
* Traits and rarity
* Media assets

### Example Use Case: NFT Display

Let's say you want to display a specific NFT. Start by passing the `collectionAddress`, `network`, and `tokenId` to identify the NFT. Then return information about the token including its `name`, `description`, current `estimatedValue`, and media assets from `mediasV3`. You can also get trait information and current sale data.

#### Example Variables

```js
{
  "collectionAddress": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb",
  "network": "ETHEREUM_MAINNET",
  "tokenId": "7495"
}
```

#### Example Query

```graphql
query($collectionAddress: String!, $network: Network!, $tokenId: String!) {
  nftToken(
    collectionAddress: $collectionAddress
    network: $network
    tokenId: $tokenId
  ) {
    id
    name
    description
    collection {
      name
      symbol
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
    traits {
      attributeName
      attributeValue
      supply
      supplyPercentage
    }
    estimatedValue {
      valueUsd
      valueWithDenomination
      denomination {
        symbol
      }
    }
    lastSale {
      valueUsd
      valueWithDenomination
      denomination {
        symbol
      }
    }
  }
}
```

#### Example Response

```js
{
  "data": {
    "nftToken": {
      "id": "TmZ0VG9rZW5FcmM3MjEtNzE5MTU1NDg=",
      "name": "CryptoPunk #7495",
      "description": null,
      "collection": {
        "name": "CryptoPunks",
        "symbol": "PUNK",
        "address": "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"
      },
      "mediasV3": {
        "images": {
          "edges": [
            {
              "node": {
                "original": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F00f8b24c79685e376e42fa775bfeab0eb3fc55e09e77be0ee31c43193e81c71e.png&checksum=e9d0c",
                "thumbnail": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F00f8b24c79685e376e42fa775bfeab0eb3fc55e09e77be0ee31c43193e81c71e.png&width=100&checksum=173cf"
              }
            }
          ]
        }
      },
      "traits": [
        {
          "attributeName": "accessory",
          "attributeValue": "Straight Hair",
          "supply": "151",
          "supplyPercentage": 1.51
        },
        {
          "attributeName": "type",
          "attributeValue": "Female",
          "supply": "3839",
          "supplyPercentage": 38.39
        },
        {
          "attributeName": "accessory",
          "attributeValue": "Purple Lipstick",
          "supply": "655",
          "supplyPercentage": 6.55
        },
        {
          "attributeName": "accessory",
          "attributeValue": "Cigarette",
          "supply": "961",
          "supplyPercentage": 9.61
        }
      ],
      "estimatedValue": {
        "valueUsd": 209038.47669524065,
        "valueWithDenomination": 54.0358055895261,
        "denomination": {
          "symbol": "ETH"
        }
      },
      "lastSale": {
        "valueUsd": 228242.5512207,
        "valueWithDenomination": 59,
        "denomination": {
          "symbol": "ETH"
        }
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
| `collectionAddress` | The contract address of the NFT collection | `String!` | Yes |
| `network` | The blockchain network where the NFT exists | `Network!` | Yes |
| `tokenId` | The unique identifier of the NFT within its collection | `String!` | Yes |

### Fields

| Field | Description | Type |
| ----- | ----------- | ---- |
| `id` | Unique identifier for the NFT | `ID!` |
| `tokenId` | Token ID within the collection | `String!` |
| `name` | Name of the NFT | `String!` |
| `description` | Description of the NFT | `String` |
| `supply` | Total supply of this token | `BigDecimal!` |
| `circulatingSupply` | Number of tokens in circulation | `BigDecimal!` |
| `holdersCount` | Number of unique holders (ERC-1155) | `BigDecimal!` |
| `socialLinks` | Social media links | `[SocialLink!]!` |
| `collection` | Parent collection information | `NftCollection!` |
| `traits` | Token traits/attributes | `[NftTrait!]!` |
| `mediasV2` | Media assets (legacy format) | `[NftMediaV2!]!` |
| `mediasV3` | Media assets (current format) | `NftMedias!` |
| `transfers` | Transfer history | `NftTransferConnection` |
| `holders` | Current token holders | `NftHolderConnection!` |
| `holdersFollowedByAddress` | Holders followed by given address | `[NftHolder!]!` |
| `isHidden` | Whether token is hidden by owner | `Boolean!` |
| `estimatedValue` | Current estimated value | `NftValueDenomination` |
| `lastSale` | Most recent sale details | `NftValueDenomination` |
| `rarityRank` | Token rarity ranking (deprecated) | `Int` |
| `lastSaleEth` | Last sale price in ETH (deprecated) | `BigDecimal` |
| `estimatedValueEth` | Estimated value in ETH (deprecated) | `BigDecimal` |



### Enums
```graphql
enum NftTransferSort {
  TIMESTAMP
}

enum OrderDirectionOption {
  DESC
  ASC
}
```

### Notes
- Returns comprehensive NFT metadata
- Includes current value estimates and last sale data
- Provides access to high-quality media assets
- Shows detailed trait information
- Includes ownership and transfer history
- Supports both ERC721 and ERC1155 standards