---
sidebar_position: 5
---

# Conditional Events

When interpreting more complex transactions, some events with the same method might lead to different outcomes depending on specific values. In these situations, indicate what happens under each condition to interpret all events correctly.

:::tip 

If this is your first event interpretation, start with simpler transactions and tackle conditionals once you're more comfortable with the tool.

:::

To create a conditional, click “Add Case” to open a new section.

![conditional1](https://github.com/Zapper-fi/protocol/assets/169290434/346d637d-d380-466c-acf2-89d73ce30b25)

You will then be able to add the specifics of the transaction. If you are familiar with coding, this works really similarly to an “if” function. In the sense that you are presenting how to interpret the event when (if) this situation occurs. “Actual” is where you will indicate the parameter to look at and “Expected” is what the outcome of this parameter you want to compare it to for this condition to apply. 

**Example:** When a wallet mints an NFT, it typically stays in that wallet, resulting in: “zfreddyy.eth has minted a Zapper NFT.” Here, the “Expected” scenario is that the “Transfer to” address is the same as the “From” address.

If the contract allows minting and sending the NFT to a different address in the same transaction, the event should read: “zfreddyy.eth has minted a Zapper NFT and sent it to 0xmarc.eth.” This requires a conditional scenario where the “Transfer to” address is not the “From” address.

![conditional2](https://github.com/Zapper-fi/protocol/assets/169290434/fe768c5a-7ee2-4406-ae9f-67d49a798bb3)

:::note 

You can have more than one condition for a single event. Some events could require multiple cases to cover all possible outcomes from a method. 

:::
