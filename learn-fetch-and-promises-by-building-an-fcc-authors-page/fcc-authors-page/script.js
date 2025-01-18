// Selects the HTML element with the ID 'author-container' and stores it in a constant.
// This will serve as the container where author data is dynamically added.
const authorContainer = document.getElementById('author-container');

// Selects the HTML element with the ID 'load-more-btn' and stores it in a constant.
// This button allows the user to load more author data when clicked.
const loadMoreBtn = document.getElementById('load-more-btn');

// Initializes a variable to keep track of the starting index for slicing the author data array.
// This helps determine which subset of authors to display.
let startingIndex = 0;

// Initializes a variable to keep track of the ending index for slicing the author data array.
// This helps define the range of authors displayed at any given time.
let endingIndex = 8;

// Initializes an empty array to hold the fetched author data.
// The data fetched from the API will be stored here for further processing.
let authorDataArr = [];

// Fetches author data from the specified URL and handles the response.
fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
    // Converts the fetched response to JSON format for easier manipulation.
    .then((res) => res.json())
    .then((data) => {
        // Assigns the fetched data to the `authorDataArr` array for later use.
        authorDataArr = data;

        // Calls the `displayAuthors` function with a slice of the `authorDataArr` array.
        // Only the first 8 authors are displayed initially (from `startingIndex` to `endingIndex`).
        displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
    })
    .catch((err) => {
        // Handles any errors that occur during the fetch process.
        // Displays an error message inside the `authorContainer` if the fetch fails.
        authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
    });

// Defines a function to fetch and display the next set of authors.
const fetchMoreAuthors = () => {
    // Increments the starting index by 8 to load the next batch of authors.
    startingIndex += 8;

    // Increments the ending index by 8 to adjust the range of authors displayed.
    endingIndex += 8;

    // Calls the `displayAuthors` function with a new slice of the `authorDataArr` array.
    // The new slice contains the next set of authors to be displayed.
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));

    // Checks if the length of the `authorDataArr` is less than or equal to the `endingIndex`.
    // This ensures no more data is loaded once all authors are displayed.
    if (authorDataArr.length <= endingIndex) {
        // Disables the 'Load More' button to prevent further clicks.
        loadMoreBtn.disabled = true;

        // Changes the cursor style to 'not-allowed' to visually indicate the button is inactive.
        loadMoreBtn.style.cursor = "not-allowed";

        // Updates the button text to inform the user that no more data is available.
        loadMoreBtn.textContent = 'No more data to load';
    }
};

// Defines a function to display author cards on the page.
const displayAuthors = (authors) => {
    // Iterates over the array of authors passed as an argument to the function.
    authors.forEach(({ author, image, url, bio }, index) => {
        // Dynamically generates HTML for each author and appends it to the `authorContainer`.
        authorContainer.innerHTML += `
      <div id="${index}" class="user-card">
        <!-- Displays the author's name inside an h2 element -->
        <h2 class="author-name">${author}</h2>
        
        <!-- Displays the author's image with appropriate alt text -->
        <img class="user-img" src="${image}" alt="${author} avatar">
        
        <!-- Adds a styled purple divider within the card -->
        <div class="purple-divider"></div>
        
        <!-- Displays the author's bio, truncated if it exceeds 50 characters -->
        <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
        
        <!-- Adds a link to the author's page that opens in a new tab -->
        <a class="author-link" href="${url}" target="_blank">${author} author page</a>
      </div>
    `;
    });
};

// Adds a click event listener to the 'Load More' button.
// When the button is clicked, the `fetchMoreAuthors` function is executed.
loadMoreBtn.addEventListener('click', fetchMoreAuthors);
