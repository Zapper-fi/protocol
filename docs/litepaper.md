---
sidebar_position: 1
---

# Litepaper

## Introduction
Blockchains contain rich economic and social information, yet they remain disorganized and unreadable. Zap Protocol is an open protocol that incentives the interpretation and distribution of human-readable onchain information.

Just as all networks, Blockchains are seeing similar patterns in regards to how value accrual changes over time. At first there aren’t that many applications, and so it's the applications themselves that atomically drive value. Google is only as valuable as the quantity and variety of things one can find and do on the web. Similarly for blockchains, the compounding of new onchain use cases and the ever growing app creates a new for readability and aggregation.

## Mission
At its core blockchains are a technology made to set us free, connect us via the things we value, and unlock new economic opportunities. And to achieve that vision, we need to make blockchains readable to everyone.

## Protocol Overview
### Zapper vs. Zap Protocol
Zapper and Zap Protocol are two distinct entities, the former being a client of the protocol, and the latter the initial interpretation layer built by Zapper. We've decided to decentralize and open up our interpretation stack for a few reasons:
- There doesn't exist a single centralized entity that will be able to organize all the onchain information when we have 1M dapps, 10M dapps, without building an open and incentivized protocol.
- Readable onchain information should be open, commoditized and ubiquitous

### Indexing Templates
Indexing templates are a defining primitive for the protocol. They perform two very important functions:
- They standardize the semantic information for an onchain entity
- They instruct indexers on how onchain information should be indexed, transformed and stored.

Indexing templates are built by interpreters. At their core they are very simple JSON files that can be read as a set of instructions for an indexer. And there are many ways to build and allow the creation of these templates, and they don't require any knowledge of coding.

Here's an example of what a functioning <b>App Token Interpreter</b> indexing template that surfaces user balances for all Uniswap V2 pools on Ethereum Mainnet.

```
{
    "appId": "QXBwLTY",
    "decimals": {
      "expression": "val1",
      "type": "EXPRESSION",
      "interpolations": [
        {
          "signature": "function decimals() view returns (uint8)",
          "type": "METHOD_CALL",
          "args": [],
          "target": {
            "type": "REFERENCE",
            "reference": "address"
          }
        }
      ]
    },
    "addressFactory": {
      "type": "FROM_LOG",
      "resolvers": [
        {
          "address": {
            "type": "STRING",
            "value": "0x5c69bee701ef814a2b6a3edd4b1652cb9cc5aa6f"
          },
          "signature": "event PairCreated(address indexed token0, address indexed token1, address pair, uint256 untitled3)",
          "startBlock": 0,
          "resolveData": [],
          "resolveAddress": {
            "type": "REFERENCE",
            "reference": "log.args.pair"
          }
        }
      ]
    },
    "pricePerShare": {
      "type": "AGGREGATE",
      "rules": [
        {
          "expression": "(val1 / (10 ^ val2)) / (val3 / (10 ^ val4)) + 1",
          "type": "EXPRESSION",
          "interpolations": [
            {
              "type": "SEQUENCE",
              "steps": [
                {
                  "signature": "function getReserves() view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)",
                  "type": "METHOD_CALL",
                  "args": [],
                  "target": {
                    "type": "REFERENCE",
                    "reference": "address"
                  }
                },
                {
                  "type": "REFERENCE",
                  "reference": "step1[0]"
                }
              ]
            },
            {
              "signature": "function decimals() view returns (uint8)",
              "type": "METHOD_CALL",
              "args": [],
              "target": {
                "type": "REFERENCE",
                "reference": "tokens[0].address"
              }
            },
            {
              "signature": "function totalSupply() view returns (uint256)",
              "type": "METHOD_CALL",
              "args": [],
              "target": {
                "type": "REFERENCE",
                "reference": "address"
              }
            },
            {
              "signature": "function decimals() view returns (uint8)",
              "type": "METHOD_CALL",
              "args": [],
              "target": {
                "type": "REFERENCE",
                "reference": "address"
              }
            }
          ]
        },
        {
          "expression": "(val1 / (10 ^ val2)) / (val3 / (10 ^ val4))",
          "type": "EXPRESSION",
          "interpolations": [
            {
              "type": "SEQUENCE",
              "steps": [
                {
                  "signature": "function getReserves() view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast)",
                  "type": "METHOD_CALL",
                  "args": [],
                  "target": {
                    "type": "REFERENCE",
                    "reference": "address"
                  }
                },
                {
                  "type": "REFERENCE",
                  "reference": "step1[1]"
                }
              ]
            },
            {
              "signature": "function decimals() view returns (uint8)",
              "type": "METHOD_CALL",
              "args": [],
              "target": {
                "type": "REFERENCE",
                "reference": "tokens[1].address"
              }
            },
            {
              "signature": "function totalSupply() view returns (uint256)",
              "type": "METHOD_CALL",
              "args": [],
              "target": {
                "type": "REFERENCE",
                "reference": "address"
              }
            },
            {
              "signature": "function decimals() view returns (uint8)",
              "type": "METHOD_CALL",
              "args": [],
              "target": {
                "type": "REFERENCE",
                "reference": "address"
              }
            }
          ]
        }
      ]
    },
    "network": "ETHEREUM_MAINNET",
    "tokens": {
      "type": "AGGREGATE",
      "rules": [
        {
          "type": "METHOD_CALL",
          "signature": "function token0() view returns (address)",
          "target": {
            "type": "REFERENCE",
            "reference": "address"
          },
          "args": []
        },
        {
          "type": "METHOD_CALL",
          "signature": "function token1() view returns (address)",
          "target": {
            "type": "REFERENCE",
            "reference": "address"
          },
          "args": []
        }
      ]
    },
    "symbol": {
      "type": "METHOD_CALL",
      "signature": "function symbol() view returns (string)",
      "target": {
        "type": "REFERENCE",
        "reference": "address"
      },
      "args": []
    },
    "supply": {
      "expression": "val1",
      "type": "EXPRESSION",
      "interpolations": [
        {
          "signature": "function totalSupply() view returns (uint256)",
          "type": "METHOD_CALL",
          "args": [],
          "target": {
            "type": "REFERENCE",
            "reference": "address"
          }
        }
      ]
  }
}
```

