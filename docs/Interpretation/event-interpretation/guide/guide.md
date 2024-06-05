---
sidebar_position: 2
---

# Building an Event Interpreter

## Where to start

For a lot of transactions, it can be a bit tricky to understand exactly what the purpose of a transaction was, if you are not the one that executed it.

The best place to start is by searching or connecting your wallet on [Zapper](https://zapper.xyz/) and looking at the activity feed timeline. Start by interpreting any transactions that are rendered as "did something" in the activity tab.

However, if you're feeling adventurous, you can source popular, uninterpreted transactions from the [Zapper Curate](https://zapper.xyz/curate/events) page.
Another good strategy is to find an app that you know well and that has some associated “did something” transactions. You can interpret multiple transactions from that same app. It helps when you understand how the app works.

For more details see Tips on how to investigate an Event for interpretation section.

## Quick example of an Event Interpreter

First, we assume that you have knowledge of what the transaction was generally about, such as “in this transaction, the user sent 6.9 ETH to user X on Farcaster”. Equipped with that knowledge, you can then fill out the transaction using the pre-populated drop-down menus and free-form text boxes.

If you don’t have knowledge of the transaction before attacking this EI, we would recommend you do the following:

- Take a look at the Zapper transaction card to see what information is already available (chain, token transfers, wallet involved etc.)
- Open the explorer to see additional details of what happened onchain (logs, contract, token movement, accounts, input method parameters etc.)
- You can even search online for the contract address to see what the app is, this could already provide important context (is it an NFT-related app, a DeFi app, a DEX, a lending protocol, etc.)

(image) -> (image)

Example of what interpreting an event looks like before and after. [Link to the above event on Zapper](https://zapper.xyz/event/base/0xfacc42536ebc8b37f80406ae52d4a81702d569ba96cd0ffdad986cbd6fa873b0).

Even more so, once a user tells us how to interpret a specific transaction, we can then use this description template to describe ALL events with the same contract method, not just the one transaction. In fact, we see that each event interpretation approved goes on to describe an average of 10,000 transactions on Ethereum and EVM chains, which are then available to all blockchain users. In the example above, the interpretation allowed the user to make over 38,000 transactions human readable!!  

## Event Interpretation video examples

For those who prefer a visual preview to better understand the process of interpreting events, we put together some videos of different types of events you might encounter.

**Overview of the interface:**
[Jasper Video 1]

**Example of a String extraction case:**
[Jasper Video 2]

**Example of an Address extraction case:**
[Jasper Video 3]


Excited to make the blockchain readable for everyone? If you want to get started with your first interpretations, you can read our detailed [Guide](https://protocol-docs-smoky.vercel.app/docs/Interpretation/event-interpretation/guide)!
