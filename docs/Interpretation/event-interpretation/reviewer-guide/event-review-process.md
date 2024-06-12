---
sidebar_position: 3
---

# Review Process

## Page Overview

On the left side of the review page, you will find the event information submitted by the interpreter. You can modify, add, or remove any information. Click the pen icon to edit an element and the X icon to delete an element. Modify action verbs by deleting the text and entering a new one.

![Edit-type](/img/assets/ReviewStep.png)

On the right side, you will find a preview feed to confirm if the event has been correctly interpreted for all events. Scroll down to see 12 different events with the same method to ensure accuracy.

![Preview](/img/assets/preview2.png)

### Resources for Reviewing

- The contract address
- The Zapper transaction card
- The chain explorer

:::tip
Get a full picture of the event before approving or rejecting. Follow the right steps outlined in the next section.
:::

## Decision Making and Checklist

To ensure quality across all interpretations, validate key elements of the EI before approving it.

> **Note**: Validate even if the preview feed indicates all events are returning a result.

| Question | Action if YES | Action if NO | Tips |
|----------|----------------|--------------|------|
| 1. Has the transaction already been interpreted? | Reject the submission and add a reason. | Go to question 2. | Open the transaction on Zapper to see if it’s labeled as did something. |
| 2. Is the verb or description used to describe the initial action accurate? | Go to question 3. | 1. Adjust the verb and description to make it accurate or to standardize it. See - [Event Description](/docs/Interpretation/event-interpretation/guide/action-verb)<br/> 2. Go to question 3. | Open the explorer to see more details on the transaction.<br/> The method name can also be a good indicator. |
| 3. Did the user submit the correct item type? | Go to question 4. | 1. Select the correct item type<br/> 2. Go to question 4. | You might also have to add an item to make the event even more complete. |
| 4. Is the item type as accurate and inclusive as it can be? | Go to question 5. | 1. Select the correct item type<br/> 2. Go to question 5. | Example: Selecting a token contract for an ERC20 transaction will return a result, but won’t display the inflow or outflow amount. Change the item type for a token transfer to be more accurate. |
| 5. Does the preview return a value for all 12 previewed transactions? | Go to question 6. | 1. Investigate the transactions with missing information. i.e. open explorer<br/> 2. You might have to select a more inclusive item type. Go back to question 4.<br/> 3. If you find that you have to create a conditional event, create a new case and confirm the new preview before moving to question 6. | Failed transactions will be displayed as incomplete previews.<br/> If all the incomplete transactions in the preview are failed ones, carry on to question 6. |
| 6. Did the user submit an app? | Go to question 7. | Go to question 8. | |
| 7. Are you able to confirm that the submitted app is the correct one? | Go to question 9. | 1. Set the app as None<br/> 2. **Hit save and Approve** | Open the contract in the explorer to find the name of the protocol.<br/> The deployer of the contract can also give you a good idea.<br/> You can alternatively search on Github, Google, or Twitter with the contract address. |
| 8. Are you able to find the app yourself? | Go to question 9. | 1. Set the app as None<br/> 2. **Hit save and Approve** | Open the contract in the explorer to find the name of the protocol.<br/> The deployer of the contract can also give you a good idea.<br/> You can alternatively search on Github, Google, or Twitter with the contract address. |
| 9. Is the app available in the dropdown? | 1. Select the app from the dropdown<br/> 2. **Hit save and Approve** | 1. Set the app as None<br/> 2. **Hit save and Approve** | |

### Approving an Event

If the event interpretation is accurate, complete, and consistent, it is ready for approval. Go to the bottom of the review page and press “Save and Approve”.

This will confirm the event interpretation and apply it to all similar events.

:::note
After hitting the “Save and Approve” button, the event status changes from Pending to Enabled.
:::

![approved](/img/assets/approved2.gif)

### Rejecting an Event

Some events may need to be rejected for various reasons:
- The event has already been interpreted (duplicate)
- The event needs more details to be complete, and these details couldn't be found through research
- Duplicate submissions from the same user
- Spam submissions lacking substantive information

:::note
After hitting the “Reject” button and selecting a reason, the event status changes from Pending to Rejected.
:::

![rejected](/img/assets/rejected.gif)
