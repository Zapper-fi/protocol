---
sidebar_position: 1
sidebar_label: Getting Started
pagination_label: Getting Started
---
# App Tokens Interpreters Guide

## Components of an app token interpreter

:::note
This guide assumes that you have already created an App Token. If you haven't, please read the overview of [App Tokens](/docs/Interpretation/app-token-interpretation/overview).
:::

This guide will walk you through building an App Token Interpreter. An App Token Interpreter is the ruleset that Zapper uses to interpret the value of an App Token for any user's balance.

There are 3 key components of an App Token Interpreter:

1. **Token Address**: The address of the token the interpreter interprets. This could be 1 token address you input or a list of token addresses fetched from a contract factory.
2. **Underlying token address**: The address of the token that the user deposited into the investment.
    - This could be 1 token address you input, or sourced from a method called on the token contract.
    - There could also be multiple underlying tokens, such as the case for a pool token, which often has 2 underlying tokens, or a vault, which can have `n` underlying tokens.
3. **Price Per Share**: The price per share of the token. This informs how much the App Token is worth in terms of the underlying token.
    - Sometimes, its simple, where 1 App Token is redeemable for 1 underlying token (such as with Aave's aUSDC, where 1 aUSDC = 1 USDC).
    - This calculation could also be more complex, such as with Yearn's yCRV, where the price per share is calculated based on the underlying tokens in the vault.

:::warning
Note that a user's balance is assumed to be based on a `balanceOf` method on the token contract. If the token contract does not have a `balanceOf` method, or the balance returned from that method is not the correct way to fetch a user's balance of the App Token holding, then it is not an ERC20 token and cannot be interpreted with an App Token Interpreter.
:::

## App token interpreter walkthrough

### 1. Create a new app token interpreter

You can get started by navigating to your [Dashboard page](https://www.zapper.xyz/dashboard) and clicking the "Add Balance" button. This will open a modal where you can select the App Token Interpreter option.

!["Add Balance" button](/img/assets/add_balance_button.png)

### 2. Input the token address

Input the token address of the App Token you want to interpret. This guide will start with a single token address, but you can also input a list of token addresses fetched from a contract factory (see the [App Token Interpreter Factory Guide](/docs/Interpretation/app-token-interpretation/factory_guide) for more information).

- A good token to practice with, that is being used in this guide, is the Compound's cUSDC token. The token address is `0x39AA39c021dfbaE8faC545936693aC917d5E7563` on Ethereum mainnet.

#### 2.1 Interpretting multiple app tokens from a contract factory

You can interpret many app tokens at once, if they are all created from the same contract factory and call the same methods to build their balances. This can be extremely helpful, so you don't have to create an interpreter for each App Token.

:::tip
Many protocols leverage contract factories to create their new token contracts, such as Yearn, SushiSwap, and Uniswap. If you are interpreting tokens from one of these protocols, you can likely interpret multiple tokens at once. Usually, if an app token was created by a factory, it will have a `factory` method that returns the address of the factory that created it.
:::

To interpret a contract factory, tap the toggle labelled "Advanced Mode" in the top right of the interpreter page.

Next, input the contract factory address in the input box. This will fetch a list of logs that were emitted by the factory contract that contain an address value in them. You can then select the method that returns the app token address from the logs each time a new token is created.

To confirm that you chose the correct log, you should see multiple app tokens in the previewed token price section on the right hand side. Once this is confirmed as correct, you can go ahead with the rest of the steps as normal to complete the interpreter.

    <figure>
    ![Logs for a Uniswap V2 factory contract](/img/assets/contract_factory_mode.png)
    <figcaption>Selecting the token pair log on a [Uniswap V2 contract factory](https://etherscan.io/address/0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f).</figcaption>
    </figure>

### 3. Select the chain for the app token

Select the chain that the token is on. This will help Zapper fetch the token's metadata and balance information.
