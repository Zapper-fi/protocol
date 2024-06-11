---
sidebar_position: 1
---

# Overview

## Parsing Onchain Information

At Zapper, our mission is to make all onchain information accessible and human readable. To many, onchain information you see on Etherscan can be difficult to parse and overwhelming. Users are constantly asking:

- "What actually happened in this transaction?"
- "What is the value of my investments?"
- "Who owns this contract?"

Zapper's protocol is built to answer these questions. We do this via what we call "Interpreters", which are essentially a set of instructions that tell Zapper Protocol how to read and interpret onchain information.

## What is an Interpreter?

An interpreter is a set of instructions that tells Zapper Protocol how to read and interpret onchain information. There are 3 types of interpreters we have released, or plan to release in the coming weeks:

1. **Event Interpreters (EIs)**: These interpreters parse transactions and make them human readable. Their core goal is to boil a transaction down to only its more important parts, and display only that key information to the user. [You can read more about Event Interpreters here](/docs/Interpretation/event-interpretation/overview.md).
2. **App Token Interpreters (ATIs)**: These interpreters are used to surface information about tokenized investments users make and hold in their wallet. We refer to the tokens a user receives in return for their investment as "App Tokens". [You can read more about App Token Interpreters here](/docs/Interpretation/app-token-interpretation/overview.md).
3. **App Contract Position Interpreters (ACPIs)**: These interpreters are used to surface information about the positions users hold on smart contracts (and therefore, are not tokenized). [You can read more about App Contract Position Interpreters here](/docs/Interpretation/app-contract-position-interpretation/overview.md).

## Who Makes Interpreters?

Interpreters are built by "Curators" on Zapper Protocol's platform. Curators build and maintain interpreters. They are the ones who define the set of instructions that tell Zapper Protocol how to read and interpret onchain information.

ANYONE can be an interpreter. You don't need to know how to code to build an interpreter. All you need is knowledge of a particular investment and its smart contract, or what actually occured in a given transaction.

## How Do I Create an Interpreter?

Check out our various guides on how to build interpreters:

- [Event Interpreters Guide](/docs/Interpretation/event-interpretation/guide.md)
- [App Token Interpreters Guide](/docs/Interpretation/app-token-interpretation/guide.md)
- [App Contract Position Interpreters Guide - COMING SOON](/docs/Interpretation/app-contract-position-interpretation/guide.md)
<!-- TODO - update ACPI guide when ready for launch -->

## How Do I Find Things to Interpret?

If you're looking for popular events that are not interpreted, you can go to the [Events Curate page](https://zapper.xyz/curate/events).

<!-- TODO - add ATI, ACPI curate pages -->

## How Do I Track the Status of My Interpreter Submissions?

You can track the status of your interpreter submissions on your [My Submissions page](https://zapper.xyz/my-submissions). On that page, you can see the status of your submissions and the stats on how many events or wallets your interpreters have impacted.

Additionally, when the status of your submission changes, you will receive an push notification on the Zapper website. You can check your notifications by clicking the bell icon in the top right corner of the Zapper website.

<!-- TODO - add screenshot of notifications -->

## Do I get Credit for Building an Interpreter?

Yes! Curators who build interpreters are a critical part of Zapper Protocol's ecosystem.

- You can see how you stack up versus other curators on the [Curators Leaderboard](https://zapper.xyz/leaderboard).
- You can see how many interpreters you have submitted and their stats on your [My Submissions page](https://zapper.xyz/my-submissions).
