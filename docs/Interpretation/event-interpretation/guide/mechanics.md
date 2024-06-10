---
sidebar_position: 2
---

# Interpretation mechanics
Interpreting an event is simple! There are three areas to fill for an uninterpreted transaction (and not all need to be filled if unnecessary):

1. Initial action verb
2. Item type(s) involved
3. The app through which the transaction occured

![image](/img/assets/mechanics1.png)

Together, these elements create a standardized format: This **(1)** happened, with these **(2)** items, on that **(3)** app. As shown in the example below. 

![image](https://github.com/Zapper-fi/protocol/assets/169290434/d089b9bd-1e3a-4e40-a8cd-9dcc189865b0)


## 1. The initial verb​

The verb describes the action taken by the account that initiated the transaction. Common verbs include deposited, minted, swapped, claimed, borrowed, and bridged. However, these can get more complex if needed, such as Bought a Powershart Pack, Toggled nesting, or Bought a raffle ticket. The main goal is to accurately describe what action was taken in the transaction. We are also aiming to have standards across interpretations, therefore if you hesitate on which word best describes the event, reach out to fellow interpreters and curators on our [Discord channel](https://zapper.xyz/discord) or [Telegram group](https://t.me/+mAVxPRsA7bE3ZDkx). 

## 2. Item types

Use the drop-down menu to detail what happened in the transaction. There are nine item types to choose from. Some events may not require to include any items, while others may have more than one to give an accurate description of the event. 
(image)

- **Token transfers:** Any tokens (ERC20 or NFT) entering or leaving a wallet. You can specify the transfer to the “from” account or the “to” account. Filters for ERC20 or NFT can be added. Here is an example of a transaction with a token transfer outflow and inflow:

(image)

- **ERC20 Token:** References a token that did not move. For example, a user can approve a token to be transferred without funds moving.
  
(image)

- **Accounts:** References any wallet involved in the transaction, including intermediaries. Can be displayed as a full address or aliased as an ENS.
  
(image)

- **NFT:** Points to a specific NFT not moving in or out of the wallet. Requires the NFT collection address and token ID data.
  
(image)

- **Network:** Refers to a network ID in the transaction, useful for bridging transactions to reference a destination chain.
  
(image)

- **String:** Surfaces any text in an event, such as a comment made on a vote.
  
(image)

- **Number:** References a number, such as the number of proposals a user voted on.
  
(image)

- **Duration:** Refers to a time period, like locking funds for a certain period. The source scale is the contract's duration, and the target scale is how you want to display it (e.g., minutes to months).
(image)

(image)

:::note 

You don’t need to use every filter if it's not needed to describe the transaction. For example, filtering on the token transfer standard is optional.

:::

(image)

### Transaction fields
**“From” address** - the address the transaction originated by; labeled as “from” on the scanner websites. Looks like this: 0x24CA3B4Be3E9Bd11870B5E065bB367cc1708f06C; could be aliased as an ENS (0xmarc.eth). 

**“To” address** - the address the user is initiating the transaction with; this is always a smart contract, and we assume it is “owned” by an app of some sort, as the app deployed the smart contract. Usually not an ENS.

### Method Parameters
Refers to data in the transaction’s input fields. Only input matching the selected type is shown. To see all input parameter data, open the transaction on the chain explorer and select Decode Input Data.
In the example below, we selected account as the type, we are only seeing the [0] option, cause it’s the only one with an address. [0] refers to the first field in the method bracket, [1] to the second field, [2] to the third, and so on.

(image)

To see all the input parameter data, you can open the transaction on the chain explorer. 

(image)

Select Decode Input Data to see the output in a readable way.

(image)

### Log Parameters

Section under construction... 

## 3. App

Use the free-form input and drop-down menu to list the app associated with the transaction. If the correct app isn't listed, type it in, and it will be added soon. If no app was involved, select the "no app" toggle.

(image)

If you do not see the correct app in the list, please do type in the name yourself, and it will be added to the list shortly after.

:::note 

Note that you do not need to associate the transaction with an app if no app was involved or if you don’t know for sure what app the transaction happened on; if there is no app, just select the "no app" toggle. 

:::

For example, if the transaction is just a user minting an NFT from an NFT collection, initiated directly from the NFT collection’s smart contract, and didn’t take place through OpenSea or some frontend, then there is no app to associate it with.
