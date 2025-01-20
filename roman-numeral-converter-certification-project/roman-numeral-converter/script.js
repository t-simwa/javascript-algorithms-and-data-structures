// Selects the HTML element with the ID 'form' and stores it in the constant `form`.
// This element represents the form containing the input and button for conversion.
const form = document.getElementById('form');

// Selects the HTML element with the ID 'convert-btn' and stores it in the constant `convertButton`.
// This button is clicked to initiate the Roman numeral conversion process.
const convertButton = document.getElementById('convert-btn');

// Selects the HTML element with the ID 'output' and stores it in the constant `output`.
// This element will display either the converted Roman numeral or error messages.
const output = document.getElementById('output');

// Declares the function `convertToRoman` that converts a number to its Roman numeral representation.
// The parameter `num` is the integer to be converted.
const convertToRoman = num => {
    // Defines a reference array `ref` where each sub-array contains a Roman numeral and its integer value.
    // The Roman numerals are ordered from largest to smallest for sequential processing.
    const ref = [
        ['M', 1000], // Represents 1000 as 'M'.
        ['CM', 900], // Represents 900 as 'CM' (1000 - 100).
        ['D', 500],  // Represents 500 as 'D'.
        ['CD', 400], // Represents 400 as 'CD' (500 - 100).
        ['C', 100],  // Represents 100 as 'C'.
        ['XC', 90],  // Represents 90 as 'XC' (100 - 10).
        ['L', 50],   // Represents 50 as 'L'.
        ['XL', 40],  // Represents 40 as 'XL' (50 - 10).
        ['X', 10],   // Represents 10 as 'X'.
        ['IX', 9],   // Represents 9 as 'IX' (10 - 1).
        ['V', 5],    // Represents 5 as 'V'.
        ['IV', 4],   // Represents 4 as 'IV' (5 - 1).
        ['I', 1]     // Represents 1 as 'I'.
    ];

    // Initializes an empty array `res` to store the Roman numeral characters as they are calculated.
    const res = [];

    // Iterates through each sub-array in the `ref` array.
    ref.forEach(function (arr) {
        // Continues looping as long as the value of `num` is greater than or equal to the current integer.
        while (num >= arr[1]) {
            // Adds the Roman numeral to the `res` array.
            res.push(arr[0]);

            // Subtracts the integer value of the current Roman numeral from `num`.
            num -= arr[1];
        }
    });

    // Joins all the Roman numeral characters in the `res` array into a single string and returns it.
    return res.join('');
};

// Declares the function `isValid` that checks if the input number is valid for conversion.
// The function takes two parameters: `str` (the string input) and `int` (the parsed integer).
const isValid = (str, int) => {
    // Initializes an empty string `errText` to hold error messages if validation fails.
    let errText = '';

    // Checks if the string is empty or contains invalid characters like 'e' or '.'.
    if (!str || str.match(/[e.]/g)) {
        errText = 'Please enter a valid number.'; // Sets an error message for invalid input.
    }
    // Checks if the number is less than 1, which is below the valid range for Roman numerals.
    else if (int < 1) {
        errText = 'Please enter a number greater than or equal to 1.';
    }
    // Checks if the number is greater than 3999, which exceeds the standard range for Roman numerals.
    else if (int > 3999) {
        errText = 'Please enter a number less than or equal to 3999.';
    }
    else {
        // If no errors are detected, the function returns `true` to indicate valid input.
        return true;
    }

    // Updates the `output` element's text with the error message.
    output.innerText = errText;

    // Adds the 'alert' class to the `output` element to apply error-specific styling.
    output.classList.add('alert');

    // Returns `false` to indicate invalid input.
    return false;
};

// Declares the function `clearOutput` to clear any existing content or styles from the `output` element.
const clearOutput = () => {
    // Clears any text content inside the `output` element.
    output.innerText = '';

    // Removes the 'alert' class from the `output` element to reset its styling.
    output.classList.remove('alert');
};

// Adds an event listener to the `form` element to handle the 'submit' event.
// This prevents the default form submission behavior and triggers the `updateUI` function.
form.addEventListener('submit', e => {
    e.preventDefault(); // Prevents the page from refreshing when the form is submitted.
    updateUI(); // Calls the `updateUI` function to process the input and display the result.
});

// Adds an event listener to the `convertButton` element to handle the 'click' event.
// This triggers the `updateUI` function when the button is clicked.
convertButton.addEventListener('click', () => {
    updateUI(); // Calls the `updateUI` function to process the input and display the result.
});

// Declares the function `updateUI` to handle user input, validate it, and update the output element.
const updateUI = () => {
    // Retrieves the value of the input element with the ID 'number' and stores it in `numStr`.
    const numStr = document.getElementById('number').value;

    // Converts the string `numStr` to an integer using `parseInt` with a base of 10 and stores it in `int`.
    const int = parseInt(numStr, 10);

    // Removes the 'hidden' class from the `output` element to make it visible.
    output.classList.remove('hidden');

    // Clears any existing content or styles from the `output` element.
    clearOutput();

    // Calls the `isValid` function to validate the input.
    if (isValid(numStr, int)) {
        // If the input is valid, calls the `convertToRoman` function and updates the `output` element with the result.
        output.innerText = convertToRoman(int);
    }
};
