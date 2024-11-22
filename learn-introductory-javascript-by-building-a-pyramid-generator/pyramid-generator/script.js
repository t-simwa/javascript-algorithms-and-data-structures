// PYRAMID GENERATOR

const character = "#"; // Declares a constant 'character' to represent the symbol used in the pattern.
const count = 8; // Declares a constant 'count' to define the total number of rows for the pattern.
const rows = []; // Initializes an empty array 'rows' to store each row of the pattern.
let inverted = false; // Initializes a flag 'inverted' to determine the direction of row arrangement (false = normal, true = reversed).

// Function to create a padded row for the pattern
function padRow(rowNumber, rowCount) {
    return (
        " ".repeat(rowCount - rowNumber) + // Adds spaces to the left for alignment based on the current row number.
        character.repeat(2 * rowNumber - 1) + // Creates the row's pattern with an increasing number of 'character' symbols.
        " ".repeat(rowCount - rowNumber) // Adds spaces to the right for symmetry.
    );
}

// Loops through numbers from 1 to 'count' to build the pattern
for (let i = 1; i <= count; i++) {
    if (inverted) { // Checks if the rows should be inverted.
        rows.unshift(padRow(i, count)); // Inserts the padded row at the beginning of the 'rows' array.
    } else {
        rows.push(padRow(i, count)); // Appends the padded row at the end of the 'rows' array.
    }
}

/*while (rows.length < count) { 
    rows.push(padRow(rows.length + 1, count)); 
}*/
// This commented-out code was intended to keep adding rows to the 'rows' array until its length matches 'count'.

/*for (let i = count; i > 0; i--) { 
    rows.push(padRow(i, count)); 
}*/
// This commented-out loop builds the pattern in reverse order, starting from 'count' and decreasing to 1.

let result = ""; // Initializes an empty string 'result' to store the final pattern.

for (const row of rows) { // Iterates over each row in the 'rows' array.
    result = result + row + "\n"; // Adds the current row to 'result' with a newline character for formatting.
}

console.log(result); // Outputs the complete pattern to the console.
