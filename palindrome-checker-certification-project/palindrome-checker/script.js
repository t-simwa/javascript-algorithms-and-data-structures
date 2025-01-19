// Selects the HTML element with the ID 'text-input' and stores it in a constant.
// This element will serve as the input field where the user types their text to check for palindromes.
const userInput = document.getElementById('text-input');

// Selects the HTML element with the ID 'check-btn' and stores it in a constant.
// This element represents the button that triggers the palindrome check when clicked.
const checkPalindromeBtn = document.getElementById('check-btn');

// Selects the HTML element with the ID 'result' and stores it in a constant.
// This will serve as the container where the result message is dynamically displayed after checking.
const resultDiv = document.getElementById('result');

// Declares a function named `checkForPalindrome` that takes one parameter `input`.
// This function checks if the provided input string is a palindrome and updates the UI with the result.
const checkForPalindrome = input => {
    // Stores the original input string in a constant called `originalInput`.
    // This is to ensure the original user input is preserved for use in the result message.
    const originalInput = input;

    // Checks if the input is an empty string.
    // If true, it displays an alert prompting the user to enter a value and exits the function.
    if (input === '') {
        alert('Please input a value');
        return; // Ends the function execution if the input is empty.
    }

    // Clears any existing child elements of the resultDiv to ensure a clean slate for displaying the new result.
    resultDiv.replaceChildren();

    // Removes all non-alphanumeric characters from the input string using a regular expression,
    // converts the string to lowercase, and stores it in a constant named `lowerCaseStr`.
    // This prepares the string for palindrome checking by normalizing it.
    const lowerCaseStr = input.replace(/[^A-Za-z0-9]/gi, '').toLowerCase();

    // Creates a result message string using a template literal.
    // If the normalized string is equal to its reversed version, it states that the input "is a palindrome".
    // Otherwise, it states that the input "is not a palindrome".
    let resultMsg = `${originalInput} ${lowerCaseStr === [...lowerCaseStr].reverse().join('') ? 'is' : 'is not'
        } a palindrome.`;

    // Creates a new `<p>` element and assigns it to a constant named `pTag`.
    const pTag = document.createElement('p');

    // Sets the class name of the newly created `<p>` element to 'user-input'.
    // This applies specific styles defined in the CSS to this element.
    pTag.className = 'user-input';

    // Sets the inner text of the `<p>` element to the result message generated earlier.
    pTag.innerText = resultMsg;

    // Appends the `<p>` element as a child of the `resultDiv`, displaying the result message in the UI.
    resultDiv.appendChild(pTag);

    // Removes the 'hidden' class from `resultDiv` to make it visible in the UI.
    resultDiv.classList.remove('hidden');
};

// Adds an event listener to the `checkPalindromeBtn` element that listens for 'click' events.
// When the button is clicked, the following actions are triggered:
checkPalindromeBtn.addEventListener('click', () => {
    // Calls the `checkForPalindrome` function with the value of the `userInput` field as an argument.
    checkForPalindrome(userInput.value);

    // Clears the value of the `userInput` field to reset it for the next input.
    userInput.value = '';
});

// Adds an event listener to the `userInput` element that listens for 'keydown' events.
// This enables functionality when the user presses a key while focused on the input field.
userInput.addEventListener('keydown', e => {
    // Checks if the key pressed is the 'Enter' key.
    if (e.key === 'Enter') {
        // Calls the `checkForPalindrome` function with the value of the `userInput` field as an argument.
        checkForPalindrome(userInput.value);

        // Clears the value of the `userInput` field to reset it for the next input.
        userInput.value = '';
    }
});
