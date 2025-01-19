// URL for fetching the latest posts from the freeCodeCamp forum.
// Points to a JSON file with the latest post data.
const forumLatest = "https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json";

// Base URL for accessing specific forum topics.
// Used to create clickable links to individual posts.
const forumTopicUrl = "https://forum.freecodecamp.org/t/";

// Base URL for accessing specific forum categories.
// Used for generating category links dynamically.
const forumCategoryUrl = "https://forum.freecodecamp.org/c/";

// Base URL for user avatars hosted by the forum's CDN.
// Used to construct full avatar image URLs dynamically.
const avatarUrl = "https://sea1.discourse-cdn.com/freecodecamp";

// Selects the HTML element with the ID 'posts-container'.
// This is the container where forum post rows will be dynamically inserted.
const postsContainer = document.getElementById("posts-container");

// Object mapping category IDs to their corresponding display names and class names.
// This helps in dynamically assigning styles and names to forum categories.
const allCategories = {
    299: { category: "Career Advice", className: "career" },
    409: { category: "Project Feedback", className: "feedback" },
    417: { category: "freeCodeCamp Support", className: "support" },
    421: { category: "JavaScript", className: "javascript" },
    423: { category: "HTML - CSS", className: "html-css" },
    424: { category: "Python", className: "python" },
    432: { category: "You Can Do This!", className: "motivation" },
    560: { category: "Backend Development", className: "backend" },
};

// Function that generates HTML for a forum category link.
// Takes a category ID as input and returns an anchor element with the category's name, style, and link.
const forumCategory = (id) => {
    let selectedCategory = {}; // Initializes an empty object to store category details.

    // Checks if the provided category ID exists in the `allCategories` object.
    if (allCategories.hasOwnProperty(id)) {
        // Destructures the category details from `allCategories` if the ID matches.
        const { className, category } = allCategories[id];
        selectedCategory.className = className; // Assigns the class name to the object.
        selectedCategory.category = category; // Assigns the category name to the object.
    } else {
        // Assigns default values for categories not found in `allCategories`.
        selectedCategory.className = "general";
        selectedCategory.category = "General";
        selectedCategory.id = 1;
    }

    // Constructs a URL for the category based on its class name and ID.
    const url = `${forumCategoryUrl}${selectedCategory.className}/${id}`;
    const linkText = selectedCategory.category; // Text to display in the anchor tag.
    const linkClass = `category ${selectedCategory.className}`; // Assigns a class for styling the link.

    // Returns an anchor element as a string with the constructed URL, class, and text.
    return `<a href="${url}" class="${linkClass}" target="_blank">
    ${linkText}
  </a>`;
};

// Function to calculate how long ago a post was bumped.
// Takes a timestamp as input and returns a formatted string (e.g., "5m ago").
const timeAgo = (time) => {
    const currentTime = new Date(); // Gets the current date and time.
    const lastPost = new Date(time); // Converts the provided timestamp to a Date object.

    // Calculates the time difference in milliseconds.
    const timeDifference = currentTime - lastPost;
    const msPerMinute = 1000 * 60; // Defines the number of milliseconds in a minute.

    // Converts the time difference into minutes, hours, and days.
    const minutesAgo = Math.floor(timeDifference / msPerMinute);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);

    // Determines the appropriate time format based on the difference.
    if (minutesAgo < 60) {
        return `${minutesAgo}m ago`; // Returns minutes if less than an hour.
    }
    if (hoursAgo < 24) {
        return `${hoursAgo}h ago`; // Returns hours if less than a day.
    }
    return `${daysAgo}d ago`; // Returns days if more than a day.
};

// Function to format view counts for better readability.
// Converts numbers over 1000 to a "k" format (e.g., 1200 -> "1k").
const viewCount = (views) => {
    const thousands = Math.floor(views / 1000); // Calculates how many thousands are in the view count.

    if (views >= 1000) {
        return `${thousands}k`; // Appends "k" to thousands if views are 1000 or more.
    }
    return views; // Returns the original number if views are less than 1000.
};

// Function to generate avatar images for the posters of a forum topic.
// Takes an array of posters and users, then returns an HTML string of avatar images.
const avatars = (posters, users) => {
    return posters
        .map((poster) => {
            // Finds the user corresponding to the poster's user ID.
            const user = users.find((user) => user.id === poster.user_id);

            if (user) {
                // Replaces the avatar template's placeholder with a size value.
                const avatar = user.avatar_template.replace(/{size}/, 30);

                // Constructs the full URL for the avatar.
                const userAvatarUrl = avatar.startsWith("/user_avatar/")
                    ? avatarUrl.concat(avatar) // Prepends the base avatar URL for relative paths.
                    : avatar;

                // Returns an HTML string for the avatar image with the user's name as alt text.
                return `<img src="${userAvatarUrl}" alt="${user.name}" />`;
            }
        })
        .join(""); // Joins all avatar image strings into a single string.
};

// Async function to fetch the latest forum data from the provided API URL.
const fetchData = async () => {
    try {
        const res = await fetch(forumLatest); // Sends a GET request to the API.
        const data = await res.json(); // Parses the JSON response.
        showLatestPosts(data); // Calls a function to display the fetched data in the HTML.
    } catch (err) {
        console.log(err); // Logs any errors that occur during the fetch.
    }
};

// Calls the `fetchData` function to fetch and display the latest posts.
fetchData();

// Function to display the latest forum posts in the table.
// Takes the fetched data as input and dynamically creates table rows with post details.
const showLatestPosts = (data) => {
    const { topic_list, users } = data; // Extracts the topic list and user details from the data.
    const { topics } = topic_list; // Extracts the topics array from the topic list.

    // Generates table rows for each topic and sets the inner HTML of the posts container.
    postsContainer.innerHTML = topics
        .map((item) => {
            // Destructures properties of the current topic for easy access.
            const {
                id,
                title,
                views,
                posts_count,
                slug,
                posters,
                category_id,
                bumped_at,
            } = item;

            // Returns a table row with topic details formatted as HTML.
            return `
    <tr>
      <td>
        <a class="post-title" target="_blank" href="${forumTopicUrl}${slug}/${id}">${title}</a>
        ${forumCategory(category_id)} <!-- Adds the category link dynamically -->
      </td>
      <td>
        <div class="avatar-container">
          ${avatars(posters, users)} <!-- Adds avatar images for the topic posters -->
        </div>
      </td>
      <td>${posts_count - 1}</td> <!-- Displays the number of replies (posts count minus one) -->
      <td>${viewCount(views)}</td> <!-- Displays the formatted view count -->
      <td>${timeAgo(bumped_at)}</td> <!-- Displays how long ago the topic was bumped -->
    </tr>`;
        })
        .join(""); // Joins all table row strings into a single string.
};
