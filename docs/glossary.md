---
sidebar_position: 6
---

# Glossary

| **Term** | **Definition** |
| --- | --- |
| App | A crypto service that has created and owns smart contracts. These are often DeFi apps, but can also be NFT marketplaces, social networks, or any other service that uses smart contracts. The service must own at least 1 smart contract to be an app. |
| Position Interpreter (PI) | A ruleset that defines how to interpret a position balance relating to a smart contract. This can be a token balance in a DeFi app, NFT collection, or any other type of app. The position may be "tokenized" or "non-tokenized". |
| Balance | The amount of a token or position held by a user. This can be a token balance, a liquidity position, a collateral position, or any other type of financial position. |
| Tokenized position | A position that is represented by an ERC20 token. This token can be transferred, traded, and redeemed for the underlying token, and the balance held by the user represents the balance the user holds in the position. |
| Non-tokenized position | A position that is not represented by an ERC20 token. This position is held in a smart contract and the user's balance is determined by a method call on the contract. |
| Contract Factory | A smart contract that creates new smart contracts. This is often used by DeFi apps to create new token contracts en masse, with all the emitted contracts having the same methods and general purpose (e.g. Uniswap V2 pool tokens). |
| Curator | A user who creates and maintains an interpreter. |
| Event | An onchain transaction. Each event is uniquely identified by a transaction hash and is initiated by a user (from address) and interacts with an account or smart contract (to address). |
| Event Interpreter | A ruleset that defines how to interpret a group of onchain transactions, often based on a method call made on a specific contract on a network. |
| Position | A financial position held in a smart contract. This can be a token balance, a liquidity position, a collateral position, or any other type of financial position. |
| Price per share | The rate at which one token can be exchanged for another. This is often used to determine the value of a token in terms of another token. |
| Reviewer | A user who reviews, edits, and approves interpreters. |
| Underlying token | The token for which an position can be redeemed in exchange. A position derives its value from this underlying token. |
