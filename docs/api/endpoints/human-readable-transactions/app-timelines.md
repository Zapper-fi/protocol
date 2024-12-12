---
sidebar_position: 3
sidebar_label: App Timelines
---

import { SandboxButton } from '@site/src/components/SandboxButton';
import Link from '@docusaurus/Link';

# App Timelines

Displays a timeline of transactions that happened in a particular onchain app via their smart contracts.

### `timelineForApp`

Takes a `slug` parameter and optional `network` filters. Returns timeline of events for a specific application including:

- App-specific transactions
- Human-readable descriptions
- Display items such as tokens, NFTs, accounts, and more.
- Actor details

:::tip
To find the correct `slug` for the app you are trying to reference, find the app on Zapper. The slug is the last part of the URL. For example: https://zapper.xyz/apps/cat-town, has the slug `cat-town`.
:::

### Example Use Case: App Activity Feed

Let's say you want to show a feed of all activities happening in the app Cat Town. Start by passing the app's `slug`. Then return details about each transaction including the `timestamp`, `eventType`, `processedDescription` and `description`. Use the `first` argument to specify how many events to load at once, and the `after` cursor for pagination to load more events.

When returning `description`, the `descriptionDisplayItems` such as `TokenDisplayItem` will be used to surface onchain items embedded within the human-readable description.

#### Example Variable

```js
{
  "slug": "aave-v2",
  "first": 10,
  "spamFilter": true,
}
```

#### Example Query

