---
sidebar_position: 3
sidebar_label: App Timelines
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# App Timelines


Displays a timeline of transactions that happened in a particular onchain app via their smart contracts.

---

### `timelineForApp`

The `timelineForApp` query takes an app name in the form of a `slug`. It returns a `processedDescription` or `description`. If returning `description`, `descriptionDisplayItems` such as `TokenDisplayItem` will be used to surface onchain items embedded within the human-readable description.


:::tip
To find the correct `slug` for the app you are trying to reference, find the app on Zapper. The slug is the last part of the URL. For example: https://zapper.xyz/apps/cat-town, has the slug `cat-town`. 
:::


### Example Use Case: App Activity Feed

Let's say you want to show a feed of all activities happening in the app Cat Town. Start by passing the app's `slug`. Then return details about each activity including the `timestamp`, `eventType`, `processedDescription` and `description`. Use the `first` argument to specify how many events to load at once, and the `after` cursor for pagination to load more events.

When returning `description`, the `descriptionDisplayItems` such as `TokenDisplayItem` will be used to surface onchain items embedded within the human-readable description.



#### Example Variable

```js
{
  "slug": "cat-town",
  "first": 10,
  "spamFilter": true,
}
```

#### Example Query

```graphql
query($slug: String!, $first: Int, $after: String, $spamFilter: Boolean) {
  timelineForApp(
    slug: $slug
    first: $first
    after: $after
    spamFilter: $spamFilter
  ) {
    edges {
      node {
        key
        timestamp
        network
        eventType
        source
        transaction {
          hash
          from
          to
          value
        }
        perspective {
          type
          value
        }
        interpretation {
          description
          processedDescription
          descriptionDisplayItems {
            ... on TokenDisplayItem {
              type
              tokenAddress
              amountRaw
            }
            ... on NFTDisplayItem {
              type
              network
              collectionAddress
              tokenId
            }
          }
        }
        accountDeltasV2(first: 1) {
          edges {
            node {
              tokenDeltasV2 {
                edges {
                  node {
                    amount
                    amountRaw
                    address
                  }
                }
              }
            }
          }
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

:::note
Pagination is highly recommended using the arguments `first` and `after` to ensure fast query response times.
:::

#### Example Response

```js
{
  "data": {
    "timelineForApp": {
      "edges": [
        {
          "node": {
            "key": "0xf8d5e339ea4d3035c3d31b1b5cdc3edc4cb932d5a692ce77e9a3d8d647105a68:0xbe1aee2292848dfc84f1a5886ae30785a1513d0e",
            "timestamp": 1733354963000,
            "network": "BASE_MAINNET",
            "eventType": "b71686fe-7a31-4db1-a185-e35f72b3c5fe",
            "source": "TRANSACTION",
            "transaction": {
              "hash": "0xf8d5e339ea4d3035c3d31b1b5cdc3edc4cb932d5a692ce77e9a3d8d647105a68",
              "from": "0xbe1aee2292848dfc84f1a5886ae30785a1513d0e",
              "to": "0x10a77395a07917c5eb71feeb86696b7612f9730f",
              "value": "0"
            },
            "perspective": {
              "type": "ACCOUNT",
              "value": "0xbe1aee2292848dfc84f1a5886ae30785a1513d0e"
            },
            "interpretation": {
              "description": "Evolved floofs to cats ",
              "processedDescription": "Evolved floofs to cats ",
              "descriptionDisplayItems": []
            },
            "accountDeltasV2": {
              "edges": []
            }
          }
        },
        {
          "node": {
            "key": "0x2de9580f898bb38f064032004e0b31ab51f8d0cf90daba93d1cabb2c341a636b:0x1ad761cf71f0e0236dc8be1b1e850108dc55fec6",
            "timestamp": 1733354719000,
            "network": "BASE_MAINNET",
            "eventType": "e38209e7-bf49-43b0-9719-7e11dd2869fc",
            "source": "TRANSACTION",
            "transaction": {
              "hash": "0x2de9580f898bb38f064032004e0b31ab51f8d0cf90daba93d1cabb2c341a636b",
              "from": "0x1ad761cf71f0e0236dc8be1b1e850108dc55fec6",
              "to": "0x10a77395a07917c5eb71feeb86696b7612f9730f",
              "value": "0"
            },
            "perspective": {
              "type": "ACCOUNT",
              "value": "0x1ad761cf71f0e0236dc8be1b1e850108dc55fec6"
            },
            "interpretation": {
              "description": "Sold floofs for $1",
              "processedDescription": "Sold floofs for 0.002 ETH",
              "descriptionDisplayItems": [
                {
                  "type": "token",
                  "tokenAddress": "0x0000000000000000000000000000000000000000",
                  "amountRaw": "1974629265979054"
                }
              ]
            },
            "accountDeltasV2": {
              "edges": [
                {
                  "node": {
                    "tokenDeltasV2": {
                      "edges": [
                        {
                          "node": {
                            "amount": 0.001974629265979054,
                            "amountRaw": "1974629265979054",
                            "address": "0x0000000000000000000000000000000000000000"
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "MjAyNC0xMi0wNFQyMzoyNToxOS4wMDBafHwweDJkZTk1ODBmODk4YmIzOGYwNjQwMzIwMDRlMGIzMWFiNTFmOGQwY2Y5MGRhYmE5M2QxY2FiYjJjMzQxYTYzNmI="
      }
    }
  }
}
```


<SandboxButton/>

---

:::tip
If you want to surface tokens, NFTs, accounts, or other onchain items embedded within the human-readable description of a transaction, you should return `description` and `descriptionDisplayItems` instead of `processedDescription`. This can be useful for adding links to tokens, NFTs, or accounts (e.g., [vitalik.eth](https://zapper.xyz/account/0xd8da6bf26964af9d7eed9e03e53415d37aa96045) swapped [10 USDC](https://zapper.xyz/token/base/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913/USDC/details)...). To learn more about how to use these check out the example for [Single Transactions](/docs/api-intro/human-readable-transactions/timeline-event).
:::

---

### Arguments

| Argument      | Description | Type |
| ----------- | ----------- | ----------- |
| `network`      | A network to retreive.    | `Network`        | 
| `networks`      | The networks to retreive, input as an array.    | `Network!`        | 
| `realtimeInterpretation`      | Human-readable transactions, default is on.       | `Boolean = true`        | 
| `spamFilter`      | Filter for spam, default is on.      | `Boolean = true`        | 
| `first`      | Used for pagination.      | `Int!`        | 
| `after`      | Used for pagination.       | `String!`        | 


### Fields

| Field      | Description | Type |
| ----------- | ----------- | ----------- |
| `key`      | A transaction hash.     | `String!`       |
| `network`      | Network on which the transaction happened.     | `Network!`       |
| `interpretation`      | Contains fields needed to present a human-readable transaction such as `description`, `processedDescription`, and `descriptionDisplayItems`.     | `Network!`       |
| `description`      | The human-readble description of the transaction with variables referencing types such as tokens, NFTs, or accounts.      | `String!`       |
| `processedDescription`      | The human-readble description of the transaction.      | `String!`       |
| `descriptionDisplayItems`      | Contains the fields which the variables in `description` make reference to.      | `ActivityFeedDisplayItem!!`       |
| `transaction`      | Contains onchain information like `nounce` , `hash`, `blockNumber`, `gasPrice` and more.       | `OnChainTransaction!`       |
| `app`      | The app that is associated with the transaction.     | `Int!`       |
| `actors`      | The address(s) involved in the transaction, includes the object `account` that can surface data such as `address`, `displayName`,and `avatar`.    | `ActorDisplayItem!`      |
| `displayName`      | Returns the display name of an address (ENS, Farcaster, Lens, etc.).   | `Int!`       |
| `timestamp`      | Represents date and time as number of milliseconds from start of UNIX epoch.       | `Timestamp!`       |
| `perspective`      | The address whose perspective is used in deltas.       | `ActivityPerspective!`       |
| `perspectiveDelta`      | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`.       | `ActivityAccountDelta!`       |
| `accountDeltasV2`      | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`.       | `ActivityAccountDelta!`       |
| `tokenDeltasV2`      | Returns info on the tokens transfered in the transaction such as `address`, `amount`, as well as the `token` object with more token specific info.        | `FungibleTokenDeltaConnection!!`       |
| `nftDeltasV2`      | Returns info on the NFTs transfered in the transaction such as `collectionAddress`, `tokenId`, as well as `attachment` which surfaces other NFT specific fields.       | `NftDeltaConnection!`       |
| `interpreterId`      | Unique identifier for the Interpreter.      | `String!`       |
| `interpreter`      | Object which contains info on the interpreter such as `app` and `category`.      | `ActivityEventInterpreter!`       |
| `sigHash`      | Returns the sigHash for the transaction.       | `String!`       |
