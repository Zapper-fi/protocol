---
sidebar_position: 5
---

# Rule Types

When interpreting an event, you will pull data from different sources. To excel in your Scout Explorer role, it is best to understand each of these data sources, where to find them and how they can be used in an interpretation.

Here are the three data source you will use most frequently.

## Transaction Fields

**“From” address** - the address the transaction originated by; labeled as “from” on the scanner websites. Looks like this: 0x24CA3B4Be3E9Bd11870B5E065bB367cc1708f06C; could be aliased as an ENS (0xmarc.eth).

**“To” address** - the address the user is initiating the transaction with; this is always a smart contract, and we assume it is “owned” by an app of some sort, as the app deployed the smart contract. Usually not an ENS.

:::tip

Here is a [video example](/docs/interpretation/learning-center#event-interpretation) of how to extract an account address

:::

---

## Method Parameters

Refers to data in the transaction’s input fields. When selecting this option on Zapper Protocol, only input matching the selected type is shown. To see all input parameter data, open the transaction on the chain explorer and select Decode Input Data, this will allow you to see the data in a readable way.

:::tip

Input data can provide specific details, such as the proposal number in a transaction, or the value of token transfered, as shown below.

:::

```

Function: transfer(address to,uint256 value)

MethodID: 0xa9059cbb
[0]:  0000000000000000000000005b5ecfc8122ba166b21d6ea26268ef97e09b2e9f
[1]:  000000000000000000000000000000000000000000000000000000007a308480

```

| #   | Name  | Type    | Data                                       |
| --- | ----- | ------- | ------------------------------------------ |
| 0   | to    | address | 0x5B5ECfc8122bA166b21d6Ea26268Ef97e09B2E9F |
| 1   | value | uint256 | 2050000000                                 |

---

## Log Parameters

You also have the possibility of extracting data directly from the logs. This can come in useful when the method parameter does not offer the level of detail you want to surface in the event.

To access all the log parameter data, you can open the transaction on the chain explorer. Select the Logs(X) option at the top menu and you will access the logs.

When selecting “Log Parameter” as the data you want to pull from in the Interpretation form, you will have a drop down menu with all available logs. You need to choose the one that better represents the information you want to extract. Eg: Selecting “Account” if you want to point to a wallet address.

:::tip

Event logs provide important transaction details, such as tracking token transfers and decentralized exchange activity. The first log of the transaction is often used to describe the transaction itself.

:::
