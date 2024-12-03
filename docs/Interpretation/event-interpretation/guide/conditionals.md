---
sidebar_position: 8
---

# Conditional Transactions

When interpreting more complex transactions, the same method might lead to different outcomes depending on specific values. In these situations, indicate what happens under each condition to interpret all transactions correctly.

:::tip 

If this is your first transaction interpretation, start with simpler transactions and tackle conditionals once you're more comfortable with the tool.

:::

To create a conditional, simply click **“Add Case”** to open a new section.

You will then be able to add the specifics of the transaction. If you are familiar with coding, this works really similarly to an “if” function. In the sense that you are presenting how to interpret the transaction when (if) this situation occurs. “Actual” is where you will indicate the parameter to look at and “Expected” is what the outcome of this parameter you want to compare it to for this condition to apply. 

**Example:** When a wallet mints an NFT, it typically stays in that wallet, resulting in: “zfreddyy.eth has minted a Zapper NFT.” Here, the “Expected” scenario is that the “Transfer to” address is the same as the “From” address.

If the contract allows minting and sending the NFT to a different address in the same transaction, the description should read: “zfreddyy.eth has minted a Zapper NFT and sent it to 0xmarc.eth.” This requires a conditional scenario where the “Transfer to” address is not the “From” address.

![conditional2](/img/assets/Conditional-Events.png)

:::note 

You can have more than one condition for a single transaction. Some could require multiple cases to cover all possible outcomes from a method. 

:::
