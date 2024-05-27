---
sidebar_position: 1
---

# Overview
## Introduction
Event Interpreters are used on onchain transactions to translate them into a human-readable output.

With approximately 1,000,000 transactions processed daily on the Ethereum network, each transaction represents an onchain event encompassing various activities like mints, swaps, deposits, bridges, and more. Despite containing valuable information and context, transactions are often challenging to parse due to factors like logs, methods, internal transactions, and obfuscation caused by business logic and gas optimizations.

Zap Protocol aims to address this issue by providing scalable tools for event interpretation. Users can leverage these building blocks to create understandable transaction summaries, assuming they have a general understanding of the transaction's purpose. By utilizing pre-populated drop-down menus and free-form text boxes, users can effectively fill out the transaction details.

## Example
This is a simple event intepreter for Crypto Valleys, an onchain game on Blast.
```
{
    "type": "simple",
    "attachments": [
        {
        "type": "token-transfers",
        "filters": [
            {
            "type": "direction",
            "direction": "inflow",
            "accountRules": [
                {
                "type": "transaction-field",
                "field": "from"
                }
            ]
            },
            {
            "type": "direction",
            "direction": "outflow",
            "accountRules": [
                {
                "type": "transaction-field",
                "field": "from"
                }
            ]
            }
        ]
        }
    ],
    "description": "Changed name to $1",
    "interpolations": [
        {
        "type": "string",
        "rules": [
            {
            "path": "[0]",
            "type": "input-method-parameter",
            "signature": "changeName(string)"
            }
        ]
        }
    ]
}
```

## Quick overview of an Event Interpreter

First, we assume that you have knowledge of what the transaction was generally about, such as “in this transaction, the user sent 6.9 ETH to user X on Farcaster”. Equipped with that knowledge, you can then fill out the transaction using the pre-populated drop-down menus and free-form text boxes.

If you don’t have knowledge of the transaction before attacking this EI, we would recommend you do the following:
- Take a look at the Zapper transaction card to see what information is already available (chain, token transfers, wallet involved etc.)
- Open the explorer to see additional details of what happened onchain (logs, contract, token movement, accounts, input method parameters etc.)
- You can even search online for the contract address to see what the app is, this could already provide important context (is it an NFT-related app, a DeFi app, a DEX, a lending protocol, etc.)

(image) -> (image)

Example of what interpreting an event looks like before and after. [Link to the above event on Zapper](https://zapper.xyz/event/base/0xfacc42536ebc8b37f80406ae52d4a81702d569ba96cd0ffdad986cbd6fa873b0).

Even more so, once a user tells us how to interpret a specific transaction, we can then use this description template to describe ALL events with the same contract method, not just the one transaction. In fact, we see that each event interpretation approved goes on to describe an average of 10,000 transactions on Ethereum and EVM chains, which are then available to all blockchain users. In the example above, the interpretation allowed the user to make over 38,000 transactions human readable!!
