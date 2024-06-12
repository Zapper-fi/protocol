---
sidebar_position: 2
sidebar_label: Underlying Tokens
pagination_label: Underlying Tokens
---
# Defining Underlying Tokens

## 4. Input the underlying token address

Input the address of the underlying token. This could be 1 token address you input, or sourced from a method called on the token contract. If you want to call a method on the App Token's contract to get the underlying token address, type `@` to see the available methods. Note that only methods resulting in an output of type `address` are displayed in the menu, as only an address can be an underlying token.

    - In the case where you have multiple underlying tokens, you can:
       1. paste them directly into the input box and call multiple methods on the App Token's contract (such as `@token0` and `@token1`) or
       2. select a method that returns a list of addresses (such as `@underlyingTokens`, which may return an array of the underlying addresses)

![Example of the "@" menu for selecting an underlying token](/img/assets/at_menu.png)

:::tip
If you want to call a method on a contract different from the App Token's contract, you can do so via the "+ Add" button in the method input modal.
:::

### Input multiple underlying tokens

It is common for some types of App Tokens to have multiple underlying tokens, such as liquidity pool tokens (often have a pair of tokens) or vault tokens (often have 4 or 5 underlying tokens).

You can input multiple underlying tokens by pasting them directly into the input box.

If there are multiple methods to call for each underlying token, you can do those in the input box.

![Example of multiple underlying tokens on a pool token contract](/img/assets/uni-v2-multi-underlying-tokens.png)

In the above example, the `@token0` and `@token1` methods are called on the Uni V2 LP token contract to get the underlying tokens.

Lastly, you can also call a method that returns a list of addresses, such as `@underlyingTokens`, which may return an array of the underlying addresses.
