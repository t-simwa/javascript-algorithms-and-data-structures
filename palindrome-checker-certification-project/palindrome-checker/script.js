// SECTION: VARIABLE DECLARATIONS
// Selects the HTML element with the ID 'text-input' and stores it in a constant variable named `userInput`.
// This element is an input field where the user will type the text they want to check for palindromes.
const userInput = document.getElementById('text-input');
/* This line retrieves from the DOM (Document Object Model) the input element that has an ID of 'text-input', crucial for capturing user typed text.
   The 'document.getElementById' method returns the first element that matches the provided ID. */

// Selects the HTML element with the ID 'check-btn' and stores it in a constant variable named `checkPalindromeBtn`.
// This element is a button that the user will click to trigger the palindrome check process.
const checkPalindromeBtn = document.getElementById('check-btn');
/* Here we get a button from the DOM with an ID of 'check-btn'. This button will be used to run the validation logic once clicked. */

// Selects the HTML element with the ID 'result' and stores it in a constant variable named `resultDiv`.
// This element is a container where the result of the palindrome check will be displayed to the user.
const resultDiv = document.getElementById('result');
/* This line accesses the DOM to fetch an element with an ID of 'result'. We'll use this container to display messages to the user about whether the input is a palindrome or not. */

// SECTION: MAIN FUNCTION
// Declares a function named `checkForPalindrome` that takes one parameter named `input`.
// This function is responsible for checking if the provided input string is a palindrome and updating the UI with the result.
const checkForPalindrome = input => {
    /* The arrow function syntax is used here. 'input' is the text that the user typed. We'll process it in multiple steps
       to determine if it's a palindrome and then show the result. */

    // Stores the original input string in a constant variable named `originalInput`.
    // This is done to preserve the original user input for use in the result message, even after processing.
    const originalInput = input;
    /* We save the user-provided input to 'originalInput' so we can display the exact text without modifications
       when constructing the final result message. */

    // Checks if the input string is an empty string.
    // If the input is empty, it displays an alert message prompting the user to enter a value and then exits the function.
    if (input === '') {
        alert('Please input a value'); // Displays an alert box with the message 'Please input a value'.
        return; // Ends the function execution if the input is empty, preventing further processing.
    }
    /* The empty string check ensures users do not attempt to check for a palindrome without providing any text.
       If they try, we show them a prompt and stop the rest of the code from running. */

    // Clears any existing child elements of the `resultDiv` element to ensure a clean slate for displaying the new result.
    // This is done to remove any previous results before displaying the current result.
    resultDiv.replaceChildren();
    /* 'replaceChildren()' removes all existing children inside 'resultDiv', so each new check starts with an empty
       result container. It avoids having multiple results piling up in the interface. */

    // Removes all non-alphanumeric characters from the input string using a regular expression,
    // converts the string to lowercase, and stores it in a constant variable named `lowerCaseStr`.
    // This prepares the string for palindrome checking by normalizing it, making it case-insensitive and ignoring special characters.
    const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();
    /* The regular expression /[^A-Za-z0-9]/gi matches any character that is not a letter or digit. 
       The 'g' flag means global (replace all occurrences), and 'i' makes it case-insensitive. 
       We then chain '.toLowerCase()' to ensure we compare everything in lowercase. 
       This step is crucial for accurately checking palindromes in a variety of inputs. */

    // Creates a result message string using a template literal.
    // The message states that the original input "is a palindrome" if the normalized string is equal to its reversed version.
    // Otherwise, it states that the input "is not a palindrome".
    let resultMsg = `${originalInput} ${lowerCaseStr === [...lowerCaseStr].reverse().join('') ? 'is' : 'is not'} a palindrome.`;
    /* Here, we check for palindrome by comparing 'lowerCaseStr' with its reversed self. 
       '[...lowerCaseStr]' spreads each character into an array, then we reverse that array and join it back into a string
       for comparison. If they're the same, it's a palindrome. 
       We use a template literal to insert our logic into the message. */

    // SECTION: UI UPDATE
    // Creates a new `<p>` element and assigns it to a constant variable named `pTag`.
    // This element will be used to display the result message in the UI.
    const pTag = document.createElement('p');
    /* Each time we check a palindrome, we create a new paragraph element to be placed inside 'resultDiv'. 
       We'll display the message to the user within this newly created element. */

    // Sets the class name of the newly created `<p>` element to 'user-input'.
    // This applies specific styles defined in the CSS to this element, ensuring consistent styling.
    pTag.className = 'user-input';
    /* By applying the class 'user-input' we can style this paragraph in a specific way using CSS, 
       ensuring uniform presentation across multiple results if needed. */

    // Sets the inner text of the `<p>` element to the result message generated earlier.
    // This populates the `<p>` element with the message indicating whether the input is a palindrome.
    pTag.innerText = resultMsg;
    /* We place our final result message into this paragraph. 
       The user sees if their input was a palindrome or not, with the exact words typed. */

    // Appends the `<p>` element as a child of the `resultDiv` element, displaying the result message in the UI.
    // This makes the result visible to the user by adding the `<p>` element to the result container.
    resultDiv.appendChild(pTag);
    /* Now we attach the new paragraph into the container, effectively rendering the result text in the browser. */

    // Removes the 'hidden' class from the `resultDiv` element to make it visible in the UI.
    // This ensures that the result container is displayed, allowing the user to see the result message.
    resultDiv.classList.remove('hidden');
    /* If the container was initially hidden, removing this class ensures that the result is now shown. 
       This helps control visibility of the result area. */
};

// SECTION: EVENT LISTENERS
// Adds an event listener to the `checkPalindromeBtn` element that listens for 'click' events.
// When the button is clicked, the following actions are triggered:
checkPalindromeBtn.addEventListener('click', () => {
    /* The 'addEventListener' method starts listening for a 'click' event on the button with ID 'check-btn'. 
       When triggered, the callback function is executed. */

    // Calls the `checkForPalindrome` function with the value of the `userInput` field as an argument.
    // This initiates the palindrome check process using the text entered by the user.
    checkForPalindrome(userInput.value);
    /* We pass the current value from the user input box to the 'checkForPalindrome' function, 
       initiating the check. */

    // Clears the value of the `userInput` field to reset it for the next input.
    // This prepares the input field for new text entry by the user.
    userInput.value = '';
    /* Once the check is done, we clear the input field so it's ready for fresh input next time. */
});

// Adds an event listener to the `userInput` element that listens for 'keydown' events.
// This enables functionality when the user presses a key while focused on the input field.
userInput.addEventListener('keydown', e => {
    /* We attach another event listener to the input box itself, focusing on any key press ('keydown') events. 
       The event object 'e' captures details about the key that was pressed. */

    // Checks if the key pressed is the 'Enter' key.
    // If the 'Enter' key is pressed, the following actions are triggered:
    if (e.key === 'Enter') {
        /* This line checks the 'e.key' property to see if it matches 'Enter'. 
           If so, we know the user just hit the enter key to confirm input. */

        // Calls the `checkForPalindrome` function with the value of the `userInput` field as an argument.
        // This initiates the palindrome check process using the text entered by the user.
        checkForPalindrome(userInput.value);
        /* Similar to the click event, we pass the current value from the input box to the palindrome checker 
           so the user doesn't have to click the button. It's an alternative user flow. */

        // Clears the value of the `userInput` field to reset it for the next input.
        // This prepares the input field for new text entry by the user.
        userInput.value = '';
        /* After pressing Enter, we also clear the input field to allow the user to quickly type another word or phrase. */
    }
});