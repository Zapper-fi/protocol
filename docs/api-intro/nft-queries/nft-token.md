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

### Example Use Case: NFT Details

When you need to display detailed information about a specific NFT, such as in a marketplace listing or NFT portfolio view, you can use this query to fetch all relevant token data.

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
    tokenId
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
            mimeType
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
    lastSale {
      valueUsd
      valueWithDenomination
      denomination {
        symbol
      }
    }
    estimatedValue {
      valueUsd
      valueWithDenomination
      denomination {
        symbol
      }
    }
    holdersCount
  }
}
```

#### Example Response

```js
{
  "data": {
    "nftToken": {
      "id": "TmZ0VG9rZW5FcmM3MjEtNzE5MTU1NDg=",
      "tokenId": "7495",
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
                "thumbnail": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F00f8b24c79685e376e42fa775bfeab0eb3fc55e09e77be0ee31c43193e81c71e.png&width=100&checksum=173cf",
                "mimeType": "image/png"
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
      "lastSale": {
        "valueUsd": 226752.97873754,
        "valueWithDenomination": 59,
        "denomination": {
          "symbol": "ETH"
        }
      },
      "estimatedValue": {
        "valueUsd": 207674.23518487555,
        "valueWithDenomination": 54.0358055895261,
        "denomination": {
          "symbol": "ETH"
        }
      },
      "holdersCount": "1"
    }
  }
}
```


<SandboxButton/>

---

### Arguments

| Argument | Description | Type |
| -------- | ----------- | ---- |
| `collectionAddress` | The contract address of the NFT collection | `String!` |
| `network` | The blockchain network where the NFT exists | `Network!` |
| `tokenId` | The unique identifier of the NFT within its collection | `String!` |

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
| `holdersCount` | Number of current holders (relevant for ERC-1155) | `BigDecimal!` |
| `supply` | Total supply of this token | `BigDecimal!` |
| `circulatingSupply` | Number of tokens in circulation | `BigDecimal!` |
| `transfers` | History of token transfers | `NftTransferConnection` |
| `holders` | Current token holders | `NftHolderConnection!` |
| `socialLinks` | Associated social media links | `[SocialLink!]!` |
| `isHidden` | Whether the token is hidden by owner | `Boolean!` |
