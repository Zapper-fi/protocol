---
sidebar_position: 1
---

# Overview

## What is an event?

### Types of events

An event is the result of an onchain transaction. We can find an ever growing list of different events happening onchain every day. Here are a few examples that we see more frequently to help illustrate what events are:

- **DeFi:** Transfer, Swap, Bridge, Stake, etc.
- **NFT:** Mints, Sales, etc.
- **Governance:** Votes, proposals, etc.
- **Gaming:** Actions, Attacks, Rolls, Spins, etc.

### What makes an event?

Each event is different, but it will usually consists of different parameters such as:
- Date & time (when?)
- Action (how?)
- App & contract (where?)
- Accounts (who?)
- Tokens (what?)

Brought together, the combination of these parameters will create a clear summary of the transaction.

We can find an always growing list of different types of events happening onchain every day. Here are a few examples that we see more frequently to help illustrate what events are:

### Problem with onchain events

All of this information about each transaction is available through onchain explorers, but is almost unreadable to a common user, which makes having a clear picture of an onchain event really difficult. Having a way of translating the onchain information into something a human can read is primordial. This is why Event Interpreters (EI) are needed. 

EIs transform the complicated technical information of an onchain transaction into a simple and clear summary.

## What is an Event Interpreter (EI)

Event Interpreters are used on onchain transactions to translate them into a human-readable output.

We are seeing approximately 1,000,000 transactions processed daily on the Ethereum network. Despite containing valuable information and context, transactions are often challenging to parse due to factors like logs, methods, internal transactions, and obfuscation caused by business logic and gas optimizations.

Zapper Protocol aims to address this issue by providing scalable tools for event interpretation. Users can leverage these building blocks to create understandable transaction summaries, assuming they have a general understanding of the transaction's purpose. By utilizing pre-populated drop-down menus and free-form text boxes, users can effectively fill out the transaction details.

## Key Components

An event interpreter is built out of different key components. Put together these key components give structure and meaning to the interpretation. Here are these key components:

**1. Description:** Could be as simple as a single action verb, the Description will explain, in words, what happened in the transaction.

**2. Items involved:** Items could be tokens, NFTs, or any information contained in the onchain transaction. 

**3. App:** The app through which the transaction occured is the last piece of the puzzle. 

Together, these three elements give us a clear summary of the event:

![image](/img/assets/mechanics2.png)

## Example

This is a simple event intepreter for Crypto Valleys, an onchain game on Blast.

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
