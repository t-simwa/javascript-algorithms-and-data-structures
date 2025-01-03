// Get the input field element by its ID and assign it to the variable `numberInput`.
const numberInput = document.getElementById("number-input");

// Get the button element by its ID and assign it to the variable `convertBtn`.
const convertBtn = document.getElementById("convert-btn");

// Get the output element by its ID and assign it to the variable `result`.
const result = document.getElementById("result");

// Get the container for animations by its ID and assign it to the variable `animationContainer`.
const animationContainer = document.getElementById("animation-container");

// Define an array `animationData` containing objects with details for animating the call stack.
const animationData = [
    {
        inputVal: 5, // The input value for this step of the animation.
        addElDelay: 1000, // Delay before adding the animation element (in milliseconds).
        msg: 'decimalToBinary(5) returns "10" + 1 (5 % 2). Then it pops off the stack.', // Message to display for this step.
        showMsgDelay: 15000, // Delay before displaying the message.
        removeElDelay: 20000, // Delay before removing the animation element.
    },
    {
        inputVal: 2, // The input value for this step of the animation.
        addElDelay: 1500, // Delay before adding the animation element (in milliseconds).
        msg: 'decimalToBinary(2) returns "1" + 0 (2 % 2) and gives that value to the stack below. Then it pops off the stack.', // Message to display for this step.
        showMsgDelay: 10000, // Delay before displaying the message.
        removeElDelay: 15000, // Delay before removing the animation element.
    },
    {
        inputVal: 1, // The input value for this step of the animation.
        addElDelay: 2000, // Delay before adding the animation element (in milliseconds).
        msg: "decimalToBinary(1) returns '1' (base case) and gives that value to the stack below. Then it pops off the stack.", // Message to display for this step.
        showMsgDelay: 5000, // Delay before displaying the message.
        removeElDelay: 10000, // Delay before removing the animation element.
    }
];

// Function to recursively convert a decimal number to binary.
const decimalToBinary = (input) => {
    if (input === 0 || input === 1) {
        // Base case: return the input as a string if it's 0 or 1.
        return String(input);
    } else {
        // Recursive case: divide the number by 2, call the function on the quotient, and append the remainder.
        return decimalToBinary(Math.floor(input / 2)) + (input % 2);
    }
};

// Function to display a call stack animation using the `animationData`.
const showAnimation = () => {
    // Set the initial text for the `result` element to indicate the animation is starting.
    result.innerText = "Call Stack Animation";

    // Iterate over each object in `animationData`.
    animationData.forEach((obj) => {
        setTimeout(() => {
            // Add a paragraph element to `animationContainer` with the current input value and a placeholder text.
            animationContainer.innerHTML += `
        <p id="${obj.inputVal}" class="animation-frame">
          decimalToBinary(${obj.inputVal})
        </p>
      `;
        }, obj.addElDelay); // Delay the addition of the element.

        setTimeout(() => {
            // Update the text content of the paragraph with the detailed message.
            document.getElementById(obj.inputVal).textContent = obj.msg;
        }, obj.showMsgDelay); // Delay the display of the message.

        setTimeout(() => {
            // Remove the paragraph element from the DOM.
            document.getElementById(obj.inputVal).remove();
        }, obj.removeElDelay); // Delay the removal of the element.
    });

    setTimeout(() => {
        // After all animations, display the binary result of converting the number 5.
        result.textContent = decimalToBinary(5);
    }, 20000); // Wait for the total animation duration before showing the result.
};

// Function to validate user input and handle conversions or animations.
const checkUserInput = () => {
    // Parse the user input as an integer.
    const inputInt = parseInt(numberInput.value);

    // Check if the input is invalid (empty, not a number, or negative).
    if (!numberInput.value || isNaN(inputInt) || inputInt < 0) {
        // Show an alert if the input is invalid.
        alert("Please provide a decimal number greater than or equal to 0");
        return; // Exit the function to prevent further processing.
    }

    // If the input is exactly 5, trigger the animation.
    if (inputInt === 5) {
        showAnimation();
        return; // Exit after starting the animation.
    }

    // Convert the input to binary and display the result.
    result.textContent = decimalToBinary(inputInt);

    // Clear the input field.
    numberInput.value = "";
};

// Add a click event listener to the `convertBtn` to call `checkUserInput`.
convertBtn.addEventListener("click", checkUserInput);

// Add a keydown event listener to `numberInput` to allow pressing "Enter" to trigger the conversion.
numberInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        // Check if the pressed key is "Enter".
        checkUserInput(); // Call the `checkUserInput` function.
    }
});
