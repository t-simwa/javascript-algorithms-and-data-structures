// Selects the HTML element with the ID 'user-input' and stores it in a constant.
// This represents the input field where the user will type their phone number.
const userInput = document.getElementById('user-input');

// Selects the HTML element with the ID 'check-btn' and stores it in a constant.
// This button will trigger the phone number validation when clicked.
const checkBtn = document.getElementById('check-btn');

// Selects the HTML element with the ID 'clear-btn' and stores it in a constant.
// This button will clear all the validation results displayed on the page when clicked.
const clearBtn = document.getElementById('clear-btn');

// Selects the HTML element with the ID 'results-div' and stores it in a constant.
// This is the container where validation results (valid/invalid phone numbers) will be displayed.
const resultsDiv = document.getElementById('results-div');

// Defines a function named 'checkValidNumber' that takes one argument, 'input'.
// This function is responsible for validating the phone number provided by the user.
const checkValidNumber = input => {
    // Checks if the input is an empty string.
    // If true, it alerts the user to provide a phone number and exits the function early.
    if (input === '') {
        alert('Please provide a phone number');
        return; // Exits the function without executing further code.
    }

    // Defines a regular expression pattern for a valid US phone number.
    // 'countryCode' allows an optional '1' at the start of the number, with or without a space.
    const countryCode = '^(1\\s?)?';

    // 'areaCode' matches either a 3-digit number enclosed in parentheses (e.g., (123))
    // or a 3-digit number without parentheses (e.g., 123).
    const areaCode = '(\\([0-9]{3}\\)|[0-9]{3})';

    // 'spacesDashes' matches an optional space or dash between parts of the number.
    const spacesDashes = '[\\s\\-]?';

    // 'phoneNumber' matches a sequence of 3 digits, an optional space or dash, 
    // followed by 4 digits (e.g., 456-7890 or 456 7890).
    const phoneNumber = '[0-9]{3}[\\s\\-]?[0-9]{4}$';

    // Combines the above parts into a single regular expression using template literals.
    // This regular expression checks for the structure of a valid US phone number.
    const phoneRegex = new RegExp(
        `${countryCode}${areaCode}${spacesDashes}${phoneNumber}`
    );

    // Creates a new paragraph element (p) to display the result of the validation.
    const pTag = document.createElement('p');

    // Sets the class name of the newly created paragraph element to 'results-text'.
    // This allows for consistent styling of the validation results.
    pTag.className = 'results-text';

    // Tests the input against the regular expression to determine if it matches.
    // If the input is valid, the text color of the paragraph is set to green (#00471b).
    // If the input is invalid, the text color is set to brown (#4d3800).
    phoneRegex.test(input)
        ? (pTag.style.color = '#00471b') // Valid number color.
        : (pTag.style.color = '#4d3800'); // Invalid number color.

    // Creates a text node containing a message indicating whether the number is valid or invalid.
    // The message also includes the user's input for clarity.
    pTag.appendChild(
        document.createTextNode(
            `${phoneRegex.test(input) ? 'Valid' : 'Invalid'} US number: ${input}`
        )
    );

    // Appends the paragraph element containing the result message to the 'resultsDiv'.
    // This displays the validation result on the webpage.
    resultsDiv.appendChild(pTag);
};

// Adds an event listener to the 'checkBtn' element that listens for a 'click' event.
// When the button is clicked, the 'checkValidNumber' function is called with the value
// of the 'userInput' field as its argument. The input field is then cleared.
checkBtn.addEventListener('click', () => {
    checkValidNumber(userInput.value); // Calls the validation function with the user's input.
    userInput.value = ''; // Clears the input field after validation.
});

// Adds an event listener to the 'userInput' element that listens for a 'keydown' event.
// If the user presses the 'Enter' key, the 'checkValidNumber' function is called with
// the current value of the input field. The input field is then cleared.
userInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        checkValidNumber(userInput.value); // Validates the input when 'Enter' is pressed.
        userInput.value = ''; // Clears the input field after validation.
    }
});

// Adds an event listener to the 'clearBtn' element that listens for a 'click' event.
// When the button is clicked, the text content of the 'resultsDiv' is cleared,
// removing all displayed validation results from the page.
clearBtn.addEventListener('click', () => {
    resultsDiv.textContent = ''; // Clears all content inside the results container.
});
