---
sidebar_position: 2
sidebar_label: Interpretation Guide
pagination_label: App Tokens Interpreters Guide
---
# App Tokens Interpreters Guide

## Components of an App Token Interpreter

:::note
This guide assumes that you have already created an App Token. If you haven't, please read the overview of [App Tokens](/docs/Interpretation/app-token-interpretation/overview).
:::

This guide will walk you through building an App Token Interpreter. An App Token Interpreter is the ruleset that Zapper uses to interpret the value of an App Token for any user's balance.

There are 3 key components of an App Token Interpreter:

1. **Token Address**: The address of the token the interpreter interprets. This could be 1 token address you input or a list of token addresses fetched from a contract factory.
2. **Underlying token address**: The address of the token the interpreter interprets. This could be 1 token address you input, or sourced from a method called on the token contract. There could also be multiple underlying tokens, such as the case for a pool token, which often has 2 underlying tokens, or a vault, which can have `n` underlying tokens.
3. **Price Per Share**: The price per share of the token. This informs how much the App Token is worth in terms of the underlying token. Sometimes, its simple, where 1 App Token is redeemable for 1 underlying token (such as with Aave's aUSDC, where 1 aUSDC = 1 USDC). This calculation could also be more complex, such as with Yearn's yCRV, where the price per share is calculated based on the underlying tokens in the vault.

:::warning
Note that a user's balance is assumed to be based on a `balanceOf` method on the token contract. If the token contract does not have a `balanceOf` method, or the balance returned from that method is not the correct way to fetch a user's balance of the App Token holding, then it is not an ERC20 token and cannot be interpreted with an App Token Interpreter.
:::

## App Token Interpreter Creation Walkthrough

### 1. Create a new App Token Interpreter

You can get started by navigating to your [Dashboard page](https://www.zapper.xyz/dashboard) and clicking the "Add Balance" button. This will open a modal where you can select the App Token Interpreter option.

!["Add Balance" button](/img/assets/add_balance_button.png)

### 2. Input the Token Address

Input the token address of the App Token you want to interpret. This guide will start with a single token address, but you can also input a list of token addresses fetched from a contract factory (see the [App Token Interpreter Factory Guide](/docs/Interpretation/app-token-interpretation/factory_guide.md) for more information).

A good token to practice with, that is being used in this guide, is the Compound's cUSDC token. The token address is `0x39AA39c021dfbaE8faC545936693aC917d5E7563` on Ethereum mainnet.

### 3. Select the Chain for the App Token

Select the chain that the token is on. This will help Zapper fetch the token's metadata and balance information.

![Example of a token and address inputted](/img/assets/token_address_inputted.png)

### 4. Input the Underlying Token Address

Input the address of the underlying token. This could be 1 token address you input, or sourced from a method called on the token contract. If you want to call a method on the App Token's contract to get the underlying token address, type `@` to see the available methods. Note that only methods resulting in an output of type `address` are displayed in the menu, as only an address can be an underlying token.

    - In the case where you have multiple underlying tokens, you can:
       1. paste them directly into the input box and call multiple methods on the App Token's contract (such as `@token0` and `@token1`) or
       2. select a method that returns a list of addresses (such as `@underlyingTokens`, which may return an array of the underlying addresses)

![Example of the "@" menu for selecting an underlying token](/img/assets/at_menu.png)

:::tip
If you want to call a method on a contract different from the App Token's contract, you can do so via the "+ Add" button in the method input modal.
:::

### 5. Calculate the Price Per Share 

Input the price per share of the token. This informs how much the App Token is worth in terms of the underlying token.

#### Simple 
If the token is redeemable 1-for-1 for its underlying token, you can input the number `1`.

#### Math Formulas 
If the token requires a calculation and values from methods called on a contract, you should build that calculation in the input field. For example, the price-per-share of Compound's cUSDC token is calculated by calling the `exchangeRateStored` method on the cUSDC contract, which returns the price per share in terms of the underlying token (USDC). You then need to adjust this value to be in terms of the underlying token's decimals, which is 6 for USDC, and you add 10 to the decimal. 

The calculation would look like this: 

```js
@exchangeRateStored(CErc20) / 10 ^ (@decimals(FiatTokenV2_2) + 10)
```


Note that the `CErc20` and `FiatTokenV2_2` are the contract names of the <b>cUSDC</b> and USDC tokens, respectively, as we needed to get the decimals of the underlying token to adjust the price per share.

![Inputted calculation for cUSDC](/img/assets/inputted_calculation.png)

:::tip

If you are unsure of the method to call on the App Token's contract to get the price per share, you can refer to the token owner's app documentation site, as they will often explain how to calculate the value of their tokens. If you are still unsure, you can ask in the Zapper Discord for help and we can help you figure it out.

:::

### 6. Check the Previewed Value of the App Token

After inputting the token address, underlying token address, and price per share, you can check the previewed value of the App Token. This will show you the value of the App Token in fiat, such as USD, as well as the value of the underlying token(s) in fiat. This will help you confirm that the App Token Interpreter is working as expected.

    If you're unsure if you got the App Token's pricing right, consider checking the token owner's app site, as they will often list the values of their tokens. Additionally, if the token trades on a DEX, you can check the price of the token on [DEXScreener](https://dexscreener.com/) or something similar.

![App Token preview price for cUSDC](/img/assets/preview_of_price.png)

### 7. Associate the App Token Interpret With an App

Once your interpreter is working as expected, you can optionally associate the interpreter with an app. You should select the app that owns the token's contract and deploy it onchain. This will allow Zapper to show the App Token's balance to users in our UI, along with any other positions the user has on that app.

    To see the list of apps available to associate the interpreter with, start typing in the "Select App" input box to search Zapper's database for the relevant app.

    If you cannot find the right app to associate the interpreter with, you can type in that app's name and we will add it to our database and associate this interpreter with the app.

![Searching the app database for the "Compound" app](/img/assets/app_search_db.png)

### 8. Submit the App Token Interpreter

Once you've inputted all of the above, go ahead and submit the interpreter. This will place the interpreter into a `Pending` state in your [My Submissions page](https://zapper.xyz/my-submissions). After submission, Zapper Admins will review the interpreter to ensure it is working as expected.
    - If the interpreter is good to go, it will be approved by the Zapper team, and you will receive a notification in your notification tray (in the top right of the page).
    - If there are any issues, Zapper will reject your interpreter and provide commentary on what the issue was. You can then make the necessary changes and resubmit the interpreter for review again.
    - Once your interpreter is approved, you will see it reflected on the [Leaderboard](https://zapper.xyz/curate/leaderboard), and users will be able to see their balance of the App Token in the Zapper UI. Additionally, you'll be able to see the number of users who have the App Token in their wallet in your [My Submissions page](ttps://zapper.xyz/my-submissions), so you can see the impact you have across all Zapper users!

<!-- TODO - Add a screenshot of My Submissions page with ATIs -->
<!-- TODO - Add a screenshot of the Leaderboard with ATIs -->
