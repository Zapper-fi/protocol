---
sidebar_position: 1
pagination_label: Interpretation Overview
---

# Overview

## Indexing Templates

Indexing Templates are the foundation from which interpretation is built.

Indexing templates are their core are simple `JSON` files - and are formatted around different standards/types. You can view an example of a JSON file event interpreter [here](/docs/interpretation/event-interpretation/overview#example-json-object-of-an-ei).

There are 2

- **Event Interpretation**
- **Position Interpretation**

---

## Event Interpretation

Event Interpreters are used on onchain transactions to translate them into human-readable output and augment them with contextual, and often off-chain, information.

You can read more about Event Interpreters [here](/docs/interpretation/event-interpretation/overview).

---

## Position Interpretation

Position interpreters are used to index app-centric balances for users. This can be USDC lent on Aave (aUSDC), or a liquidity position for USDC/ETH you hold on Uniswap V2, or a staked token held in a contract. The large majority of these positions do not have a market price and are not tradeable; rather, they have a redeemable price to unlock an underlying token. To surface these to users, we first need to interpret the contract interface that manages these positions.

You can read more about position interpreters [here](/docs/interpretation/position-interpretation/overview).

---

## Future

One of the main benefits of working with indexing templates is that rather than having flexibility at the base layer, e.g. a sandbox, flexibility is maintained with the creation of new indexing templates. Anyone can create a new template, and as long as an indexer can read the instructions, it can be directly ingested by the protocol via a soft social consensus - in a similar way that ERC20 is an offchain consensus as to how tokens should be built and structured.

We currently are working on the following templates:

- Price Interpreters: Index prices for any AMM
- NFT Marketplace Interpreters: Index sales for any NFT marketplace
