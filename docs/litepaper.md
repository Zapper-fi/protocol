---
sidebar_position: 5
---

# Litepaper

## Introduction
Blockchains contain rich economic and social information, yet they remain disorganized and unreadable. Zaper Protocol is an open protocol that incentivizes the interpretation and distribution of human-readable onchain information.

Just as all networks, blockchains exhibit similar patterns in the evolution of emergent value accrual over time. At first there aren’t that many applications, and so it's the applications or primitives (the nodes) themselves that atomically drive value. Google is only as valuable as the quantity and variety of things one can find and do on the web. Similarly for blockchains, the compounding of new onchain use cases and the ever-growing app creates a need for readability and aggregation.

## Mission
At its core, blockchains are a technology made to set us free, connect us via the things we value, and unlock new economic opportunities. And to achieve that vision, we need to make blockchains readable to everyone. Wether that is surfacing nodes that resonate with you - or simply being able to understand different entities.

## Protocol Overview
### Zapper vs. Zapper Protocol
Zapper and Zapper Protocol are two distinct entities, the former being a client of the protocol, and the latter the initial interpretation layer built by Zapper. We've decided to open up our interpretation stack for a few reasons:
- There doesn't exist a single centralized entity that will be able to organize all the onchain information when we have 1M dapps, 10M dapps, without building an open and incentivized protocol.
- Readable onchain information should be open, commoditized, and ubiquitous.
----

### Indexing Templates
Indexing templates are a defining primitive for the protocol. They perform two very important functions:
- They standardize the semantic information for an onchain entity.
- They instruct indexers on how onchain information should be indexed, transformed, and stored.

Indexing templates are built by interpreters. At their core, they are very simple JSON files that can be read as a set of instructions for an indexer. There are many ways to build and allow the creation of these templates, and they don't require any knowledge of coding.


#### Examples
- [Event Intepreter Example](/docs/interpretation/event-interpretation/overview#example)
- [App Token Interpreter Example](/docs/interpretation/overview#example)
---

### Stakeholders
#### Interpreters
These are the onchain explorers and cartographers. They scout the chain for unindexed information and build indexing templates.

Initially, a portion of interpreters will be "Reviewers," a proto-DAO that will be incentivized to ensure quality and that interpreters are validated.


### Indexing: Zapper
Zapper will be indexing and distributing data originating from indexing templates.

### Consumers
They pay for readable data and use it to power their own applications. Data is payable with $ZAP.

### Advantages
#### Data Quality
Since every template specifies a strict interface and format for returning the data, it's much easier to assure consistent quality across the board, as you know exactly what to expect. Current existing solutions are code sandboxes, which makes it very difficult to build good tests.

For example, an app token interpreter for Aave V3 knows exactly that they need to return a balance for a user at the end, and each step of the way you need to specify strict data types to get there.

That said, while the problem of quality can be greatly reduced via automation, we still require a coordination layer at the protocol level to indicate which version of an interpreter is the best.

#### Standardization
Standardization unlocks a number of advantages, making new integrations much faster, and much easier. Many of the time-consuming aspects relating to onchain interpretation are the tooling, setup, and access to good onchain data (in many cases archive data).

We've streamlined the approach by making the creation of new templates code-less and focusing on the minimally required fields.

#### Composability
Since smart contracts are composable with each other, we wanted to make sure that information composability can exist at the semantic layer as well.

A simple example:
You are a wallet app that wants to display a readable transaction history to your users; some of these enriched transactions may contain information about DeFi assets. If an interpreter for that DeFi asset exists, you are able to extract all the contextual information for that asset.

### Templates Types
#### Event Interpreters
Event Interpreters are used on onchain transactions to translate them into human-readable output, and augment them with contextual, and often off-chain, information. You can read more about Event Interpreters [here](docs/interpretation/event-interpretation/overview).

#### App Token Interpreters
App Token Interpreters are used to index app-centric token balances for users. This can be USDC lent on Aave (aUSDC), or a liquidity position for USDC/ETH you hold on Uniswap V2. The large majority of these tokens do not have a market price; rather, they have a redeemable price to unlock an underlying token. To surface these to users, we first need to interpret the contract interface that manages these positions.

You can read more about App Token Interpreters [here](docs/interpretation/app-token-interpretation/overview).

#### Contract Position Interpreters
Like App Token Interpreters, Contract Position Interpreters are used to index redeemable onchain positions onchain. The key difference is in that these positions are not tokenized, and are a bit more arbitrary in nature. Contract Position Interpreters index and standardize arbitrary positions for apps.

You can read more about Contract Position Interpreters [here](docs/interpretation/contract-position-interpretation/overview).

#### Future Interpreters
One of the main benefits of working with indexing templates, is that rather than having flexibility at the base layer, e.g. a sandbox, flexibility is maintained with the creation of new indexing templates. Anyone can create a new template, and as long as an indexer can read the instructions, it can be directly ingested by the protocol via a soft social consensus - in similar way that ERC20 is an offchain consensus as to how tokens should be built and structured.

We currently are working on the following templates:
- Price Interpreters: Index prices for any AMM
- NFT Marketplace Interpreters: Index sales for any NFT marketplace

In the future, many other templates can be created to fit any type of use case:
- Name Registration Services (e.g. ENS)
- Social Feeds
- Badges, Attestations


## $ZAP - Utility Token
### Payment
$ZAP is the central utility token for the protocol and performs the important function of aligning incentives between the different stakeholders.

$ZAP is distributed to interpreters who provide a valuable service in increasing the total surface of contextualized onchain data.

$ZAP is used for accessing API services & data.

For example, if a popular wallet application wants to augment user account information with DeFi positions, they can directly pay protocol for that data, just as they would pay a regular API.

### Governance
$ZAP will provide minimal governance for the protocol, more specifically distributing incentives.
