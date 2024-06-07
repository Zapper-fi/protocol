---
sidebar_position: 2
---
# Canonical Description Terms

The following table includes a list of most popular actions taken onchain. As a reviewer, you should try to adapt the verbs submitted by the users to one of the actions in that list. 

:::note
Some of the actions won’t be covered by the standard verbs provided here. That’s totally fine, this table is only providing guidelines to be consistent when possible.
:::

:::caution
Having consistency across all similar transactions is super important. Whenever in doubt, you can ask a second opinion from other reviewers.
:::

| Action verb | Description | General event description | Typical flows and variables included in the description |
|-------------|-------------|--------------------------|-------------------------------------------------------|
| Unpooled    | Removing tokens from a liquidity pool in a decentralized exchange (like Uniswap, Aerodrome) | Unpooled $1 | $1 = all token inflow to the “from” address |
| Pooled      | Adding tokens to a liquidity pool on a decentralized exchange | Pooled $1 | $1 = all token outflow from the “from” address |
| Deposited   | Adding a token balance to an app, usually to earn yield | Deposited $1 | $1 = all token outflow from the “from” address |
| Withdrew    | Removing a token balance that has been deposited into an app. Usually used to earn yield. | Withdrew $1 | $1 = all token inflow to the “from” address |
| Claimed     | Collecting rewards that have accrued to the user, but without actually removing the tokens that gave them the rewards (e.g. the user keeps their funds deposited on Aerodrome to keep earning yield, but claims their reward tokens) | Claimed $1 | $1 = all token inflow to the “from” address |
| Swapped     | User swaps 1 token for another token, sending 1 out and receiving 1 back | Swapped $1 for $2 | $1 = all token outflow to “From” address $2 = all token inflow to “from” address |
| Bridged     | Sending funds to a different chain | Bridged $1 to $2 | $1 = token outflows $2 = “network” ID |
| Bought/Sold | Bought/Sold NFT(s) | Bought $1 Sold $1 | $1 = Token transfer outflow or inflow, depending if it was bought or sold |
| Staked      | Locked some funds on a platform | Staked $1 | $1 = token outflows |
| Unstaked    | Removed some funds from a platform | Unstaked $1 | $1 = token inflows |
| Voted       | Exercising governance rights. Often seen in DAOs apps. | Voted on proposal ID $1 | $1 = proposal ID, Number from input or log parameter |
| Played, attacked, rolled, bet, etc. | Used in gaming. Played game/Bet on something/attacked a player/etc. | Played with $1 Attacked $1 | $1 = actor that is being interacted with |
| NONE        | Weird administrative tasks like “Validated transaction proofs”; “submitted report”; “Posted price feed onchain” | Validated transaction proofs Submitted onchain prices etc. | |
