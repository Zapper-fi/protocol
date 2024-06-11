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

![image](/img/assets/mechanics2.png)


## 1. The initial verb​

The verb describes the action taken by the account that initiated the transaction. Common verbs include deposited, minted, swapped, claimed, borrowed, and bridged. However, these can get more complex if needed, such as Bought a Powershart Pack, Toggled nesting, or Bought a raffle ticket. The main goal is to accurately describe what action was taken in the transaction.

We are aiming to have standards across interpretations, therefore if you hesitate on which word best describes the event, reach out to fellow interpreters and curators on our [Discord channel](https://zapper.xyz/discord) or [Telegram group](https://t.me/+mAVxPRsA7bE3ZDkx). 

## 2. Item types

Use the drop-down menu to detail what happened in the transaction. There are nine item types to choose from. Some events may not require to include any items, while others may have more than one to give an accurate description of the event. 
![image](/img/assets/mechanics3.png)
- **Token transfers:** Any tokens (ERC20 or NFT) entering or leaving a wallet. You can specify the transfer to the “from” account or the “to” account. Filters for ERC20 or NFT can be added. Here is an example of a transaction with a token transfer outflow and inflow:
![image](/img/assets/Swap.png)
- **NFT Collection:** Will be used to reference a collection address available in the transaction data. The best example is when you approve a collection to be transacted on a marketplace. See example below. 
![image](/img/assets/ApproveNFT) 
- **ERC20 Token:** References a token that did not move. For example, a user can approve a token to be transferred without funds moving.
![image](/img/assets/ApproveToken)
- **Accounts:** References any wallet involved in the transaction, including intermediaries. Can be displayed as a full address or aliased as an ENS.
![image](/img/assets/SendToken.png)
- **NFT:** Points to a specific NFT not moving in or out of the wallet. Requires the NFT collection address and token ID data.
![image](/img/assets/SingleNFT.png)
- **Network:** Refers to a network ID in the transaction, useful for bridging transactions to reference a destination chain.
![image](/img/assets/Network.png)
- **String:** Surfaces any text in an event, such as a comment made on a vote.
![image](/img/assets/String.png)
- **Number:** References a number, such as the number of proposals a user voted on.
![image](/img/assets/Number.png)
- **Duration:** Refers to a time period, like locking funds for a certain period. The source scale is the contract's duration, and the target scale is how you want to display it (e.g., minutes to months).
![image](/img/assets/Duration.png)

![image](/img/assets/mechanics12.png)

:::note 

You don’t need to use every filter if it's not needed to describe the transaction. For example, filtering on the token transfer standard is optional.

:::

![image](/img/assets/mechanics14.png)

### Transaction fields
**“From” address** - the address the transaction originated by; labeled as “from” on the scanner websites. Looks like this: 0x24CA3B4Be3E9Bd11870B5E065bB367cc1708f06C; could be aliased as an ENS (0xmarc.eth). 

**“To” address** - the address the user is initiating the transaction with; this is always a smart contract, and we assume it is “owned” by an app of some sort, as the app deployed the smart contract. Usually not an ENS.

### Method Parameters
Refers to data in the transaction’s input fields. Only input matching the selected type is shown. To see all input parameter data, open the transaction on the chain explorer and select Decode Input Data.
In the example below, we selected account as the type, we are only seeing the [0] option, cause it’s the only one with an address. [0] refers to the first field in the method bracket, [1] to the second field, [2] to the third, and so on.

![image](/img/assets/mechanics15.png)

To see all the input parameter data, you can open the transaction on the chain explorer. 

Select Decode Input Data to see the output in a readable way.

![image](/img/assets/mechanics16.png)

### Log Parameters

Section under construction... 

## 3. App

Use the free-form input and drop-down menu to list the app associated with the transaction. If the correct app isn't listed, type it in, and it will be added soon. If no app was involved, select the "no app" toggle.

![image](/img/assets/mechanics17.png)

If you do not see the correct app in the list, please do type in the name yourself, and it will be added to the list shortly after.

:::note 

Note that you do not need to associate the transaction with an app if no app was involved or if you don’t know for sure what app the transaction happened on; if there is no app, just select the "no app" toggle. 

:::

For example, if the transaction is just a user minting an NFT from an NFT collection, initiated directly from the NFT collection’s smart contract, and didn’t take place through OpenSea or some frontend, then there is no app to associate it with.