### Advantages
#### Data Quality
Since every template specify a strict interface and format for returning data. It's much easier to assure consistent quality across the board, as you know exactly what to expect. Current existing solutions are code sandboxes, which makes it very difficult to build good tests, as you don't know what to test. 

For example, an app token interpreter for Aave V3 knows exactly that they need to return a balance for a user at the end, and each step of the way you need to specify strict data types to get there.

That said while the problem of quality can be greatly reduced via automation, we still require a coordination layer at the protocol level to indicate which version of an interpreter is the best.

#### Standardization


#### Composability
Since smart contracts are composable with each-other, we wanted to make sure that information composability can exist at the semantic layer as well. A simple example:

You are a wallet app that wants to display a readable transaction history to your users- some of these enriched transactions may contain information about DeFi assets. If an interpreter for that DeFi asset exists, you are able to extract all the contextual information for that asset


### Templates Types
#### Event Interpreters
Event Interpreters are used on onchain transactions to translate them into human-readable ouptut, and augment them with contextual, and often off-chain, information. You can read more about Event Interpreters here.

#### App Token Interpreters
App Token Interpreters are used to index app-centric token balances for users. This can be USDC lent on Aave (aUSDC), or a liquidity position for USDC/ETH you hold on Uniswap V2. The large majority of these tokens do not have a market price, rather they have a reedemable price to unlock an underyling token. To surface these to users, we first need to interpret the contract interface that manage these positions.

You can read more about App Token Interpreters here.

#### Contract Position Interpreters
Like App Token Interpreters, Contract Position Interpreters are used to index redeemable onchain positions onchain. The key difference is in that these positions are not tokenized, and are a bit more arbitrary in nature. Contract Position Interpreters index and standardize arbitrary positions for apps.

You can read more about Contract Position Interpreters here.

#### Future Interpreters
One of the main benefits of working with indexing templates, is that rather than having flexibility at the base layer, e.g. a sandbox, flexibility is maintained with the creation of new indexing templates. Anyone can create a new template, and as long as an indexer can read the instructions, it can be directly ingested by the protocol via a soft social consensus - in similar way that ERC20 is an offchain consensus as to how tokens should be built and structured.

We currently are working on the following templates:
- Price Interpreters: Index prices for any AMM
- NFT Marketplace Interpreters: Index sales for any NFT marketplace

In the future, many other templates can be created to fit any type of use case:
- Name Registration Services (e.g. ENS)
- Social Feeds
- Badges, Attestations

### Use Cases
#### Social/Identity
#### DeFi
#### Search
#### LLMs
#### Recommendation Engines
#### Accounting

### Stakeholders


