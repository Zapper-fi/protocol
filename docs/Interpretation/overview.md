---
sidebar_position: 1
---

# Introduction

## Indexing Templates

Indexing Templates are the foundation from which interpretation is built.

Indexing templates are their core are simple `JSON` files - and are formatted around different standards / types. You can view an example of a JSON file event interpreter [here](/docs/interpretation/event-interpretation/overview#example).

There currently exists 3 types of indexing templates within the protocol:
- <b>Event Interpretation</b>
- <b>App Token Interpretation</b>
- <b>Contract Position Interpration</b>

The last two are both a subset of what we call `position interpretation` which have as a goal to present contextual financial positions or assets in different onchain apps.


## Event Interpretation

Event Interpreters are used on onchain transactions to translate them into human-readable output, and augment them with contextual, and often off-chain, information.

You can read more about Event Interpreters [here](/docs/interpretation/event-interpretation/overview).

## App Token Interpretation

App Token Interpreters are used to index app-centric token balances for users. This can be USDC lent on Aave (aUSDC), or a liquidity position for USDC/ETH you hold on Uniswap V2. The large majority of these tokens do not have a market price; rather, they have a redeemable price to unlock an underlying token. To surface these to users, we first need to interpret the contract interface that manages these positions.

You can read more about App Token Interpreters [here](/docs/interpretation/app-token-interpretation/overview).

## Contract Position Interpretation

Like App Token Interpreters, Contract Position Interpreters are used to index redeemable onchain positions onchain. The key difference is in that these positions are not tokenized, and are a bit more arbitrary in nature. Contract Position Interpreters index and standardize arbitrary positions for apps.

You can read more about Contract Position Interpreters [here](/docs/interpretation/contract-position-interpretation/overview).

## Future

One of the main benefits of working with indexing templates, is that rather than having flexibility at the base layer, e.g. a sandbox, flexibility is maintained with the creation of new indexing templates. Anyone can create a new template, and as long as an indexer can read the instructions, it can be directly ingested by the protocol via a soft social consensus - in similar way that ERC20 is an offchain consensus as to how tokens should be built and structured.

We currently are working on the following templates:

- Price Interpreters: Index prices for any AMM
- NFT Marketplace Interpreters: Index sales for any NFT marketplace