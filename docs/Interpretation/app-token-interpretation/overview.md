---
sidebar_position: 1
sidebar_label: Overview
pagination_label: Overview of App Tokens
---

# Overview of App Tokens

## What is an App Token?

App Token is the term Zapper uses for investable positions that are represented by the `ERC20` token standard. 

App Tokens are:

1. Transferrable
2. Fungible
3. Redeemable for some underlying token or set of tokens, from which they dervice their value
4. Related to a crypto App

Common examples of app tokens are:

- Staking tokens, like staking stkAave or xSUSHI ([example stkAAVE token](https://etherscan.io/token/0x4da27a545c0c5b758a6ba100e3a049001de870f5))
- Liquidity pool positions in a decentralized exchange like Uniswap, SushiSwap, or Curve ([example Uniswap v2 pool token](https://etherscan.io/token/0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5))
- Autocompounding "vaults" from yield aggregators like Pickle or Yearn ([example yearn vault token](https://optimistic.etherscan.io/address/0x059eaa296b18e0d954632c8242ddb4a271175eed))
- Supply and borrow positions in a lending app like Aave ([example aUSDC token](https://etherscan.io/token/0xbcca60bb61934080951369a648fb03df4f96263c))
- Or even more obscure primitives like [Curve Gauages](https://etherscan.io/address/0x49887df6fe905663cdb46c616bfbfbb50e85a265) or prize savings accounts in [PoolTogether](https://optimistic.etherscan.io/address/0x03d3ce84279cb6f54f5e6074ff0f8319d830dafe)

The large majority of these app tokens do not have a market price; you cannot go on an exchange and buy 2 $TOSHI/$WETH pool tokens. Rather, app tokens are redeemable for some underlying token(s). The redemption value of an app token for its underlying tokens is how we price and derive the value of them.

App Tokens are most commonly held directly by users, so are somewhat analogous to the concept of a _receipt_. You deposit 100 USDC on Aave, you get a receipt of 100 aUSDC in return.

<!-- TODO: reference intermediary App tokens -->

:::warn
App Tokens are tokenized positions. There is a different classs of investments that we call App Contract Positions, which are not tokenized. These are positions that are held directly in a contract, and are not represented by an `ERC20` token. Examples of these are farming positions in a contract, or a locked position in a contract that does not issue a token. To learn more about App Contract Positions, see the [App Contract Position Interpretation](/docs/Interpretation/app-contract-position-interpretation/overview) guide.
:::

## What is an App Token Interpreter(ATI)?

App Token Interpreters are used to index app-centric token balances for users. This can be [USDC](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) lent on Aave [aUSDC](https://etherscan.io/token/0xbcca60bb61934080951369a648fb03df4f96263c), or a liquidity position for [DAI/USDC](https://etherscan.io/address/0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5) you hold on Uniswap V2. All app tokens are redeemable for some amount of underlying token(s), and an App Token Interpreter is what provides the ruleset of what an app token is redeemable for.

There are 3 main components of an App Token Interpreter:

1. Defining what contracts & network the ATI applies to
2. Defining how to resolve the underlying token(s)
3. Defining how many underlying tokens an app token is redeemable for

## Components of an App Token Interpreter

### Contracts & Network

App Token Interpreters start with the basis of a contract address or a contract factory. The basic assumption is that the same ATI template can be used to resolve all instances of the same contract produced by the contract factory. For example, the Uniswap V2 factory contract produces all Uniswap V2 pairs, and the same ATI template can be used to resolve all Uniswap V2 pairs, as they all use the same contract ABI and contain the same methods.

### Resolving Underlying Tokens

Once the contract address or factory is defined, we then define how to resolve the underlying tokens. This can be done in a few ways:

1. Directly from the contract itself - this is the best-case scenario, where the contract has a method that returns the underlying tokens. For example, the Uniswap V2 pair contract has `token0()` and `token1()` methods that return the underlying tokens.
2. User input - in some cases, the underlying tokens are not directly resolvable from the contract, and the user must provide the underlying tokens. For example, [Aave ETH (aETH)](https://etherscan.io/token/0x3a3a65aab0dd2a17e3f1947ba16138cd37d08c04#readContract) does not contain a method on the contract call the ETH gas token contract, as it does not exist. In this case, the user must provide the underlying token address; in the case of Aave ETH, the user inputs `0x0000000000000000000000000000000000000000` as the underlying token address.

### Exchange Rate

Finally, we define how many underlying tokens an app token is redeemable for, or the exchange rate. 

This is done through an expression, which is a mathematical formula that defines how many underlying tokens an app token is redeemable for. This can be as simple as inputting `1` for a token that is redeemable for 1 underlying token (a 1:1 redemption ratio), or as complex as a formula that calculates the redemption value based on the state of the contract. For example, a Uniswap V2 pair is redeemable for `reserve0 / (10 ^ token0.decimals())` amount of token0 and `reserve1 / (10 ^ token1.decimals())` amount of token1.

The result of all these components is a set of rules that define how to resolve an app token. This information is assembled into a JSON object that is stored in the Zapper database, and is used to calculate the value of app tokens in user wallets.

## Example JSON Object of an ATI

Below is an example JSON object of an App Token Interpreter for a Uniswap V2 factory contract. This ATI is used to resolve the underlying tokens of all Uniswap V2 pairs created by the factory, and calculate the redemption value of the app token.

Factory address: [Etherscan Link](https://etherscan.io/token/0x3a3a65aab0dd2a17e3f1947ba16138cd37d08c04#readContract)
Event signature used to populate pool tokens: `event PairCreated(address indexed token0, address indexed token1, address pair, uint256 untitled3)`
Underlying token resolution: `token0()` and `token1()` methods
Redemption value calculation: `(reserve0 / (10 ^ token0.decimals())) / (reserve1 / (10 ^ token1.decimals())) + 1`

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
