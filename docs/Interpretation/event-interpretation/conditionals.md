---
sidebar_position: 6
---

# Conditional Events

On your interpretation adventure, you might stumble upon some events that are a bit more complex. Some transactions with the same method might lead to different interpretations. For example, a transaction might have different outcomes depending on specific values. In those situations, you will need to indicate what happens under each condition to interpret all events correctly. 

Note: If this is your first event interpretation, we would recommend starting with a more simple transaction, and keep a conditional for when you are more comfortable with the tool. 

To create a conditional, simply click “Add Case” to open a new section. 

![conditional1](https://github.com/Zapper-fi/protocol/assets/169290434/346d637d-d380-466c-acf2-89d73ce30b25)

You will then be able to add the specifics of the transaction. If you are familiar with coding, this works really similarly to an “if” function. In the sense that you are presenting how to interpret the event when (if) this situation occurs. “Actual” is where you will indicate the parameter to look at and “Expected” is what the outcome of this parameter you want to compare it to for this condition to apply. 

**Here is a basic example to better illustrate:** Usually when a wallet mints an NFT it will mint it in that same wallet and the transaction should read something like “zfreddyy.eth has minted a Zapper NFT”. In this case, the “Expected” scenario is that the “Transfer to” address is the same as the “From” address. 

In some cases, the contract also allows you to mint and send the NFT to a different wallet address in the same transaction. In this case, we want this to appear on the readable event card to be something like “zfreddyy.eth has minted a Zapper NFT and sent it to 0xmarc.eth”. For this to happen we need to create a conditional scenario when the “Transfer to” address is not the “From” address. 

![conditional2](https://github.com/Zapper-fi/protocol/assets/169290434/fe768c5a-7ee2-4406-ae9f-67d49a798bb3)

**Important note**, as you can see at the bottom of the screenshot above, you could have more than one condition for a single event. Some events could require multiple cases to cover all possible outcomes from a method. 
