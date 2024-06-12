---
sidebar_position: 4
# sidebar_label: Price Per Share and ATI Submission
# pagination_label: App Tokens Interpreters Guide
---
# Price Per Share and ATI Submission

## 5. Calculate the price per share

Input the price per share of the token. This informs how much the App Token is worth in terms of the underlying token.

### Simple

If the token is redeemable 1-for-1 for its underlying token, you can input the number `1`.

### Math formulas

If the token requires a calculation and values from methods called on a contract, you should build that calculation in the input field.

- For example, the price-per-share of Compound's cUSDC token is calculated by calling the `exchangeRateStored` method on the cUSDC contract, which returns the price per share in terms of the underlying token (USDC).
- You then need to adjust this value to be in terms of the underlying token's decimals, which is 6 for USDC, and you add 10 to the decimal.

The calculation would look like this:

    ```js
    @exchangeRateStored(CErc20) / 10 ^ (@decimals(FiatTokenV2_2) + 10)
    ```

Note that the `CErc20` and `FiatTokenV2_2` are the contract names of the **cUSDC** and USDC tokens, respectively, as we needed to get the decimals of the underlying token to adjust the price per share.

:::tip
If you are unsure of the method to call on the App Token's contract to get the price per share, you can refer to the token owner's app documentation site, as they will often explain how to calculate the value of their tokens. If you are still unsure, you can ask in the Zapper Discord for help and we can help you figure it out.
:::

### 5.1 Calculating price per share for multiple underlying tokens

If the App Token has multiple underlying tokens, you can calculate the price per share for each underlying token and sum them together.

Each underlying token will have its own price per share calculation. Input the calcuation for the price-per-share of that token in the box.

For example, on a Uniswap V2 pool token contract, you would calculate the price per share of each underlying token and sum them together. The calculation would look like this:

For `token0`:

    ```js
    @_reserve0(UniswapV2Pair) / @totalSupply(UniswapV2Pair)
    ```

For `token1`:

    ```js
    @_reserve1(UniswapV2Pair) / @totalSupply(UniswapV2Pair)
    ```

The interpreter will then sum these together to get the total price per share of the pool token.

## 6. Check the previewed value of the App Token

After inputting the token address, underlying token address, and price per share, you can check the previewed value of the App Token. This will show you the value of the App Token in fiat, such as USD, as well as the value of the underlying token(s) in fiat. This will help you confirm that the App Token Interpreter is working as expected.
    - If you're unsure if you got the App Token's pricing right, consider checking the token owner's app site, as they will often list the values of their tokens.
    - Additionally, if the token trades on a DEX, you can check the price of the token on [DEXScreener](https://dexscreener.com/) or something similar.

## 7. Associate the App Token interpreter with an app

Once your interpreter is working as expected, you can optionally associate the interpreter with an app. You should select the app that owns the token's contract and deploy it onchain. This will allow Zapper to show the App Token's balance to users in our UI, along with any other positions the user has on that app.
    - To see the list of apps available to associate the interpreter with, start typing in the "Select App" input box to search Zapper's database for the relevant app.
    - If you cannot find the right app to associate the interpreter with, you can type in that app's name and we will add it to our database and associate this interpreter with the app.

## 8. Submit the App Token interpreter

Once you've inputted all of the above, go ahead and submit the interpreter. This will place the interpreter into a `Pending` state in your [My Submissions page](https://zapper.xyz/my-submissions).

After submission, Zapper Admins will review the interpreter to ensure it is working as expected.
    - If the interpreter is good to go, it will be approved by the Zapper team, and you will receive a notification in your notification tray (in the top right of the page).
    - If there are any issues, Zapper will reject your interpreter and provide commentary on what the issue was. You can then make the necessary changes and resubmit the interpreter for review again.
    - Once your interpreter is approved, you will see it reflected on the [Leaderboard](https://zapper.xyz/curate/leaderboard), and users will be able to see their balance of the App Token in the Zapper UI. Additionally, you'll be able to see the number of users who have the App Token in their wallet in your [My Submissions page](ttps://zapper.xyz/my-submissions), so you can see the impact you have across all Zapper users!
