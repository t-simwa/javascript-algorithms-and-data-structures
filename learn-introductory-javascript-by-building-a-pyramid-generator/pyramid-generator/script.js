// PYRAMID GENERATOR

// Declares a constant 'character' to represent the symbol used in the pyramid pattern.
const character = "#";

// Declares a constant 'count' to define the total number of rows for the pyramid.
const count = 10;

// Initializes an empty array 'rows' to store each row of the pyramid pattern.
const rows = [];

// Initializes a flag 'inverted' to determine whether the pyramid rows should be arranged in reverse order (false = normal, true = reversed).
let inverted = false;

// Function to create a single padded row for the pyramid pattern
function padRow(rowNumber, rowCount) {
    return (
        // Adds spaces to the left of the pattern for alignment based on the current row number.
        " ".repeat(rowCount - rowNumber) +
        // Creates the row's pyramid pattern by repeating the 'character' for the current row.
        // The number of characters is calculated as 2 * rowNumber - 1 to create an odd number of symbols for each row.
        character.repeat(2 * rowNumber - 1) +
        // Adds spaces to the right of the pattern for symmetry.
        " ".repeat(rowCount - rowNumber)
    );
}

// Loops from 1 to 'count' to construct each row of the pyramid pattern.
for (let i = 1; i <= count; i++) {
    // Checks if the rows should be inverted (i.e., added in reverse order).
    if (inverted) {
        // If inverted is true, adds the current padded row at the beginning of the 'rows' array.
        rows.unshift(padRow(i, count));
    } else {
        // If inverted is false, appends the current padded row to the end of the 'rows' array.
        rows.push(padRow(i, count));
    }
}

/*
while (rows.length < count) { 
    // Adds rows to the 'rows' array until its length matches the value of 'count'.
    rows.push(padRow(rows.length + 1, count)); 
}
*/
// This commented-out code snippet is an alternative approach to ensure the 'rows' array has exactly 'count' rows by continuously adding new rows until the array reaches the desired length.

/*
for (let i = count; i > 0; i--) { 
    // Loops from 'count' to 1, creating rows in reverse order.
    // Appends each row to the 'rows' array, resulting in a reversed pyramid.
    rows.push(padRow(i, count)); 
}
*/
// This commented-out code snippet generates the pyramid in reverse order, starting from the largest row and ending with the smallest.

// Initializes a string 'result' to store the final pyramid pattern, starting with a title header.
let result = "Ted's Pyramid Generator:" + '\n' + '\n';

// Iterates over each row stored in the 'rows' array.
for (const row of rows) {
    // Adds the current row to the 'result' string, followed by a newline character for proper formatting.
    result = result + row + '\n';
}

// Outputs the complete pyramid pattern to the console.
console.log(result);
