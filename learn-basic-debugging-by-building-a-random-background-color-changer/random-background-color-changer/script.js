const darkColorsArr = [ /* SECTION: COLOR ARRAY
    Array containing a list of dark color hex codes. Each element in the array is a string representing a color in hexadecimal format. */
    "#2C3E50", /* A dark blue-gray color */
    "#34495E", /* A darker blue-gray color */
    "#2C2C2C", /* A very dark gray color */
    "#616A6B", /* A dark grayish teal color */
    "#4A235A", /* A deep purple color */
    "#2F4F4F", /* A dark slate gray color */
    "#0E4B5A", /* A dark teal color */
    "#36454F", /* A grayish-blue color */
    "#2C3E50", /* Another dark blue-gray color (repeated for variety) */
    "#800020", /* A dark maroon color */
]; /* End of the array containing dark color hex codes */

function getRandomIndex() { /* SECTION: UTILITY FUNCTION
    Function definition to generate a random index for the array. This function will be used to select a random color from the darkColorsArr. */
    const randomIndex = Math.floor(darkColorsArr.length * Math.random()); /* Calculates a random index:
        - `darkColorsArr.length` gives the total number of elements in the array.
        - `Math.random()` generates a random decimal between 0 and 1.
        - Multiplying the array length by `Math.random()` gives a value between 0 and the array length.
        - `Math.floor()` rounds the result down to the nearest whole number, ensuring it is a valid array index. */
    return randomIndex; /* Returns the randomly generated index to the calling function. */
} /* End of getRandomIndex function */

const body = document.querySelector("body"); /* SECTION: DOM ELEMENT SELECTION
    Selects the <body> element in the HTML document.
    - This element is targeted for changing its background color dynamically. */

const bgHexCodeSpanElement = document.querySelector("#bg-hex-code"); /* Selects the span element with the ID 'bg-hex-code':
    - This span will display the hex code of the selected background color.
    - It serves as a visual reference for the user to know the applied color. */

function changeBackgroundColor() { /* SECTION: MAIN FUNCTION
    Function definition to change the background color of the page dynamically. This function is triggered by a button click. */
    const color = darkColorsArr[getRandomIndex()]; /* Retrieves a random color from the `darkColorsArr` array:
        - Calls `getRandomIndex()` to generate a random valid index for the array.
        - Uses this index to access a specific color in `darkColorsArr`.
        - Stores the retrieved color in the `color` variable. */

    bgHexCodeSpanElement.innerText = color; /* Updates the inner text of the span element (`bgHexCodeSpanElement`):
        - Displays the hex code of the selected color for user reference.
        - The color variable (holding the hex code) is assigned to `innerText`. */

    body.style.backgroundColor = color; /* Changes the background color of the <body> element:
        - Modifies the `backgroundColor` property of the <body> to the value stored in the `color` variable.
        - This visually updates the page background to match the selected color. */
} /* End of changeBackgroundColor function */

const btn = document.querySelector("#btn"); /* SECTION: BUTTON SELECTION
    Selects the button element with the ID 'btn':
    - This button serves as the trigger for changing the background color.
    - The button's click event will be handled by the `changeBackgroundColor` function. */

btn.onclick = changeBackgroundColor; /* SECTION: EVENT HANDLING
    Assigns the `changeBackgroundColor` function to the `onclick` event of the button:
    - When the button is clicked, the `onclick` event fires.
    - This triggers the `changeBackgroundColor` function, updating the background color and hex code display. */