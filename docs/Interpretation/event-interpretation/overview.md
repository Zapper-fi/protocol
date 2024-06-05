---
sidebar_position: 1
---

# Overview

## What is an Event Interpreter (EI)

Event Interpreters are used on onchain transactions to translate them into a human-readable output.

With approximately 1,000,000 transactions processed daily on the Ethereum network, each transaction represents an onchain event encompassing various activities like mints, swaps, deposits, bridges, and more. Despite containing valuable information and context, transactions are often challenging to parse due to factors like logs, methods, internal transactions, and obfuscation caused by business logic and gas optimizations.

Zap Protocol aims to address this issue by providing scalable tools for event interpretation. Users can leverage these building blocks to create understandable transaction summaries, assuming they have a general understanding of the transaction's purpose. By utilizing pre-populated drop-down menus and free-form text boxes, users can effectively fill out the transaction details.

## Example

This is a simple event intepreter for Crypto Valleys, an onchain game on Blast.

```json
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
