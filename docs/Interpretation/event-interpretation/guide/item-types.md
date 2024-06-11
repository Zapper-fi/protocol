---
sidebar_position: 4
---

# Item types

Use the drop-down menu to detail what happened in the transaction. There are nine item types to choose from. Some events may not require to include any items, while others may have more than one to give an accurate description of the event. 

| **Type**            | **Description**                                                                                                                                                                  | **Example**                            |
|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| **Token transfers** | Any tokens (ERC20 or NFT) entering or leaving a wallet. You can specify the transfer to the “from” account or the “to” account. Filters for ERC20 or NFT can be added.           | ![image](/img/assets/Swap.png)         |
| **NFT Collection**  | References a collection address available in the transaction data. Example: approving a collection to be transacted on a marketplace.                                            | ![image](/img/assets/ApproveNFT.png)   |
| **ERC20 Token**     | References a token that did not move. Example: approving a token to be transferred without funds moving.                                                                         | ![image](/img/assets/ApproveToken.png) |
| **Accounts**        | References any wallet involved in the transaction, including intermediaries. Can be displayed as a full address or aliased as an ENS.                                             | ![image](/img/assets/SendToken.png)    |
| **NFT**             | Points to a specific NFT not moving in or out of the wallet. Requires the NFT collection address and token ID data.                                                              | ![image](/img/assets/SingleNFT.png)    |
| **Network**         | Refers to a network ID in the transaction, useful for bridging transactions to reference a destination chain.                                                                     | ![image](/img/assets/Network.png)      |
| **String**          | Surfaces any text in an event, such as a comment made on a vote.                                                                                                                 | ![image](/img/assets/String.png)       |
| **Number**          | References a number, such as the number of proposals a user voted on.                                                                                                            | ![image](/img/assets/Number.png)       |
| **Duration**        | Refers to a time period, like locking funds for a certain period. The source scale is the contract's duration, and the target scale is how you want to display it (e.g., minutes to months). | ![image](/img/assets/Duration.png)     |

:::note 

You don’t need to use every filter if it's not needed to describe the transaction. For example, filtering on the token transfer standard is optional.

:::

## Data Sources

When interpreting an event, you will pull data from different sources. To excel in your Scout Explorer role, it is best to understand each of these data sources, where to find them and how they can be used in an interpretation. 

Here are the three data source you will use most frequently. 

### Transaction fields
**“From” address** - the address the transaction originated by; labeled as “from” on the scanner websites. Looks like this: 0x24CA3B4Be3E9Bd11870B5E065bB367cc1708f06C; could be aliased as an ENS (0xmarc.eth). 

**“To” address** - the address the user is initiating the transaction with; this is always a smart contract, and we assume it is “owned” by an app of some sort, as the app deployed the smart contract. Usually not an ENS.

### Method Parameters

Refers to data in the transaction’s input fields. Only input matching the selected type is shown. To see all input parameter data, open the transaction on the chain explorer and select Decode Input Data.
In the example below, we selected account as the type, we are only seeing the [0] option, cause it’s the only one with an address. [0] refers to the first field in the method bracket, [1] to the second field, [2] to the third, and so on.

To see all the input parameter data, you can open the transaction on the chain explorer. 

Select Decode Input Data to see the output in a readable way.

![image](/img/assets/mechanics16.png)

### Log Parameters

You also have the possibility of extracting data directly from the logs. This can come in useful when the method parameter does not offer the level of detail you want to surface in the event. 

To access all the log parameter data, you can open the transaction on the chain explorer. Select the Logs(X) option at the top menu and you will access the logs. 

When selecting “Log Parameter” as the data you want to pull from in the Interpretation form, you will have a drop down menu with all available logs. You need to choose the one that better represents the information you want to extract. Eg: Selecting “Account” if you want to point to a wallet address. 

