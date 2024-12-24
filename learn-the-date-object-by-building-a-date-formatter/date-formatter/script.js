// Select the paragraph element with the ID "current-date"
const currentDateParagraph = document.getElementById("current-date");

// Select the dropdown element with the ID "date-options"
const dateOptionsSelectElement = document.getElementById("date-options");

// Create a new Date object to represent the current date and time
const date = new Date();

// Extract the current day of the month from the Date object
const day = date.getDate();

// Extract the current month from the Date object (Note: getMonth() returns 0-based months, so add 1)
const month = date.getMonth() + 1;

// Extract the current year from the Date object
const year = date.getFullYear();

// Extract the current hour from the Date object
const hours = date.getHours();

// Extract the current minute from the Date object
const minutes = date.getMinutes();

// Create a formatted date string in the format "day-month-year"
const formattedDate = `${day}-${month}-${year}`;

// Display the formatted date string inside the paragraph element
currentDateParagraph.textContent = formattedDate;

// Add an event listener to the dropdown element that triggers on a value change
dateOptionsSelectElement.addEventListener("change", () => {
    // Use a switch statement to determine the formatting based on the selected option
    switch (dateOptionsSelectElement.value) {
        // Format: "Year-Month-Day"
        case "yyyy-mm-dd":
            // Split the formatted date into parts, reverse their order, and join them with dashes
            currentDateParagraph.textContent = formattedDate
                .split("-")
                .reverse()
                .join("-");
            break;

        // Format: "Month-Day-Year Hours Minutes"
        case "mm-dd-yyyy-h-mm":
            // Construct a string with the desired format and include hours and minutes
            currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
            break;

        // Default case: Display the original formatted date
        default:
            currentDateParagraph.textContent = formattedDate;
    }
});
