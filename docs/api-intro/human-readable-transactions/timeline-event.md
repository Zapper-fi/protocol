---
sidebar_position: 2
sidebar_label: Timeline Events
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# Timeline Events


Presents the details of an onchain transactions with a simple descriptive summary, dynamic elements such as apps, tokens, NFTs, and accounts, as well as other transaction details.

---

### `timelineEvent`

The `timelineEvent` query takes `transactionHash` and `network`. It returns a descriptive and human-readable summary of the transaction along with `descriptionDisplayItems` such as tokens, NFTs, or accounts involved.  transferred (`accountDetlasV2`), `app`, `gasUsed`, `sigHash`, and many other transaction details.


### Example Use Case: Transaction Details

Let's say you want to surface details about an onchain transaction in a human-readable format with network, app information, and the tokens or accounts interacted with. Start by passing `transactionHash` and `network`. Then return `description`. The description will contain a human-readble format with variable references to the `descriptionDisplayItems` object. This will allow us to surface dynamic onchain elements such as tokens, NFTs, or accounts that might be involved in the transaction. To do this, we will add a catch for `TokenDisplayItem`, `NFTDisplayItem`, `NFTCollectionDisplayItem`, and `ActorDisplayItem` in the case that these types appear in the transaction. This can be useful if you want to link out to a token page, or account page for example.

#### Example Variable

```js
{
  "transactionHash": "0x804bae8da222170bb398ed8f7a32fa9f48ed3410bf2d8fa63b06db21f6f62d15",
  "network": "BASE_MAINNET"
}
```

#### Example Query

```graphql
query($transactionHash: String!, $network: Network!) {
  timelineEvent(transactionHash: $transactionHash, network: $network) {
    interpretation {
      description
      descriptionDisplayItems {
        ... on TokenDisplayItem {
          type
          network
          tokenAddress
          amountRaw
          id
          tokenV2 {
            symbol
          }
        }
        ... on NFTDisplayItem {
          type
          network
          collectionAddress
          tokenId
          quantity
          nftToken {
            tokenId
          }
          isMint
          isBurn
        }
        ... on NFTCollectionDisplayItem {
          type
          network
          collectionAddress
          quantity

        }
        ... on ActorDisplayItem {
          type
          address
          account {
            displayName {
              source
              value
            }
          }
        }
      }
    }
    app {
      app {
        displayName
        imgUrl
      }
    }
  }
}
```

:::tip
It's useful to include all types of `descriptionDisplayItems` to account for any possible types that could appear in the transaction. This also includes `AppDisplayItem`, `AppContractNetworkDisplayItem`, `NetworkDisplayItem`, `NumberDisplayItem`, `StringDisplayItem`, `TokenContractDisplayItem`, `TransactionDisplayItem`, `ProposalDisplayItemObject`, `ImageDisplayItem`, `CompositeDisplayItem`, and `ChatChannelDisplayItem`
:::

#### Example Response

```js
{
  "data": {
    "timelineEvent": {
      "interpretation": {
        "description": "Swapped $1 for $2 and sent to $3",
        "descriptionDisplayItems": [
          {
            "type": "token",
            "network": "BASE_MAINNET",
            "tokenAddress": "0xac1bd2486aaf3b5c0fc3fd868558b082a531b2b4",
            "amountRaw": "17713611200960235617207",
            "id": "VG9rZW5EaXNwbGF5SXRlbU9iamVjdC1iYXNlOjB4YWMxYmQyNDg2YWFmM2I1YzBmYzNmZDg2ODU1OGIwODJhNTMxYjJiNDoxNzcxMzYxMTIwMDk2MDIzNTYxNzIwNw==",
            "tokenV2": {
              "symbol": "TOSHI"
            }
          },
          {
            "type": "token",
            "network": "BASE_MAINNET",
            "tokenAddress": "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
            "amountRaw": "4950000",
            "id": "VG9rZW5EaXNwbGF5SXRlbU9iamVjdC1iYXNlOjB4ODMzNTg5ZmNkNmVkYjZlMDhmNGM3YzMyZDRmNzFiNTRiZGEwMjkxMzo0OTUwMDAw",
            "tokenV2": {
              "symbol": "USDC"
            }
          },
          {
            "type": "actor",
            "address": "0x9b3a20176d2c5d0a22dae382496416a1a8934b30",
            "account": {
              "displayName": {
                "source": "ADDRESS",
                "value": "0x9b3a...4b30"
              }
            }
          }
        ]
      },
      "app": {
        "app": {
          "displayName": "Coinbase Commerce",
          "imgUrl": "https://storage.googleapis.com/zapper-fi-assets/apps%2Fcoinbase-commerce.png"
        }
      }
    }
  }
}
```


<SandboxButton/>

---

:::note
In this example, the variable references in `description` $1 and $2 make reference to the `type: "token"` display items. $3 makes reference to the `type: "actor"` item which in this example is the address that received the token transfer.
:::

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | The network(s) to retreive, input as an array.    | `Network!`        | 
| `realtimeInterpretation`      | Human-readable transactions, default is on.       | `Boolean = true`        | 
| `addresses`      | The address(s) that is being queried, input as an array.   | `Address!`        | 
| `tokenAddresses`      | Filter by token address.        | `Address!`        | 
| `isSigner`      | Filter by signer.        | `Boolean`        | 
| `spamFilter`      | Filter for spam, default is on.      | `Boolean = true`        | 
| `first`      | Used for pagination.      | `Int!`        | 
| `after`      | Used for pagination.       | `String!`        | 


### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | A unique identifier.       | `String!`       |
| `network`      | Network on which the transaction happened.     | `Network!`       |
| `processedDescription`      | The human-readble description of the transaction.      | `ActivityInterpretation!`       |
| `transaction`      | Contains onchain information like `nounce` , `hash`, `blockNumber`, `gasPrice` and more.       | `OnChainTransaction!`       |
| `app`      | The app that is associated with the transaction.     | `Int!`       |
| `fromUser`      | The address that the transaction was initiated from.     | `Int!`       |
| `toUser`      | The address that the transaction interacted with.     | `Int!`       |
| `displayName`      | Returns the display name of an address (ENS, Farcaster, Lens, etc.).   | `Int!`       |
| `actors`      | Address(s) that were involved in the transaction. Could include accounts, tokens, NFTs, contracts, etc.      | `ActorDisplayItem!`       |
| `timestamp`      | Represents date and time as number of milliseconds from start of UNIX epoch.       | `Timestamp!`       |
| `perspective`      | The address whose perspective is used in deltas.       | `ActivityPerspective!`       |
| `perspectiveDelta`      | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`.       | `ActivityAccountDelta!`       |
| `tokenDeltasV2`      | Returns info on the tokens transfered in the transaction such as `address`, `amount`, as well as the `token` object with more token specific info.        | `FungibleTokenDeltaConnection!!`       |
| `nftDeltasV2`      | Returns info on the NFTs transfered in the transaction such as `collectionAddress`, `tokenId`, as well as `attachment` which surfaces other NFT specific fields.       | `NftDeltaConnection!`       |
| `interpreterId`      | Unique identifier for the Interpreter.      | `String!`       |
| `interpreter`      | Object which contains info on the interpreter such as `app` and `category`.      | `ActivityEventInterpreter!`       |
| `sigHash`      | Returns the sigHash for the transaction.       | `String!`       |
