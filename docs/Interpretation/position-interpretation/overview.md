---
sidebar_position: 1
sidebar_label: Overview
pagination_label: Overview of Positions
---

# Overview of Positions

## What is an Position?

A position is a representation of a user's holdings or balance in a specific asset or contract. When a user deposits a token into a protocol, and that deposit has value, the user has entered into a position. Positions can be represented in a variety of ways, such as a "tokenized position" or a "non-tokenized position". Either way, the position represents the user's ownership of a specific asset or contract.

:::info
Apps deploy various contracts for different types of positions, and will offer investments that are tokenized, and others that are non-tokenized. It is somewhat arbitrary when an app chooses for a position to be tokenized or non-tokenized, and the distinction is not always clear. Zapper treats tokenized positions as positions that are represented by a token, and non-tokenized positions as positions that are not represented by a token.

![Positions Example](/img/tutorial/positions_example.png)

### Tokenized Positions

#### What is a tokenized position?

Tokenized positions are:

1. Transferrable
2. Fungible
3. Redeemable for some underlying token or set of tokens, from which they derive their value
4. Related to a crypto App

Tokenized positions are commonly held directly by users, so are analogous to the concept of a _receipt_. You deposit 100 USDC on Aave and receive 100 aUSDC tokens in return. The aUSDC token is a tokenized position that acts like a receipt of your deposit, and is redeemable for 100 USDC on Aave, or tradeable elsewhere (if the token is listed on an exchange).

#### Common examples of tokenzied positions

Common examples of Tokenzied positions are:

