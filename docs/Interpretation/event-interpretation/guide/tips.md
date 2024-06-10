---
sidebar_position: 3
---

# Helpful Tips

## 1. Look at the method name

The method name often indicates the action taken. For example, "deposit" usually means the user sent tokens to an app. However, method names can be misleading due to contract forks where names are not updated. Always verify by looking up the transaction on a chain explorer. In the “Input Data” section, you'll find the method name and parameters.

(image) 

Zap Protocol aims to clearly describe the blockchain, so ensure your submissions are accurate!

## 2. Look at the logs

Event logs provide important transaction details, such as tracking token transfers and decentralized exchange activity. On the explorer, click the “Logs” tab for additional context. The first log often describes the transaction itself.

(image)

*Tip! 💡 The first log of the transaction is often used to describe the transaction itself.* 

## 3. Look at the input methods

Input data can provide specific details, such as the proposal number in a transaction. Without this detail, we might miss important information.

Example: Instead of a generic “Executed a proposal,” the input data shows the exact proposal number.

(image)

This was possible thanks to the input data of the transaction. See what shows on the explorer: 

(image)

## 4. Find the app related to the transaction/contract

Identify the app associated with a contract by searching the “TO” address on Google. This can reveal the app owning the contract, providing context for the transaction.

(image)

If that fails, another good way to investigate what app owns a contract is to search it on Github, and look if it is in an app's Github repository. 

[Example search query:](https://github.com/search?q=0x6774Bcbd5ceCeF1336b5300fb5186a12DDD8b367&type=code)

(image)

If additional context is needed, refer to the transaction’s explorer page, accessible from the top right corner of the interpretation page.

(image)
