---
sidebar_position: 2
---

# Getting Started

## Where to start!

For a lot of transactions, it can be a bit tricky to understand exactly what the purpose of a transaction was, if you are not the one that executed it. 

The best place to start is by searching or connecting your wallet on [Zapper](https://zapper.xyz/) and looking at the activity feed timeline. Start by interpreting any transactions that are rendered as "did something" in the activity tab. 

However, if you're feeling adventurous, you can source popular, uninterpreted transactions from the [Zapper Curate](https://zapper.xyz/curate/events) page.
Another good strategy is to find an app that you know well and that has some associated “did something” transactions. You can interpret multiple transactions from that same app. It helps when you understand how the app works. 

For more details see Tips on how to investigate an Event for interpretation section.

## Event Interpretation mechanics

More often than not, it is super simple to interpret an event! There are 3 different areas to fill in the info for an uninterpreted transaction (and you don’t need to fill in all of them if its not needed)
The areas are:
1. The initial action verb
2. Item type(s) involved
3. The app that this transaction took place through

![logo](static/img/assets/logo.svg)

Together, these three elements will help us have a standardized format for events which will always come down to something resembling: This **(1)** happened, with these **(2)** items, on that **(3)** app. As shown in the example below. 

(image)

### 1. The initial verb​

This is generally going to be the verb describing the action taken by the account that initiated this transaction. Common verbs for onchain transactions are deposited, minted, swapped, claimed, borrowed, bridges etc. However, these can get more complex if needed, such as Bought a Powershart Pack, Toggled nesting, or Bought a raffle ticket. The main goal is to accurately describe what action was taken in the transaction. We are also aiming to have standards across interpretations, therefore if you hesitate on which word best describes the event, reach out to fellow interpreters and curators on our [Discord channel](https://zapper.xyz/discord) or [Telegram group](https://t.me/+mAVxPRsA7bE3ZDkx). 

### 2. Item types

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

#### Additional notes on Item types
Note that you do not need to use every filter listed in the type drop-down menu if it is not needed to describe the transaction. You could actually totally ignore using any of these in the description if it doesn’t add value! 

For example, filtering on the token transfer standard here is optional. If you want to point to any tokens (ERC20 or NFTs) entering or leaving an account, you don’t have to select anything under standard.

(image)

#### Transaction fields
**“From” address** - the address the transaction originated by; labeled as “from” on the scanner websites. Looks like this: 0x24CA3B4Be3E9Bd11870B5E065bB367cc1708f06C; could be aliased as an ENS (0xmarc.eth). 

**“To” address** - the address the user is initiating the transaction with; this is always a smart contract, and we assume it is “owned” by an app of some sort, as the app deployed the smart contract. Usually not an ENS.

#### Method Parameters
**Method Parameters** refers to the data available in the input data fields of the transaction. On the Event interpretation it will only give you the input that matches the selected type. 
In the example below, we selected account as the type, we are only seeing the [0] option, cause it’s the only one with an address. [0] refers to the first field in the method bracket, [1] to the second field, [2] to the third, and so on.

(image)

To see all the input parameter data, you can open the transaction on the chain explorer. 

(image)

Select Decode Input Data to see the output in a readable way.

(image)

#### Log Parameters

Section under construction... 

### 3. App

#### The app that this transaction took place through​
This is a free-form input + drop-down menu, where all apps that Zap Protocol has in its system are listed. If the transaction you are describing is associated with an onchain app, please select it from the list.

(image)

If you do not see the correct app in the list, please do type in the name yourself, and it will be added to the list shortly after.

Note that you do not need to associate the transaction with an app if no app was involved or if you don’t know for sure what app the transaction happened on; if there is no app, just select the "no app" toggle. For example, if the transaction is just a user minting an NFT from an NFT collection, initiated directly from the NFT collection’s smart contract, and didn’t take place through OpenSea or some frontend, then there is no app to associate it with.

## Preview Feed Section
When interpreting your transaction, you will see the right side of your screen be updated automatically as you input new information about the transaction. This is a great tool to determine if you have interpreted all the transactions correctly or not. 

In the screenshot below, you can see that two transactions were not interpreted correctly, therefore the fields were not filled in with the right info, or maybe some details are missing. 

(image)

This can happen if you are too specific in your interpretation or if the contract method does more than one action. In the later case you can submit a conditional event by adding a case to the interpretation, see the next section for more details. 

Important! Note that failed transactions can also appear in the preview, when this happens, you don’t have to worry about the preview shown and can just ignore that transaction card. To confirm, simply click on the transaction and look on Zapper or on the explorer to confirm it is indeed a failed transaction. 


## Conditional Events

On your interpretation adventure, you might stumble upon some events that are a bit more complex. Some transactions with the same method might lead to different interpretations. For example, a transaction might have different outcomes depending on specific values. In those situations, you will need to indicate what happens under each condition to interpret all events correctly. 

Note: If this is your first event interpretation, we would recommend starting with a more simple transaction, and keep a conditional for when you are more comfortable with the tool. 

To create a conditional, simply click “Add Case” to open a new section. 

(image)

You will then be able to add the specifics of the transaction. If you are familiar with coding, this works really similarly to an “if” function. In the sense that you are presenting how to interpret the event when (if) this situation occurs. “Actual” is where you will indicate the parameter to look at and “Expected” is what the outcome of this parameter you want to compare it to for this condition to apply. 

**Here is a basic example to better illustrate:** Usually when a wallet mints an NFT it will mint it in that same wallet and the transaction should read something like “zfreddyy.eth has minted a Zapper NFT”. In this case, the “Expected” scenario is that the “Transfer to” address is the same as the “From” address. 

In some cases, the contract also allows you to mint and send the NFT to a different wallet address in the same transaction. In this case, we want this to appear on the readable event card to be something like “zfreddyy.eth has minted a Zapper NFT and sent it to 0xmarc.eth”. For this to happen we need to create a conditional scenario when the “Transfer to” address is not the “From” address. 

(image)

Additional information, as you can see at the bottom of the screenshot above, you could have more than one condition for a single event. 

## Tips on how to investigate an event

### 1. Look at the method name

The method name is usually helpful in pointing you towards what action is taken. If the method name is deposit, its likely the user sent tokens away and deposited them in an app. HOWEVER, methods can also be misleading, so do not blindly trust them! Most smart contracts are forks of other contracts, where the devs copy the contract, and tweak it for their needs, but do not update the method names. This can lead to situations where a withdraw function is really a claim function, or a deposit is really locked funds for 2 years.

Looking for a method name? Your best reflex is to look up your transaction on the chain explorer. At the bottom of the page you should see the option “Show more details” If you click on it, more information about the transaction will appear. In the “Input Data” section you will find the method name, as well as the parameters of this specific transaction. 

(image) 

Zap Protocol’s's goal is to accurately and clearly describe the blockchain, so please be aware of this in your submissions!

### 2. Look at the logs

Event logs contain important information about a transaction. They are used for purposes like tracking token transfers, decentralized exchange activity, and more, enabling efficient onchain communication and interaction. 

You can find the logs by clicking on the “Logs” tab when looking at a transaction on the explorer. Looking at the logs can provide additional context and specifics about a transaction and therefore help you interpreting correctly an event. 

(image)

*Tip! 💡 The first log of the transaction is often used to describe the transaction itself.* 

### 3. Look at the input methods

See the example below, where the interpreter was able to point out exactly the number of the proposal that had been executed in a transaction, instead of just giving a generic “Executed a proposal” answer.  

(image)

This was possible thanks to the input data of the transaction. See what shows on the explorer: 

(image)

Without the interpreter going the extra mile and pointing out the proposal id, we would've had a generic “Executed a proposal” and therefore missed out on important information for this transaction. 

### 4. Find the app related to the transaction/contract

It often helps to look up what app a contract in a transaction is associated with. If you find that the contract relates to Aave, its a good chance the methods relating to supplying and withdrawing funds from a lending protocol. The best way to find out what app an contract belongs to is to Google the TO address.

(image)

If that fails, another good way to investigate what app owns a contract is to search it on Github, and look if it is in an app's Github repository (or o\if another app has added it and labeled it in their repo). [Example search query:](https://github.com/search?q=0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367&type=code)

(image)

If you think you need additional context to interpret the event with precision, you can always refer to the explorer. You can easily access the transaction’s explorer page in the top right corner of the page. 

(image)

## Submission Process

Once you’ve written your event interpretation, go ahead and submit it! Once you click submit, your event interpretation is sent for review to the ReviewerZapper team and some community members with a reviewer role. Here’s how the review process works:
- We are generally reviewing to make sure the verbiage makes sense (e.g. is in the past tense) and is consistent. We may tweak the words submitted to align it with other event interpreters on the site or add details that were not available to you.
- If there is a new app that needs to be created to associate this event with, we’ll go ahead and add it.
- If the submission is all good to go, we will approve it, and your event interpreter will be deployed for all users to consume!
- If the submission has some issues, it may be rejected with a rejection reason. Common rejection reasons are if the submission is a duplicate of another submission that was pending or if the action was too vague to understand.
  
Note that you can monitor the status of your submissions and see rejection reasons in your [My Submissions](https://www.zapper.xyz/my-submissions) page.

(image)

## Event Interpretation examples

For those who prefer a visual preview to better understand the process of interpreting events, we put together some videos of different types of events you might encounter.

**Overview of the interface:**
[Jasper Video 1]

**Example of a String extraction case:**
[Jasper Video 2]

**Example of an Address extraction case:**
[Jasper Video 3]

## Events that cannot be interpreted at this time:

- Multi-sig transactions - we are working on interpreting these events at-scale
- Proxy contract transactions, like transactions interacting with Maker’s DSProxy contracts. We’re also working on interpreting these at scale, but they are weird

If you have any questions about event interpretation or a specific case you are currently working on, please join our [Discord](https://www.zapper.xyz/discord) where Zap Protocol team members and our growing community of experienced event interpreters will be happy to help you out! Simply join us in the #event-interpreters channel.

Thank you for helping us make the blockchain readable! 
