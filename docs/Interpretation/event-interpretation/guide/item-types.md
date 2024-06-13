---
sidebar_position: 4
---

# Item Types

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

:::tip 

Watch [this video](/docs/learning-center#event-interpretation) to see an example of an EI using a "String" item to interpret. 

:::

:::note 

You don’t need to use every filter if it's not needed to describe the transaction. For example, filtering on the token transfer standard is optional.

:::

