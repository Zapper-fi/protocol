---
sidebar_position: 1
---

# Overview

## Indexing Templates
Indexing templates are a defining primitive for the protocol. They perform two very important functions:
- They standardize the semantic information for an onchain entity
- They instruct indexers on how onchain information should be indexed, transformed and stored.

Indexing templates are built by interpreters. At their core they are very simple JSON files that can be read as a set of instructions for an indexer. And there are many ways to build and allow the creation of these templates, and they don't require any knowledge of coding.

## Example

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