---
sidebar_position: 1
pagination_label: Transaction Interpretation Overview
---

# Overview

### Types of transactions

The types of transactions happening onchain is growing exponentially. Here are a few examples that we see most frequently.

- **DeFi:** Transfer, Swap, Bridge, Stake, etc.
- **NFT:** Mints, Sales, etc.
- **Governance:** Votes, proposals, etc.
- **Gaming:** Actions, Attacks, Rolls, Spins, etc.

Each transaction is different, but it will usually consists of different parameters such as:

- Date & time (when?)
- Action (how?)
- App & contract (where?)
- Accounts (who?)
- Tokens (what?)

The combination of these parameters will create a clear summary of the transaction.

### Problem with onchain transactions

All of this information about each transaction is available through onchain explorers, but is almost unreadable to a common user. This makes having a clear picture of an onchain transaction really difficult. This is why Transaction Interpreters (TI) are needed to transform the complicated technical data into a simple and clear summary.

---

## What is an Transaction Interpreter (TI)

Transaction Interpreters are used to translate onchain transactions into a human-readable output.

Millions of transactions happen onchain each day. Each transaction contains valuable information and context, but are challenging to parse due to factors like logs, methods, internal transactions, and obfuscation caused by business logic and gas optimizations.

Zapper Protocol addresses this issue by providing scalable tools for transaction interpretation. With a simple no-code tool, anyone can turn a complicated transaction into a human-readable sentence in a few clicks.

---

## Key Components

A transaction interpreter is built out of different key components. Put together these key components give structure and meaning to the interpretation. Here are these key components:

### 1. Description

Could be as simple as a single action verb, the Description will explain, in words, what happened in the transaction. Click [here](guide/action-verb.md) to learn more about how to add the Description.

### 2. Items involved

Items could be tokens, NFTs, or any information contained in the onchain transaction. Click [here](guide/item-types.md) to learn more about the different items that can be added.

### 3. App

The app through which the transaction occured is the last piece of the puzzle. Click [here](guide/adding-app.md) to learn more about adding apps to transactions.

Together, these three elements give us a clear summary of the transaction:

![image](/img/assets/App.png)

---

## Example JSON Object of an TI

This is a simple transaction intepreter for Crypto Valleys, an onchain game on Blast.

```js
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
