// Object that maps arithmetic operators to their corresponding functions
const infixToFunction = {
    "+": (x, y) => x + y, // Addition: returns the sum of x and y
    "-": (x, y) => x - y, // Subtraction: returns the difference between x and y
    "*": (x, y) => x * y, // Multiplication: returns the product of x and y
    "/": (x, y) => x / y, // Division: returns the result of x divided by y
};

// Function to evaluate an infix expression (e.g., 3 + 5) based on a regex pattern
const infixEval = (str, regex) =>
    str.replace(
        regex, // Regex pattern used to identify the infix expression
        (_match, arg1, operator, arg2) =>
            infixToFunction[operator]( // Uses the operator from the expression to fetch the appropriate function
                parseFloat(arg1), // Parses the first argument as a floating-point number
                parseFloat(arg2)  // Parses the second argument as a floating-point number
            )
    );

// Function to evaluate high-precedence operations (*, /) recursively
const highPrecedence = str => {
    const regex = /([\d.]+)([*\/])([\d.]+)/; // Regex pattern to match multiplication or division
    const str2 = infixEval(str, regex); // Evaluates the high-precedence operations in the string
    return str === str2 // Checks if the string has changed after evaluation
        ? str // If no changes occurred, return the original string
        : highPrecedence(str2); // Otherwise, recursively evaluate the modified string
};

// Function to check if a number is even
const isEven = num =>
    num % 2 === 0; // Returns true if the number is divisible by 2, false otherwise

// Function to calculate the sum of an array of numbers
const sum = nums =>
    nums.reduce((acc, el) => acc + el, 0); // Uses reduce to accumulate the sum of all numbers in the array

// Function to calculate the average of an array of numbers
const average = nums =>
    sum(nums) / nums.length; // Divides the sum of the numbers by the array's length

// Function to calculate the median of an array of numbers
const median = nums => {
    const sorted = nums.slice().sort((a, b) => a - b); // Creates a sorted copy of the array in ascending order
    const length = sorted.length; // Gets the total number of elements in the array
    const middle = length / 2 - 1; // Finds the index of the middle element(s)
    return isEven(length) // Checks if the array length is even
        ? average([sorted[middle], sorted[middle + 1]]) // If even, calculate the average of the two middle elements
        : sorted[Math.ceil(middle)]; // If odd, return the single middle element
};

// Object containing various spreadsheet utility functions
const spreadsheetFunctions = {
    sum, // References the `sum` function for adding numbers
    average, // References the `average` function for calculating averages
    median, // References the `median` function for finding the median
    even: nums => nums.filter(isEven), // Filters the array to include only even numbers
    someeven: nums => nums.some(isEven), // Checks if at least one number in the array is even
    everyeven: nums => nums.every(isEven), // Checks if all numbers in the array are even
    firsttwo: nums => nums.slice(0, 2), // Returns the first two numbers in the array
    lasttwo: nums => nums.slice(-2), // Returns the last two numbers in the array
    has2: nums => nums.includes(2), // Checks if the number 2 is present in the array
    increment: nums => nums.map(num => num + 1), // Adds 1 to each number in the array
    random: ([x, y]) => Math.floor(Math.random() * y + x), // Generates a random integer between x and y
    range: nums => range(...nums), // Calls the `range` function with arguments spread from the array
    nodupes: nums => [...new Set(nums).values()], // Removes duplicate values from the array
    "": nums => nums, // Returns the array as-is when no function is specified
};

