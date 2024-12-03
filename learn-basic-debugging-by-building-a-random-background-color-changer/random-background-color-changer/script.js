const darkColorsArr = [ /* Array containing dark color hex codes */
    "#2C3E50", /* A dark blue-gray color */
    "#34495E", /* A darker blue-gray color */
    "#2C2C2C", /* A very dark gray color */
    "#616A6B", /* A dark grayish teal color */
    "#4A235A", /* A deep purple color */
    "#2F4F4F", /* A dark slate gray color */
    "#0E4B5A", /* A dark teal color */
    "#36454F", /* A grayish-blue color */
    "#2C3E50", /* Another dark blue-gray color */
    "#800020", /* A dark maroon color */
];

function getRandomIndex() { /* Function to generate a random index within the array's length */
    const randomIndex = Math.floor(darkColorsArr.length * Math.random()); /* Calculate a random index */
    return randomIndex; /* Return the generated random index */
}

const body = document.querySelector("body"); /* Selects the <body> element for modifying background color */
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code"); /* Selects the span element displaying the hex code */

function changeBackgroundColor() { /* Function to change the background color */
    const color = darkColorsArr[getRandomIndex()]; /* Get a random color from the array */

    bgHexCodeSpanElement.innerText = color; /* Update the text inside the span with the selected hex code */
    body.style.backgroundColor = color; /* Change the body's background color to the selected color */
}

const btn = document.querySelector("#btn"); /* Selects the button element for triggering the color change */

btn.onclick = changeBackgroundColor; /* Assigns the click event to the button, triggering the changeBackgroundColor function */
