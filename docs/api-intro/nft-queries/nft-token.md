---
sidebar_position: 2
sidebar_label: Single NFTs
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Single NFTs

Query detailed information about a specific NFT token (ERC721 or ERC1155), including its metadata, traits, and ownership information.

---

### `nftToken`

The `nftToken` query takes a collection address, network, and token ID to return comprehensive information about a specific NFT token. This includes its metadata, traits, current ownership, and transfer history.

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

```
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
| `collection` | Information about the parent collection | `NftCollection!` |
| `mediasV3` | Media assets associated with the NFT | `NftMedias!` |
| `traits` | Array of NFT traits/attributes | `[NftTrait!]!` |
| `lastSale` | Details of the most recent sale | `NftValueDenomination` |
| `estimatedValue` | Current estimated value | `NftValueDenomination` |
| `supply` | Total supply of this token | `BigDecimal!` |
| `circulatingSupply` | Number of tokens in circulation | `BigDecimal!` |
| `holders` | Current token holders | `NftHolderConnection!` |
| `transfers` | History of token transfers | `NftTransferConnection` |
| `isHidden` | Whether the token is hidden by owner | `Boolean!` |

### Notes
- Returns comprehensive NFT metadata
- Includes current value estimates and last sale data
- Provides access to high-quality media assets
- Shows detailed trait information
- Includes ownership and transfer history