---
sidebar_position: 1
---

# Introduction

## Indexing Templates

Indexing templates are a defining primitive for the protocol. They perform two very important functions:

- They standardize the semantic information for an onchain entity
- They instruct indexers on how onchain information should be indexed, transformed and stored.

Indexing templates are built by interpreters. At their core they are very simple JSON files that can be read as a set of instructions for an indexer. And there are many ways to build and allow the creation of these templates, and they don't require any knowledge of coding.

## Event Interpretation

Event Interpreters are used on onchain transactions to translate them into human-readable output, and augment them with contextual, and often off-chain, information.

You can read more about Event Interpreters [here](/interpretation/event-interpretation/overview).

## App Token Interpretation

App Token Interpreters are used to index app-centric token balances for users. This can be USDC lent on Aave (aUSDC), or a liquidity position for USDC/ETH you hold on Uniswap V2. The large majority of these tokens do not have a market price; rather, they have a redeemable price to unlock an underlying token. To surface these to users, we first need to interpret the contract interface that manages these positions.

You can read more about App Token Interpreters [here](/interpretation/app-token-interpretation/overview).

## Contract Position Interpretation

Like App Token Interpreters, Contract Position Interpreters are used to index redeemable onchain positions onchain. The key difference is in that these positions are not tokenized, and are a bit more arbitrary in nature. Contract Position Interpreters index and standardize arbitrary positions for apps.

You can read more about Contract Position Interpreters [here](/interpretation/contract-position-interpretation/overview).

## Future

One of the main benefits of working with indexing templates, is that rather than having flexibility at the base layer, e.g. a sandbox, flexibility is maintained with the creation of new indexing templates. Anyone can create a new template, and as long as an indexer can read the instructions, it can be directly ingested by the protocol via a soft social consensus - in similar way that ERC20 is an offchain consensus as to how tokens should be built and structured.

We currently are working on the following templates:

- Price Interpreters: Index prices for any AMM
- NFT Marketplace Interpreters: Index sales for any NFT marketplace

## Example

Here's an example of what a functionin **App Token Interpreter** indexing template that surfaces user balances for all Uniswap V2 pools on Ethereum Mainnet.

```json
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
