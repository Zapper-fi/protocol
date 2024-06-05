---
sidebar_position: 3
---

# Event Interpretation mechanics
More often than not, it is super simple to interpret an event! There are 3 different areas to fill in the info for an uninterpreted transaction (and you don’t need to fill in all of them if its not needed)
The areas are:
1. The initial action verb
2. Item type(s) involved
3. The app that this transaction took place through

![image](https://github.com/Zapper-fi/protocol/assets/169290434/cb44b8f1-534e-4f44-bd09-9878a37ec036)

Together, these three elements will help us have a standardized format for events which will always come down to something resembling: This **(1)** happened, with these **(2)** items, on that **(3)** app. As shown in the example below. 

![image](https://github.com/Zapper-fi/protocol/assets/169290434/d089b9bd-1e3a-4e40-a8cd-9dcc189865b0)


## 1. The initial verb​

This is generally going to be the verb describing the action taken by the account that initiated this transaction. Common verbs for onchain transactions are deposited, minted, swapped, claimed, borrowed, bridges etc. However, these can get more complex if needed, such as Bought a Powershart Pack, Toggled nesting, or Bought a raffle ticket. The main goal is to accurately describe what action was taken in the transaction. We are also aiming to have standards across interpretations, therefore if you hesitate on which word best describes the event, reach out to fellow interpreters and curators on our [Discord channel](https://zapper.xyz/discord) or [Telegram group](https://t.me/+mAVxPRsA7bE3ZDkx). 

## 2. Item types

This is a drop-down menu where you can provide the details of what happened in the transaction. Currently you can choose from 9 different types of item to include in your interpretation. Some events may not require to include any items, while others may have more than one to give an accurate description of the event. 
(image)

Here are the options currently available with additional information and examples for each of them. 
- **Token transfers** include any tokens (ERC20 or NFT) entering or leaving a wallet. You can choose to point the transfer to the “from” account (i.e. the initiator of the transaction) or the “to” account (generally the contract the user interacted with). 
Optionally you can add some filters to point to a specific standard, ERC20 or NFT.
The majority of onchain transactions will include a token transfer.
Here is an example of a transaction with a token transfer outflow and inflow.

(image)

- **ERC20 Token** similarly to the NFT collection, is used to reference a token that did not enter or left the wallet. Eg: A user can approve a token to be transferred without funds moving in that same transaction.
  
(image)

- **Accounts** are used to reference any wallet involved in the transaction, including intermediaries beyond the “to” and “from” accounts. These accounts could be externally owned accounts (e.g. manually-controlled wallets by humans), multi-sigs or any smart contracts. Could be displayed as a full alphanumeric wallet address or could be aliased as an ENS, as shown in the example below.
  
(image)

- **NFT** is used to point to a specific NFT when it’s not moving in or out of the wallet. To reference the NFT, you will need the NFT collection address and the token ID data to be available in the transaction data.
  
(image)

- **Network** is referring to a network ID available in the transaction. Zap Protocol has a mapping of network ID to network name. This will mostly be used in bridging transactions where we want to reference a destination chain.
  
(image)

- **String** refers to any text you would like to surface in an event. In the example below, we can surface the comment made on a vote.
  
(image)

- **Number** will be used to reference a number. It could be seen in different situations, eg: User has voted on X number of proposals.
  
(image)

- **Duration** will be used to refer to a time period. Could be used in situations where a user locked some funds for a certain period of time or registered an ENS for X months.
  
(image)

Source Scale is what the contract uses as duration and Target Scale is how you want to display it. For example the ENS contract sets the registrations in minutes, but it’s more convenient to display it in months. In that case the source is Minutes and the target is Months.

(image)

### Additional notes on Item types
Note that you do not need to use every filter listed in the type drop-down menu if it is not needed to describe the transaction. You could actually totally ignore using any of these in the description if it doesn’t add value! 

For example, filtering on the token transfer standard here is optional. If you want to point to any tokens (ERC20 or NFTs) entering or leaving an account, you don’t have to select anything under standard.

(image)

### Transaction fields
**“From” address** - the address the transaction originated by; labeled as “from” on the scanner websites. Looks like this: 0x24CA3B4Be3E9Bd11870B5E065bB367cc1708f06C; could be aliased as an ENS (0xmarc.eth). 

**“To” address** - the address the user is initiating the transaction with; this is always a smart contract, and we assume it is “owned” by an app of some sort, as the app deployed the smart contract. Usually not an ENS.

### Method Parameters
**Method Parameters** refers to the data available in the input data fields of the transaction. On the Event interpretation it will only give you the input that matches the selected type. 
In the example below, we selected account as the type, we are only seeing the [0] option, cause it’s the only one with an address. [0] refers to the first field in the method bracket, [1] to the second field, [2] to the third, and so on.

(image)

To see all the input parameter data, you can open the transaction on the chain explorer. 

(image)

Select Decode Input Data to see the output in a readable way.

(image)

### Log Parameters

Section under construction... 

## 3. App

### The app that this transaction took place through​
This is a free-form input + drop-down menu, where all apps that Zap Protocol has in its system are listed. If the transaction you are describing is associated with an onchain app, please select it from the list.

(image)

If you do not see the correct app in the list, please do type in the name yourself, and it will be added to the list shortly after.

Note that you do not need to associate the transaction with an app if no app was involved or if you don’t know for sure what app the transaction happened on; if there is no app, just select the "no app" toggle. For example, if the transaction is just a user minting an NFT from an NFT collection, initiated directly from the NFT collection’s smart contract, and didn’t take place through OpenSea or some frontend, then there is no app to associate it with.
