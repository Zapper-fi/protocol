---
sidebar_position: 3
---

# Event Description

Often, the first element you will add in your interpretation is the verb or text describing what happened. The verb describes the action taken by the account that initiated the transaction. Common verbs include deposited, minted, swapped, claimed, borrowed, and bridged. However, these can get more complex if needed, such as Bought a Powershart Pack, Toggled nesting, or Bought a raffle ticket. The main goal is to accurately describe what action was taken in the transaction.

:::info 

Looking at Method Parameters can be a great way to understand the action in an event. The method name often indicates the action taken. For example, "deposit" usually means the user sent tokens to an app.

::

The table below lists common actions taken onchain. Curators should adapt user-submitted verbs to one of these actions when possible.

:::note

Not all actions will be covered by the standard verbs provided here. This table is a guideline for consistency.

:::

:::caution

Consistency across similar transactions is crucial. When in doubt, seek a second opinion from other community members.

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
| NONE        | Administrative tasks like “Validated transaction proofs”; “submitted report”; “Posted price feed onchain” that do not include an item type | Any text that accurately represents the event etc. | |