```graphql
query ($slug: String!, $first: Int, $after: String, $spamFilter: Boolean) {
  timelineForApp(slug: $slug, first: $first, after: $after, spamFilter: $spamFilter) {
    edges {
      node {
        key
        timestamp
        network
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
        perspectiveDelta {
          account {
            address
            displayName {
              value
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
Pagination is highly recommended using `first` and `after` to ensure fast query response times.
:::

#### Example Response

```js
{
  "data": {
    "timelineForApp": {
      "edges": [
        {
          "node": {
            "key": "0x445369dac3aeefae7aa42f1347b89239e118c2373dbc01a40cc398cf53eca154:0x3c1d52c5240ec764cf818b4d7228d2da36ad9986",
            "timestamp": 1733520575000,
            "network": "ETHEREUM_MAINNET",
            "source": "TRANSACTION",
            "transaction": {
              "hash": "0x445369dac3aeefae7aa42f1347b89239e118c2373dbc01a40cc398cf53eca154",
              "from": "0x3c1d52c5240ec764cf818b4d7228d2da36ad9986",
              "to": "0xd784927ff2f95ba542bfc824c8a8a98f3495f6b5",
              "value": "0"
            },
            "perspective": {
              "type": "ACCOUNT",
              "value": "0x3c1d52c5240ec764cf818b4d7228d2da36ad9986"
            },
            "interpretation": {
              "description": "Claimed $1 ",
              "processedDescription": "Claimed 0.8577 STKAAVE ",
              "descriptionDisplayItems": [
                {
                  "type": "token",
                  "tokenAddress": "0x4da27a545c0c5b758a6ba100e3a049001de870f5",
                  "amountRaw": "857721002521299917"
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
                            "amount": 0.8577210025212999,
                            "amountRaw": "857721002521299917",
                            "address": "0x4da27a545c0c5b758a6ba100e3a049001de870f5"
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            },
            "perspectiveDelta": {
              "account": {
                "address": "0x3c1d52c5240ec764cf818b4d7228d2da36ad9986",
                "displayName": {
                  "value": "cl0kwork.eth"
                }
              }
            }
          }
        },
        {
          "node": {
            "key": "0x0f1bbabb206a17b85005549583368fc27522365627a0d73f6b8dd7bdc40d5d90:0x1077d17c39d9c6a8131b54e735817f3c3a487f4d",
            "timestamp": 1733520436000,
            "network": "POLYGON_MAINNET",
            "source": "TRANSACTION",
            "transaction": {
              "hash": "0x0f1bbabb206a17b85005549583368fc27522365627a0d73f6b8dd7bdc40d5d90",
              "from": "0x1077d17c39d9c6a8131b54e735817f3c3a487f4d",
              "to": "0x8df3aad3a84da6b69a4da8aec3ea40d9091b2ac4",
              "value": "0"
            },
            "perspective": {
              "type": "ACCOUNT",
              "value": "0x1077d17c39d9c6a8131b54e735817f3c3a487f4d"
            },
            "interpretation": {
              "description": "Approved $1",
              "processedDescription": "Approved AMWMATIC",
              "descriptionDisplayItems": [
                {}
              ]
            },
            "accountDeltasV2": {
              "edges": []
            },
            "perspectiveDelta": null
          }
        },
      ],
      "pageInfo": {
        "hasNextPage": true,
        "endCursor": "MjAyNC0xMi0wNlQyMTowNTozOS4wMDBafHwweGI0ZmRkMDY0YWM3OGFkODIzYTE5MGFiNDBmOWU1NmY4ZDU5YTA5OTA4YWFmZjFhZTEyZmZjMGJkM2VhNTQxNGQ="
      }
    }
  }
}
```

<SandboxButton/>

---

:::tip
If you want to surface tokens, NFTs, accounts, or other onchain items embedded within the human-readable description of a transaction, you should return `description` and `descriptionDisplayItems` instead of `processedDescription`. This can be useful for adding links to tokens, NFTs, or accounts (e.g., [vitalik.eth](https://zapper.xyz/account/0xd8da6bf26964af9d7eed9e03e53415d37aa96045) swapped [10 USDC](https://zapper.xyz/token/base/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913/USDC/details)...). To learn more about how to use these check out the example for [Single Transactions](/docs/api/endpoints/human-readable-transactions/timeline-event).
:::

---

### Arguments

| Argument                 | Description                                  | Type             |
| ------------------------ | -------------------------------------------- | ---------------- |
| `network`                | A network to retreive.                       | `Network`        |
| `networks`               | The networks to retreive, input as an array. | `Network!`       |
| `realtimeInterpretation` | Human-readable transactions, default is on.  | `Boolean = true` |
| `spamFilter`             | Filter for spam, default is on.              | `Boolean = true` |
| `first`                  | Used for pagination.                         | `Int!`           |
| `after`                  | Used for pagination.                         | `String!`        |

### Fields

| Field                     | Description                                                                                                                                                      | Type                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `key`                     | A transaction hash.                                                                                                                                              | `String!`                        |
| `network`                 | Network on which the transaction happened.                                                                                                                       | `Network!`                       |
| `interpretation`          | Contains fields needed to present a human-readable transaction such as `description`, `processedDescription`, and `descriptionDisplayItems`.                     | `Network!`                       |
| `description`             | The human-readble description of the transaction with variables referencing types such as tokens, NFTs, or accounts.                                             | `String!`                        |
| `processedDescription`    | The human-readble description of the transaction.                                                                                                                | `String!`                        |
| `descriptionDisplayItems` | Contains the fields which the variables in `description` make reference to.                                                                                      | `ActivityFeedDisplayItem!!`      |
| `transaction`             | Contains onchain information like `nounce` , `hash`, `blockNumber`, `gasPrice` and more.                                                                         | `OnChainTransaction!`            |
| `app`                     | The app that is associated with the transaction.                                                                                                                 | `Int!`                           |
| `displayName`             | Returns the display name of an address (ENS, Farcaster, Lens, etc.).                                                                                             | `Int!`                           |
| `timestamp`               | Represents date and time as number of milliseconds from start of UNIX epoch.                                                                                     | `Timestamp!`                     |
| `perspective`             | The address whose perspective is used in deltas.                                                                                                                 | `ActivityPerspective!`           |
| `perspectiveDelta`        | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`. Also contains the `Account` type for the transaction's actor.                      | `ActivityAccountDelta!`          |
| `accountDeltasV2`         | Object containing different deltas such as `tokenDetlasV2` and `nftDeltasV2`.                                                                                    | `ActivityAccountDelta!`          |
| `tokenDeltasV2`           | Returns info on the tokens transfered in the transaction such as `address`, `amount`, as well as the `token` object with more token specific info.               | `FungibleTokenDeltaConnection!!` |
| `nftDeltasV2`             | Returns info on the NFTs transfered in the transaction such as `collectionAddress`, `tokenId`, as well as `attachment` which surfaces other NFT specific fields. | `NftDeltaConnection!`            |
| `interpreterId`           | Unique identifier for the Interpreter.                                                                                                                           | `String!`                        |
| `interpreter`             | Object which contains info on the interpreter such as `app` and `category`.                                                                                      | `ActivityEventInterpreter!`      |
| `sigHash`                 | Returns the sigHash for the transaction.                                                                                                                         | `String!`                        |
