// SECTION: VARIABLE DECLARATIONS
// Selects the paragraph element with the ID 'current-date' and stores it in a constant variable named `currentDateParagraph`.
// This element displays the current date and updates based on the user's selection in the dropdown.
const currentDateParagraph = document.getElementById("current-date");
/* By retrieving the paragraph element from the DOM, we have a place to show our formatted date. 
   We'll update this text content whenever the user changes an option in the dropdown. */

// Selects the dropdown element with the ID 'date-options' and stores it in a constant variable named `dateOptionsSelectElement`.
// This element allows the user to choose different date/time formatting options.
const dateOptionsSelectElement = document.getElementById("date-options");
/* This dropdown will trigger an event when the user selects a formatting option, 
   prompting the code to update the displayed date accordingly. */

// SECTION: DATE OBJECT CREATION
// Creates a new `Date` object to represent the current date and time, storing it in a constant variable named `date`.
const date = new Date();
/* The `Date` constructor with no arguments defaults to the current date and time, 
   based on the user's system settings. */

// SECTION: DATE EXTRACTION
// Extracts the current day of the month from the `date` object and stores it in a constant variable named `day`.
const day = date.getDate();
/* This value will be used later to construct our formatted date. 
   For instance, if today is the 15th, `day` will be 15. */

// Extracts the current month from the `date` object and adds 1, storing it in `month`.
// `getMonth()` returns a 0-based index (0 for January, 1 for February, etc.), hence the need for +1.
const month = date.getMonth() + 1;
/* Without the +1, a returned value of 0 would incorrectly suggest January, 
   but in this code, we want a human-readable month value like 1 for January, 2 for February, etc. */

// Extracts the current year from the `date` object and stores it in `year`.
const year = date.getFullYear();
/* Using this method ensures a four-digit year is returned, such as 2023. */

// Extracts the current hour from the `date` object and stores it in `hours`.
const hours = date.getHours();
/* This value represents the hour on a 24-hour clock, ranging from 0 (midnight) to 23. */

// Extracts the current minute from the `date` object and stores it in `minutes`.
const minutes = date.getMinutes();
/* This value is a number from 0 to 59, indicating the current minute of the hour. */

// SECTION: DATE FORMATTING
// Creates a formatted date string in the format "day-month-year", storing it in `formattedDate`.
const formattedDate = `${day}-${month}-${year}`;
/* By using a template literal, we easily construct this new string with dashes separating day, month, and year. 
   We will use this string as a baseline for display and for further transformations. */

// SECTION: UI UPDATE
// Displays the formatted date string inside the paragraph element `currentDateParagraph`.
currentDateParagraph.textContent = formattedDate;
/* Setting the `textContent` property replaces any existing text within `<p id="current-date">` 
   with our newly formatted string. This shows the default date on the page load. */

// SECTION: EVENT LISTENER
// Adds an event listener to the dropdown element `dateOptionsSelectElement` that listens for 'change' events.
// When the user selects a new formatting option, the following callback function runs to update the displayed date.
dateOptionsSelectElement.addEventListener("change", () => {
    /* The 'change' event fires after the user picks a different option from the dropdown. 
       We'll adjust the displayed date string based on their selection. */

    // Uses a switch statement to handle different date formatting cases, based on the selected value.
    switch (dateOptionsSelectElement.value) {
        // CASE 1: The user chooses the "yyyy-mm-dd" format.
        case "yyyy-mm-dd":
            // Splits the default formatted date string into parts, reverses their order, and joins them with dashes.
            // The final result becomes "year-month-day".
            currentDateParagraph.textContent = formattedDate
                .split("-")
                .reverse()
                .join("-");
            /* The default `formattedDate` is "day-month-year". By splitting on '-', we get an array like [day, month, year].
               Reversing that array yields [year, month, day], and joining with '-' returns the inverted order. */
            break;

        // CASE 2: The user chooses the "mm-dd-yyyy-h-mm" format.
        case "mm-dd-yyyy-h-mm":
            // Constructs a string in the format "Month-Day-Year Hours Minutes" using the extracted values.
            currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
            /* This provides a more verbose format including the current hour and minute, 
               labeled for clarity (e.g. "14 Hours 5 Minutes"). */
            break;

        // CASE 3: Default behavior when no recognized format is chosen.
        default:
            // Displays the original "day-month-year" date format stored in `formattedDate`.
            currentDateParagraph.textContent = formattedDate;
        /* The user sees the default layout if an unrecognized or default option is selected. */
    }
});