// SECTION: CONSTANT DECLARATIONS

// Declares a constant 'character' to represent the symbol used in the pyramid pattern.
// - The '#' character is chosen as the building block for the pyramid's visual structure.
const character = "#";

// Declares a constant 'count' to define the total number of rows for the pyramid.
// - Specifies the height of the pyramid by determining how many rows it will contain.
const count = 10;

// Initializes an empty array 'rows' to store each row of the pyramid pattern.
// - This array will hold the strings that represent each level of the pyramid.
const rows = [];

// Initializes a flag 'inverted' to determine whether the pyramid rows should be arranged in reverse order.
// - A boolean value where 'false' indicates a normal pyramid and 'true' indicates an inverted pyramid.
let inverted = false;

// SECTION: FUNCTION DEFINITIONS

// Function to create a single padded row for the pyramid pattern.
// - Takes two parameters: 'rowNumber' for the current row index and 'rowCount' for the total number of rows.
function padRow(rowNumber, rowCount) {
    return (
        // Adds spaces to the left of the pattern for alignment based on the current row number.
        // - 'rowCount - rowNumber' calculates the number of spaces needed to center the row.
        " ".repeat(rowCount - rowNumber) +

        // Creates the row's pyramid pattern by repeating the 'character' for the current row.
        // - '2 * rowNumber - 1' calculates the number of characters needed for the current row, ensuring an odd number.
        character.repeat(2 * rowNumber - 1) +

        // Adds spaces to the right of the pattern for symmetry.
        // - Ensures that the row is centered by adding the same number of spaces as on the left.
        " ".repeat(rowCount - rowNumber)
    );
}

// SECTION: LOOP FOR PYRAMID CONSTRUCTION

// Loops from 1 to 'count' to construct each row of the pyramid pattern.
// - Iterates through each row number to build the pyramid from top to bottom.
for (let i = 1; i <= count; i++) {
    // Checks if the rows should be inverted (i.e., added in reverse order).
    // - Determines the order in which rows are added to the 'rows' array.
    if (inverted) {
        // If inverted is true, adds the current padded row at the beginning of the 'rows' array.
        // - Uses 'unshift' to prepend the row, building the pyramid from bottom to top.
        rows.unshift(padRow(i, count));
    } else {
        // If inverted is false, appends the current padded row to the end of the 'rows' array.
        // - Uses 'push' to append the row, building the pyramid from top to bottom.
        rows.push(padRow(i, count));
    }
}

// SECTION: ALTERNATIVE APPROACHES (COMMENTED OUT)

/*
while (rows.length < count) { 
    // Adds rows to the 'rows' array until its length matches the value of 'count'.
    // - Continuously appends new rows to ensure the array reaches the desired length.
    rows.push(padRow(rows.length + 1, count)); 
}
*/
// This commented-out code snippet is an alternative approach to ensure the 'rows' array has exactly 'count' rows by continuously adding new rows until the array reaches the desired length.

/*
for (let i = count; i > 0; i--) { 
    // Loops from 'count' to 1, creating rows in reverse order.
    // - Appends each row to the 'rows' array, resulting in a reversed pyramid.
    rows.push(padRow(i, count)); 
}
*/
// This commented-out code snippet generates the pyramid in reverse order, starting from the largest row and ending with the smallest.

// SECTION: OUTPUT CONSTRUCTION

// Initializes a string 'result' to store the final pyramid pattern, starting with a title header.
// - Begins with a descriptive title to introduce the pyramid pattern.
let result = "Ted's Pyramid Generator:" + '\n' + '\n';

// Iterates over each row stored in the 'rows' array.
// - Concatenates each row to the 'result' string, building the complete pyramid pattern.
for (const row of rows) {
    // Adds the current row to the 'result' string, followed by a newline character for proper formatting.
    // - Ensures each row appears on a new line in the final output.
    result = result + row + '\n';
}

// Outputs the complete pyramid pattern to the console.
// - Displays the constructed pyramid in the console for the user to view.
console.log(result);