---
sidebar_position: 1
---

# Overview
## Introduction
Event Interpreters are used on onchain transactions to translate them into a human-readable output.

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