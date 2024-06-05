---
sidebar_position: 1
sidebar_label: Overview
---

# Overview

## What is an App Contract Position Interpreter

Like App Token Interpreters, Contract Position Interpreters are used to index redeemable onchain positions onchain. The key difference is in that these positions are not tokenized, and are a bit more arbitrary in nature. Contract Position Interpreters index and standardize arbitrary positions for apps.

## Example

```json
{
  "addressFactory": {
    "type": "FROM_LOG",
    "resolvers": [
      {
        "address": {
          "type": "STRING",
          "value": "0xde1c04855c2828431ba637675b6929a684f84c7f"
        },
        "signature": "event LlamaPayCreated(address token, address llamaPay)",
        "startBlock": 14676643,
        "resolveData": [
          {
            "key": "tokenAddress",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.token"
            }
          }
        ],
        "resolveAddress": {
          "type": "REFERENCE",
          "reference": "log.args.llamaPay"
        }
      }
    ]
  },
  "definitionFactory": {
    "type": "FROM_LOG",
    "resolvers": [
      {
        "signature": "StreamCreated(address indexed from, address indexed to, uint216 amountPerSec, bytes32 streamId)",
        "resolveKey": {
          "type": "REFERENCE",
          "reference": "log.args.streamId"
        },
        "resolveData": [
          {
            "key": "payee",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.to"
            }
          },
          {
            "key": "payer",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.from"
            }
          },
          {
            "key": "streamId",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.streamId"
            }
          },
          {
            "key": "amountPerSec",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.amountPerSec"
            }
          }
        ]
      },
      {
        "signature": "StreamCreatedWithReason(address indexed from, address indexed to, uint216 amountPerSec, bytes32 streamId, string reason)",
        "resolveKey": {
          "type": "REFERENCE",
          "reference": "log.args.streamId"
        },
        "resolveData": [
          {
            "key": "payee",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.to"
            }
          },
          {
            "key": "payer",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.from"
            }
          },
          {
            "key": "reason",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.reason"
            }
          },
          {
            "key": "streamId",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.streamId"
            }
          },
          {
            "key": "amountPerSec",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.amountPerSec"
            }
          }
        ]
      },
      {
        "signature": "StreamModified(address indexed from, address indexed oldTo, uint216 oldAmountPerSec, bytes32 oldStreamId, address indexed to, uint216 amountPerSec, bytes32 newStreamId)",
        "resolveKey": {
          "type": "REFERENCE",
          "reference": "log.args.newStreamId"
        },
        "resolveData": [
          {
            "key": "payee",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.to"
            }
          },
          {
            "key": "payer",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.from"
            }
          },
          {
            "key": "streamId",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.newStreamId"
            }
          },
          {
            "key": "amountPerSec",
            "rule": {
              "type": "REFERENCE",
              "reference": "log.args.amountPerSec"
            }
          }
        ]
      }
    ]
  },
  "accountFactory": {
    "type": "FROM_LOG",
    "resolvers": [
      {
        "signature": "StreamCreated(address indexed from, address indexed to, uint216 amountPerSec, bytes32 streamId)",
        "resolveKey": {
          "type": "REFERENCE",
          "reference": "log.args.streamId"
        },
        "resolveData": [],
        "resolveAccountAddress": {
          "type": "REFERENCE",
          "reference": "log.args.to"
        }
      },
      {
        "signature": "StreamCreatedWithReason(address indexed from, address indexed to, uint216 amountPerSec, bytes32 streamId, string reason)",
        "resolveKey": {
          "type": "REFERENCE",
          "reference": "log.args.streamId"
        },
        "resolveData": [],
        "resolveAccountAddress": {
          "type": "REFERENCE",
          "reference": "log.args.to"
        }
      },
      {
        "signature": "StreamModified(address indexed from, address indexed oldTo, uint216 oldAmountPerSec, bytes32 oldStreamId, address indexed to, uint216 amountPerSec, bytes32 newStreamId)",
        "resolveKey": {
          "type": "REFERENCE",
          "reference": "log.args.newStreamId"
        },
        "resolveData": [],
        "resolveAccountAddress": {
          "type": "REFERENCE",
          "reference": "log.args.to"
        }
      }
    ]
  },
  "labelRule": {
    "type": "INTERPOLATION",
    "description": "Streamed $1",
    "descriptionInterpolations": [
      {
        "type": "REFERENCE",
        "reference": "tokens[0].symbol"
      }
    ]
  },
  "tokenRules": [
    {
      "metaType": "SUPPLIED",
      "addressRule": {
        "args": [],
        "type": "METHOD_CALL",
        "target": {
          "type": "REFERENCE",
          "reference": "address"
        },
        "signature": "token() returns (address)"
      },
      "tokenIdRule": null,
      "balanceRule": {
        "type": "TRY_CATCH",
        "tryRule": {
          "type": "SEQUENCE",
          "steps": [
            {
              "args": [
                {
                  "type": "REFERENCE",
                  "reference": "data.payer"
                },
                {
                  "type": "REFERENCE",
                  "reference": "data.payee"
                },
                {
                  "type": "REFERENCE",
                  "reference": "data.amountPerSec"
                }
              ],
              "type": "METHOD_CALL",
              "target": {
                "type": "REFERENCE",
                "reference": "address"
              },
              "signature": "withdrawable(address, address, uint216) returns (uint256, uint256, uint256)"
            },
            {
              "type": "REFERENCE",
              "reference": "step1[0]"
            }
          ]
        },
        "catchRule": {
          "type": "NUMBER",
          "value": 0
        }
      }
    }
  ]
}
```
