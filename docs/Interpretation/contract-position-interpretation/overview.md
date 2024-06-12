---
sidebar_position: 1
sidebar_label: Overview
pagination_label: Overview of App Contract Positions
---

# Overview of App Contract Positions

## What is an App Contract Position?

Like [App Tokens](/docs/Interpretation/app-token-interpretation/overview), App Contract Positions represent onchain investments and what their redeemable value is, in terms of underlying tokens.

The key difference is that these positions are **not tokenized**, and are a bit more arbitrary.

- For App Tokens, you deposit a token and receive a token in return. Thus, it is tokenized.
- For App Contract Positions, you deposit a token and do not receive any tokens in return. Instead, the contract you deposited into logs the investment as a position on the contract, and you can redeem the position for the underlying token at any time.

App Contract Positions are:

- Generally not transferrable (though some contracts may allow you to delegate or transfer them)
- Fungible - you deposit into a large vault, alongside all the other depositors
- Redeemable - you can redeem your position for the underlying token at any time (unless it's locked)
- Related to a crypto App

:::info
Note that Zapper also treats NFT-based positions as App Contract Positions, despite them being tokenized. This is because the NFT you receive in return for the deposit does not represent the balance of the position, but rather the position itself. Due to this, Zapper cannot calculate how much of the position a user owns from the NFT alone and must query the contract to determine the balance.
:::

Common examples of App Contract Positions are:

- Deposits into farms of liquidity mining programs. Common examples are staking your Curve LP tokens on Convex Finance, or staking your Sushi LP tokens on SushiSwap.
- Deposits into staking contracts, where you do not receive a staking token in return. Common examples are [Gitcoin Staking](https://etherscan.io/address/0x0e3efd5be54cc0f4c64e0d186b0af4b7f2a0e95f)
- DCA or salary stream contracts, like [Sablier's payment streams](https://etherscan.io/address/0xAFb979d9afAd1aD27C5eFf4E27226E3AB9e5dCC9) or [Balmy's (fka Mean Fiance) DCA contracts](https://etherscan.io/address/0x20bdAE1413659f47416f769a4B27044946bc9923)
- NFT-based on positions - where you deposit an NFT into a contract and receive a position in return. Common examples are [Uniswap V3 NFTs](https://etherscan.io/address/0xc36442b4a4522e871399cd717abdd847ab11fe88)

## What is an App Contract Position Interpreter (ACPI)?

An App Contract Position Interpreter (ACPI) is a set of rules that Zapper uses to interpret the positions you have in a contract and calculate their value in terms of underlying tokens.

All app contract positions are redeemable for some amount of underlying token(s).

There are 5 main components to an ACPI:

1. Defining what contracts & network the ACPI applies
2. Defining the positions within a contract
3. Defining which addresses may have a position within the contract
4. Defining how to resolve the underlying tokens of the positions, that the investment is redeemable for.
5. Defining how to calculate the exchange rate of the position in terms of the underlying token(s) it is redeemable for.

## Components of App Contract Position Interpreter

### Contracts & Network

App Contract Position Interpreters start with the basis of a contract address or a contract factory.

The basic assumption is that the same ACPI template can be used to resolve all instances of the same contract produced by the contract factory.

  For example, JPEG'd, an NFT-backed loans app, has a [contract for each NFT collection it supports](https://docs.jpegd.io/jpegd-dao/tokenomics/contracts#nft-vaults). The same ACPI template can be used to resolve all instances of the same contract produced by the contract factory.

### Positions

xxx

### Addresses

xxx

### Resolving Underlying Tokens

xxx

### Calculating Exchange Rate

xxx

## Example

```js
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