- Staking tokens, like staking stkAave or xSUSHI ([example stkAAVE token](https://etherscan.io/token/0x4da27a545c0c5b758a6ba100e3a049001de870f5))
- Liquidity pool positions in a decentralized exchange like Uniswap, SushiSwap, or Curve ([example Uniswap v2 pool token](https://etherscan.io/token/0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5))
- Autocompounding "vaults" from yield aggregators like Pickle or Yearn ([example yearn vault token](https://optimistic.etherscan.io/address/0x059eaa296b18e0d954632c8242ddb4a271175eed))
- Supply and borrow positions in a lending app like Aave ([example aUSDC token](https://etherscan.io/token/0xbcca60bb61934080951369a648fb03df4f96263c))
- Or even more obscure primitives like [Curve Gauages](https://etherscan.io/address/0x49887df6fe905663cdb46c616bfbfbb50e85a265) or prize savings accounts in [PoolTogether](https://optimistic.etherscan.io/address/0x03d3ce84279cb6f54f5e6074ff0f8319d830dafe)

The majority of these tokenized positions do not have a market price; you cannot go on an exchange and buy 2 $TOSHI/$WETH pool tokens. Rather, tokenized positions are redeemable for some underlying token(s). The redemption value of a position for its underlying tokens is how we price and derive their value of them.

### Non-tokenized positions

#### What is an non-tokenized position?

Like tokenized positions, non-tokenized positions represent onchain investments and what their redeemable value is, in terms of underlying tokens.

The key difference is that these non-tokenized positions are **not tokenized**, and are a bit more arbitrary.

- For Tokenized Positions, you deposit a token and receive a token in return. Thus, it is tokenized, with the token acting like a receipt.
- For non-tokenized positions, you deposit a token and do not receive any tokens in return. Instead, the contract you deposited into logs the investment as a position on the contract, and you can redeem the position for the underlying token at any time.

Non-tokenized positions are:

1. Not transferrable (though some contracts may allow you to delegate or transfer them)
2. Fungible - you deposit into a large vault, alongside all the other depositors
3. Redeemable - you can redeem your position for the underlying token at any time (unless it's locked)
4. Related to a crypto App

There are 2 somewhat confusing exceptions, where a position that is technically tokenized is treated as non-tokenized by Zapper:

1. NFT-based positions: Zapper also treats NFT-based positions as non-tokenized positions, despite them technically being tokenized. This is because the NFT you receive in return for the deposit does not represent the balance of the position, but rather marks that you _may_ hold a position in the investment. Due to this, Zapper cannot calculate how much of the position a user owns from the NFT alone and must query the contract to determine the balance.
2. Tokenized positions where the position owner does not receive a token: Zapper treats these as non-tokenized positions, as the user does not receive a token in return for the deposit. Common examples are staking contracts where you deposit a token, and a staked token is minted, but instead of receiving the staked token, that staked token is sent to a staking contract. Zapper treats these as non-tokenized positions, as the user does not receive a token in return for the deposit.

#### Common examples of non-tokenized positions

Common examples of non-tokenized Ppositions are:

- Deposits into farms of liquidity mining programs. Common examples are staking your Curve LP tokens on Convex Finance, or staking your Sushi LP tokens on SushiSwap.
- Deposits into staking contracts, where you do not receive a staking token in return. Common examples are [Gitcoin Staking](https://etherscan.io/address/0x0e3efd5be54cc0f4c64e0d186b0af4b7f2a0e95f)
- DCA or salary stream contracts, like [Sablier's payment streams](https://etherscan.io/address/0xAFb979d9afAd1aD27C5eFf4E27226E3AB9e5dCC9) or [Balmy's (fka Mean Fiance) DCA contracts](https://etherscan.io/address/0x20bdAE1413659f47416f769a4B27044946bc9923)
- NFT-based on positions - where you deposit an NFT into a contract and receive a position in return. Common examples are [Uniswap V3 NFTs](https://etherscan.io/address/0xc36442b4a4522e871399cd717abdd847ab11fe88)

---

## Position Interpreters

### What is a position interpreter(PI)?

Position Interpreters are used to index app-centric balances for users. A PI contains the logic telling Zapper how to interpret a user's balance in a specific app. This is done by defining the contract(s) that the PI applies to, and the methods to call on the contract to resolve the user's balance.

This can be [USDC](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48) lent on Aave [aUSDC](https://etherscan.io/token/0xbcca60bb61934080951369a648fb03df4f96263c), or a liquidity position for [DAI/USDC](https://etherscan.io/address/0xae461ca67b15dc8dc81ce7615e0320da1a9ab8d5) you hold on Uniswap V2. All positions are redeemable for some amount of underlying token(s), and an Position Interpreter is what provides the ruleset of what a position is redeemable for.

There are 3 main components of a Position Interpreter:

1. Defining what contract(s) & network the PI applies to
2. Defining how to fetch the underlying token(s) of the position
3. Defining how exchange rate that the position is redeemable for, in terms of the underlying token(s)

---

#### Components of an Position Interpreter

##### Contracts & Network

Position Interpreters start with the basis of a contract address or a contract factory. The basic assumption is that the same PI template can be used to resolve all instances of the same contract produced by the contract factory. For example, the Uniswap V2 factory contract produces all Uniswap V2 pairs (100k+ positions!), and the same PI template can be used to resolve all Uniswap V2 pairs, as they all use the same contract ABI and contain the same methods.

##### Resolving Underlying Tokens

Once the contract address or factory is defined, we then define how to resolve the underlying tokens. This can be done in a few ways:

1. Directly from the contract itself - this is the best-case scenario, where the contract has a method that returns the underlying token(s). For example, the Uniswap V2 pair contract has `token0()` and `token1()` methods that return the underlying tokens.
2. User input - in some cases, the underlying tokens are not directly resolvable from the contract, and the user must provide the underlying tokens. For example, [Aave ETH (aETH)](https://etherscan.io/token/0x3a3a65aab0dd2a17e3f1947ba16138cd37d08c04#readContract) does not contain a method on the contract call the ETH gas token contract, as it does not exist. In this case, the user must provide the underlying token address; in the case of Aave ETH, the user inputs `0x0000000000000000000000000000000000000000` as the underlying token address.

##### Price Per Share (Exchange Rate)

Finally, we define how many underlying tokens a position is redeemable for, or the exchange rate.

This is done through an expression, which is a mathematical formula that defines how many underlying tokens a position is redeemable for.

This can be as simple as inputting `1` for a token that is redeemable for 1 underlying token (a 1:1 redemption ratio), or as complex as a formula that calculates the redemption value based on the state of the contract. For example, a Uniswap V2 pair is redeemable for `reserve0 / (10 ^ token0.decimals())` amount of token0 and `reserve1 / (10 ^ token1.decimals())` amount of token1.

The result of all these components is a set of rules that define how to resolve a position. This information is assembled into a JSON object that is stored in the Zapper database and is used to calculate the value of the positions the user owns.

---

## Example JSON Object of an Position Interpreter

Below is an example JSON object of an Position Interpreter for a Uniswap V2 factory contract. This ATI is used to resolve the underlying tokens of all Uniswap V2 pairs created by the factory and calculate the redemption value of the positions.

Factory address: [Etherscan Link](https://etherscan.io/token/0x3a3a65aab0dd2a17e3f1947ba16138cd37d08c04#readContract)

Event signature used to populate pool tokens: `event PairCreated(address indexed token0, address indexed token1, address pair, uint256 untitled3)`

Underlying token resolution: `token0()` and `token1()` methods

Redemption value calculation: `(reserve0 / (10 ^ token0.decimals())) / (reserve1 / (10 ^ token1.decimals())) + 1`

```js
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
