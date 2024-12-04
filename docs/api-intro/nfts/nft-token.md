---
sidebar_position: 2
sidebar_label: Single NFT
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

### Single NFT

Query detailed information about a specific NFT token, including its metadata, traits, and ownership information.

---

### `nftToken`

The `nftToken` query takes a collection address, network, and token ID to return comprehensive information about a specific NFT token. This includes its metadata, traits, current ownership, and transfer history.

### Example Use Case: NFT Details

When you need to display detailed information about a specific NFT, such as in a marketplace listing or NFT portfolio view, you can use this query to fetch all relevant token data.

#### Example Variables

```js
{
  "collectionAddress": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
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
      "id": "TmZ0VG9rZW5FcmM3MjEtNTA4NTgxMjQ=",
      "tokenId": "7495",
      "name": "#7495",
      "description": null,
      "collection": {
        "name": "Bored Ape Yacht Club",
        "symbol": "BAYC",
        "address": "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
      },
      "mediasV3": {
        "images": {
          "edges": [
            {
              "node": {
                "original": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F922278b209372a19f7382e0691e36e2250bc39d757ddd867a9b2a93fdf299021.png&checksum=46182",
                "thumbnail": "https://zapper.xyz/z/images/?url=https%3A%2F%2Fstorage.googleapis.com%2Fzapper-fi-assets%2Fnfts%2Fmedias%2F922278b209372a19f7382e0691e36e2250bc39d757ddd867a9b2a93fdf299021.png&width=100&checksum=d86bb",
                "mimeType": "image/png"
              }
            }
          ]
        }
      },
      "traits": [
        {
          "attributeName": "Eyes",
          "attributeValue": "Cyborg",
          "supply": "1326",
          "supplyPercentage": 13.26
        },
        {
          "attributeName": "Background",
          "attributeValue": "Aquamarine",
          "supply": "15033",
          "supplyPercentage": 150.33
        },
        {
          "attributeName": "Earring",
          "attributeValue": "Cross",
          "supply": "1873",
          "supplyPercentage": 18.73
        },
        {
          "attributeName": "Hat",
          "attributeValue": "Irish Boho",
          "supply": "2576",
          "supplyPercentage": 25.76
        },
        {
          "attributeName": "Fur",
          "attributeValue": "Dmt",
          "supply": "2630",
          "supplyPercentage": 26.3
        },
        {
          "attributeName": "Clothes",
          "attributeValue": "Wool Turtleneck",
          "supply": "2836",
          "supplyPercentage": 28.36
        },
        {
          "attributeName": "Mouth",
          "attributeValue": "Bored Dagger",
          "supply": "575",
          "supplyPercentage": 5.75
        }
      ],
      "lastSale": null,
      "estimatedValue": {
        "valueUsd": 90762.75401011268,
        "valueWithDenomination": 23.793928378234963,
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
