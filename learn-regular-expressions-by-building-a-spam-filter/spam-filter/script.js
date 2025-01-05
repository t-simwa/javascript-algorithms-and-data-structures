// Selects the textarea element where the user inputs a message
const messageInput = document.getElementById("message-input");

// Selects the paragraph element where the result of the spam check will be displayed
const result = document.getElementById("result");

// Selects the button element that the user clicks to trigger the spam check
const checkMessageButton = document.getElementById("check-message-btn");

// Regular expression to detect phrases like "please help" or "assist me" (case-insensitive)
const helpRegex = /please help|assist me/i;

// Regular expression to detect mentions of monetary amounts, e.g., "100 dollars" or "million dollars" (case-insensitive)
const dollarRegex = /[0-9]+\s*(?:hundred|thousand|million|billion)?\s+dollars/i;

// Regular expression to detect spam phrases related to "free money" in creative spellings like "fr33 m0ney"
const freeRegex = /(?:^|\s)fr[e3][e3] m[o0]n[e3]y(?:$|\s)/i;

// Regular expression to detect phrases related to stock alerts, e.g., "stock alert" with alternative spellings
const stockRegex = /(?:^|\s)[s5][t7][o0][c{[(]k [a@4]l[e3]r[t7](?:$|\s)/i;

// Regular expression to detect phrases like "dear friend" with variations in spelling
const dearRegex = /(?:^|\s)d[e3][a@4]r fr[i1|][e3]nd(?:$|\s)/i;

// An array of all the regular expressions that define patterns for spam detection
const denyList = [helpRegex, dollarRegex, freeRegex, stockRegex, dearRegex];

// Function to check if a message contains spam
// Uses the `some` method to test if any regex in the denyList matches the given message
const isSpam = (msg) => denyList.some((regex) => regex.test(msg));

// Adds a click event listener to the spam check button
checkMessageButton.addEventListener("click", () => {
    // Checks if the input field is empty and alerts the user if no message is provided
    if (messageInput.value === "") {
        alert("Please enter a message."); // Displays an alert for an empty input
        return; // Exits the function if no input is provided
    }

    // Sets the result text depending on whether the message is identified as spam or not
    result.textContent = isSpam(messageInput.value)
        ? "Oh no! This looks like a spam message." // Message for detected spam
        : "This message does not seem to contain any spam."; // Message for no spam detected

    // Clears the input field after processing the message
    messageInput.value = "";
});