// Function to apply spreadsheet functions or evaluate arithmetic expressions
const applyFunction = str => {
    const noHigh = highPrecedence(str); // First evaluates any high-precedence operations (*, /)
    const infix = /([\d.]+)([+-])([\d.]+)/; // Regex pattern to match addition or subtraction
    const str2 = infixEval(noHigh, infix); // Evaluates addition and subtraction operations
    const functionCall = /([a-z0-9]*)\(([0-9., ]*)\)(?!.*\()/i; // Matches function calls (e.g., `sum(1,2)`)
    const toNumberList = args => args.split(",").map(parseFloat); // Converts arguments from a comma-separated string to an array of numbers
    const apply = (fn, args) => spreadsheetFunctions[fn.toLowerCase()](toNumberList(args));
    // Executes the function if it exists in `spreadsheetFunctions`
    return str2.replace(
        functionCall,
        (match, fn, args) =>
            spreadsheetFunctions.hasOwnProperty(fn.toLowerCase()) // Checks if the function is defined
                ? apply(fn, args) // Applies the function with the parsed arguments
                : match // Returns the original string if no matching function is found
    );
};

// Function to generate an array of numbers between start and end (inclusive)
const range = (start, end) =>
    Array(end - start + 1) // Creates an array with a length equal to the range size
        .fill(start) // Fills the array with the starting number
        .map((element, index) => element + index); // Adjusts each element to form the range

// Function to generate an array of characters between two character codes
const charRange = (start, end) =>
    range(start.charCodeAt(0), end.charCodeAt(0)) // Converts characters to their ASCII codes and generates a range
        .map(code => String.fromCharCode(code)); // Converts ASCII codes back to characters

// Function to evaluate a formula within a cell
const evalFormula = (x, cells) => {
    const idToText = id => cells.find(cell => cell.id === id).value; // Finds and returns the value of a cell by its ID
    const rangeRegex = /([A-J])([1-9][0-9]?):([A-J])([1-9][0-9]?)/gi; // Matches cell ranges (e.g., A1:C3)
    const rangeFromString = (num1, num2) => range(parseInt(num1), parseInt(num2)); // Converts a range string to an array of numbers
    const elemValue = num => character => idToText(character + num); // Retrieves a cell value based on its row and column
    const addCharacters = character1 => character2 => num =>
        charRange(character1, character2).map(elemValue(num)); // Maps a range of characters and numbers to their values
    const rangeExpanded = x.replace(rangeRegex, (_match, char1, num1, char2, num2) =>
        rangeFromString(num1, num2).map(addCharacters(char1)(char2))
    ); // Replaces ranges with their corresponding values
    const cellRegex = /[A-J][1-9][0-9]?/gi; // Matches individual cell references (e.g., A1)
    const cellExpanded = rangeExpanded.replace(cellRegex, match => idToText(match.toUpperCase())); // Replaces cell IDs with their values
    const functionExpanded = applyFunction(cellExpanded); // Applies any functions in the formula
    return functionExpanded === x ? functionExpanded : evalFormula(functionExpanded, cells); // Recursively evaluates the formula
};

// Event handler for when the window finishes loading
window.onload = () => {
    const container = document.getElementById("container"); // Gets the container element for the spreadsheet
    const createLabel = name => {
        const label = document.createElement("div"); // Creates a new div element for a label
        label.className = "label"; // Sets the class of the label for styling
        label.textContent = name; // Sets the label's text content
        container.appendChild(label); // Adds the label to the container
    };
    const letters = charRange("A", "J"); // Generates column headers (A through J)
    letters.forEach(createLabel); // Creates a label for each column
    range(1, 99).forEach(number => {
        createLabel(number); // Creates a label for each row number
        letters.forEach(letter => {
            const input = document.createElement("input"); // Creates an input field for each cell
            input.type = "text"; // Sets the input type to text
            input.id = letter + number; // Assigns a unique ID to the cell
            input.ariaLabel = letter + number; // Sets an accessible label for the cell
            input.onchange = update; // Adds an event listener for the onchange event
            container.appendChild(input); // Adds the input field to the container
        });
    });
};

// Function to handle cell updates
const update = event => {
    const element = event.target; // Gets the element that triggered the event
    const value = element.value.replace(/\s/g, ""); // Removes all whitespace from the value
    if (!value.includes(element.id) && value.startsWith("=")) {
        // Ensures the value does not reference itself and starts with "="
        element.value = evalFormula(value.slice(1), Array.from(document.getElementById("container").children)); // Evaluates the formula and updates the cell value
    }
};
