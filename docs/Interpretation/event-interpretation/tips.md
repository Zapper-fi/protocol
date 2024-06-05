---
sidebar_position: 4
---

# Tips on How to investigate an event

## 1. Look at the method name

The method name is usually helpful in pointing you towards what action is taken. If the method name is deposit, its likely the user sent tokens away and deposited them in an app. HOWEVER, methods can also be misleading, so do not blindly trust them! Most smart contracts are forks of other contracts, where the devs copy the contract, and tweak it for their needs, but do not update the method names. This can lead to situations where a withdraw function is really a claim function, or a deposit is really locked funds for 2 years.

Looking for a method name? Your best reflex is to look up your transaction on the chain explorer. At the bottom of the page you should see the option “Show more details” If you click on it, more information about the transaction will appear. In the “Input Data” section you will find the method name, as well as the parameters of this specific transaction. 

(image) 

Zap Protocol’s's goal is to accurately and clearly describe the blockchain, so please be aware of this in your submissions!

## 2. Look at the logs

Event logs contain important information about a transaction. They are used for purposes like tracking token transfers, decentralized exchange activity, and more, enabling efficient onchain communication and interaction. 

You can find the logs by clicking on the “Logs” tab when looking at a transaction on the explorer. Looking at the logs can provide additional context and specifics about a transaction and therefore help you interpreting correctly an event. 

(image)

*Tip! 💡 The first log of the transaction is often used to describe the transaction itself.* 

## 3. Look at the input methods

See the example below, where the interpreter was able to point out exactly the number of the proposal that had been executed in a transaction, instead of just giving a generic “Executed a proposal” answer.  

(image)

This was possible thanks to the input data of the transaction. See what shows on the explorer: 

(image)

Without the interpreter going the extra mile and pointing out the proposal id, we would've had a generic “Executed a proposal” and therefore missed out on important information for this transaction. 

## 4. Find the app related to the transaction/contract

It often helps to look up what app a contract in a transaction is associated with. If you find that the contract relates to Aave, its a good chance the methods relating to supplying and withdrawing funds from a lending protocol. The best way to find out what app an contract belongs to is to Google the TO address.

(image)

If that fails, another good way to investigate what app owns a contract is to search it on Github, and look if it is in an app's Github repository (or o\if another app has added it and labeled it in their repo). [Example search query:](https://github.com/search?q=0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367&type=code)

(image)

If you think you need additional context to interpret the event with precision, you can always refer to the explorer. You can easily access the transaction’s explorer page in the top right corner of the page. 

(image)
