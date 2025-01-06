// Assigning the "sort" button element to a constant variable
const sortButton = document.getElementById("sort");

// Defining a function that will be triggered when the "sort" button is clicked
const sortInputArray = (event) => {
    // Prevents the default form submission behavior when the button is clicked
    event.preventDefault();

    // Grabbing all elements with the class "values-dropdown", converting them into an array,
    // and extracting their values, converting them to numbers
    const inputValues = [
        ...document.getElementsByClassName("values-dropdown")
    ].map((dropdown) => Number(dropdown.value));

    // Sorting the input values in ascending order using the sort() method
    const sortedValues = inputValues.sort((a, b) => {
        return a - b;  // Sorting in ascending order by comparing two numbers (a and b)
    });

    // Calling the updateUI function to update the display with the sorted values
    updateUI(sortedValues);
}

// Function to update the user interface with the sorted array values
const updateUI = (array = []) => {
    // Iterating over the array and updating the innerText of the output-value elements
    array.forEach((num, i) => {
        // Grabbing the output element corresponding to the index 'i'
        const outputValueNode = document.getElementById(`output-value-${i}`);
        // Updating the inner text of the element with the current number from the array
        outputValueNode.innerText = num;
    })
}

// Bubble sort implementation
const bubbleSort = (array) => {
    // Outer loop to iterate through the array
    for (let i = 0; i < array.length; i++) {
        // Inner loop to compare adjacent elements and swap them if necessary
        for (let j = 0; j < array.length - 1; j++) {
            // If the current element is greater than the next, swap them
            if (array[j] > array[j + 1]) {
                // Temporary variable to hold the current element during the swap
                const temp = array[j];
                // Swap the elements
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }

    // Returning the sorted array after all iterations
    return array;
}

// Selection sort implementation
const selectionSort = (array) => {
    // Outer loop to iterate through the array
    for (let i = 0; i < array.length; i++) {
        // Assume the current index is the minimum
        let minIndex = i;

        // Inner loop to find the smallest element in the unsorted part of the array
        for (let j = i + 1; j < array.length; j++) {
            // If a smaller element is found, update minIndex to the new position
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }

        // Swap the current element with the smallest found element
        const temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
    }

    // Returning the sorted array after all iterations
    return array;
}

// Insertion sort implementation
const insertionSort = (array) => {
    // Starting from the second element, iterating through the entire array
    for (let i = 1; i < array.length; i++) {
        // Store the current value in a temporary variable
        const currValue = array[i];
        // Initialize j to the index of the element before the current element
        let j = i - 1;

        // While j is not out of bounds and the element at j is greater than the current value
        while (j >= 0 && array[j] > currValue) {
            // Move the element at index j one position to the right
            array[j + 1] = array[j];
            // Decrement j to check the previous element
            j--;
        }
        // Place the current value in the correct position
        array[j + 1] = currValue;
    }
    // Returning the sorted array after all iterations
    return array;
}

// Adding an event listener to the "sort" button to trigger the sortInputArray function when clicked
sortButton.addEventListener("click", sortInputArray);
