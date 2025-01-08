// Function to calculate the mean (average) of an array
const getMean = (array) =>
    array.reduce((acc, el) => acc + el, 0) / array.length;
// - `array.reduce()` adds up all the elements of the array, starting with 0 as the initial value.
// - The sum is then divided by `array.length` to get the mean.
// - This function uses concise arrow function syntax to return the result directly.

// Function to calculate the median of an array
const getMedian = (array) => {
    const sorted = array.toSorted((a, b) => a - b);
    // - `array.toSorted()` sorts the array in ascending order.
    // - `a - b` ensures numerical sorting (not lexicographical).

    const median =
        sorted.length % 2 === 0
            // If the array has an even number of elements, the median is the mean of the two middle numbers.
            ? getMean([sorted[sorted.length / 2], sorted[sorted.length / 2 - 1]])
            // If the array has an odd number of elements, the median is the middle number.
            : sorted[Math.floor(sorted.length / 2)];

    return median;
    // Returns the calculated median.
};

// Function to calculate the mode of an array
const getMode = (array) => {
    const counts = {};
    // - `counts` is an object to track the frequency of each element in the array.

    array.forEach((el) => {
        counts[el] = (counts[el] || 0) + 1;
        // - For each element in the array, increment its count in `counts`.
        // - If the element does not exist in `counts`, initialize it to 0 before adding 1.
    });

    if (new Set(Object.values(counts)).size === 1) {
        return null;
        // - If all elements have the same frequency, return `null` (no mode).
    }

    const highest = Object.keys(counts).sort(
        (a, b) => counts[b] - counts[a]
    )[0];
    // - Sorts the keys of `counts` in descending order based on their frequency.
    // - Retrieves the key with the highest frequency.

    const mode = Object.keys(counts).filter(
        (el) => counts[el] === counts[highest]
    );
    // - Filters the keys of `counts` to include only those with the highest frequency.

    return mode.join(", ");
    // - Converts the array of mode values into a comma-separated string.
};

// Function to calculate the range of an array
const getRange = (array) => {
    return Math.max(...array) - Math.min(...array);
    // - `Math.max(...array)` finds the largest value in the array.
    // - `Math.min(...array)` finds the smallest value in the array.
    // - The range is the difference between these two values.
};

// Function to calculate the variance of an array
const getVariance = (array) => {
    const mean = getMean(array);
    // - Calculates the mean of the array for use in the variance formula.

    const variance = array.reduce((acc, el) => {
        const difference = el - mean;
        // - Calculates the difference between the current element and the mean.

        const squared = difference ** 2;
        // - Squares the difference to avoid negative values.

        return acc + squared;
        // - Adds the squared difference to the accumulator.
    }, 0) / array.length;
    // - Divides the total sum of squared differences by the number of elements to get the variance.

    return variance;
    // - Returns the calculated variance.
};

// Function to calculate the standard deviation of an array
const getStandardDeviation = (array) => {
    const variance = getVariance(array);
    // - Uses the `getVariance` function to calculate the variance of the array.

    const standardDeviation = Math.sqrt(variance);
    // - Takes the square root of the variance to calculate the standard deviation.

    return standardDeviation;
    // - Returns the calculated standard deviation.
};

// Main function to calculate and display statistical values
const calculate = () => {
    const value = document.querySelector("#numbers").value;
    // - Retrieves the value entered in the input field with the `#numbers` ID.

    const array = value.split(/,\s*/g);
    // - Splits the input string into an array using a regular expression to match commas and optional spaces.

    const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
    // - Converts each element of the array into a number using `Number()`.
    // - Filters out any elements that are not valid numbers.

    const mean = getMean(numbers);
    // - Calculates the mean of the numbers array.

    const median = getMedian(numbers);
    // - Calculates the median of the numbers array.

    const mode = getMode(numbers);
    // - Calculates the mode of the numbers array.

    const range = getRange(numbers);
    // - Calculates the range of the numbers array.

    const variance = getVariance(numbers);
    // - Calculates the variance of the numbers array.

    const standardDeviation = getStandardDeviation(numbers);
    // - Calculates the standard deviation of the numbers array.

    document.querySelector("#mean").textContent = mean;
    // - Updates the text content of the `#mean` span with the calculated mean.

    document.querySelector("#median").textContent = median;
    // - Updates the text content of the `#median` span with the calculated median.

    document.querySelector("#mode").textContent = mode;
    // - Updates the text content of the `#mode` span with the calculated mode.

    document.querySelector("#range").textContent = range;
    // - Updates the text content of the `#range` span with the calculated range.

    document.querySelector("#variance").textContent = variance;
    // - Updates the text content of the `#variance` span with the calculated variance.

    document.querySelector("#standardDeviation").textContent = standardDeviation;
    // - Updates the text content of the `#standardDeviation` span with the calculated standard deviation.
};
