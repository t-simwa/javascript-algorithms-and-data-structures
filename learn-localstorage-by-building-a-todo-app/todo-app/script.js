// Get references to various elements in the DOM by their IDs
const taskForm = document.getElementById("task-form"); // The form for adding or updating tasks
const confirmCloseDialog = document.getElementById("confirm-close-dialog"); // The dialog shown when trying to close the form with unsaved changes
const openTaskFormBtn = document.getElementById("open-task-form-btn"); // Button to open the task form
const closeTaskFormBtn = document.getElementById("close-task-form-btn"); // Button to close the task form
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn"); // Button to add or update a task
const cancelBtn = document.getElementById("cancel-btn"); // Button to cancel closing the form in the dialog
const discardBtn = document.getElementById("discard-btn"); // Button to discard changes and close the form
const tasksContainer = document.getElementById("tasks-container"); // Container to display all tasks
const titleInput = document.getElementById("title-input"); // Input field for the task title
const dateInput = document.getElementById("date-input"); // Input field for the task date
const descriptionInput = document.getElementById("description-input"); // Input field for the task description

// Retrieve the task data from localStorage, or initialize an empty array if no data exists
const taskData = JSON.parse(localStorage.getItem("data")) || [];

// Variable to store the currently edited task
let currentTask = {};

// Function to remove special characters from a string
const removeSpecialChars = (val) => {
    return val.trim().replace(/[^A-Za-z0-9\-\s]/g, ''); // Trims whitespace and removes any characters that are not letters, numbers, dashes, or spaces
};

// Function to add or update a task
const addOrUpdateTask = () => {
    // If the title input is empty, alert the user and stop execution
    if (!titleInput.value.trim()) {
        alert("Please provide a title");
        return;
    }

    // Find the index of the current task in the taskData array
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

    // Create a new task object with sanitized inputs and a unique ID
    const taskObj = {
        id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`, // Generate a unique ID using the title and current timestamp
        title: removeSpecialChars(titleInput.value), // Cleaned title
        date: dateInput.value, // Date as entered by the user
        description: removeSpecialChars(descriptionInput.value), // Cleaned description
    };

    // If the task doesn't exist in the array, add it; otherwise, update it
    if (dataArrIndex === -1) {
        taskData.unshift(taskObj); // Add the new task at the beginning of the array
    } else {
        taskData[dataArrIndex] = taskObj; // Update the existing task
    }

    // Save the updated task data to localStorage
    localStorage.setItem("data", JSON.stringify(taskData));

    // Update the task container with the new data
    updateTaskContainer();

    // Reset the form
    reset();
};

// Function to update the task container with tasks
const updateTaskContainer = () => {
    tasksContainer.innerHTML = ""; // Clear the container

    // Loop through each task in taskData and append it to the container
    taskData.forEach(({ id, title, date, description }) => {
        tasksContainer.innerHTML += `
      <div class="task" id="${id}"> 
        <p><strong>Title:</strong> ${title}</p> <!-- Display the task title -->
        <p><strong>Date:</strong> ${date}</p> <!-- Display the task date -->
        <p><strong>Description:</strong> ${description}</p> <!-- Display the task description -->
        <button onclick="editTask(this)" type="button" class="btn">Edit</button> <!-- Edit button -->
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> <!-- Delete button -->
      </div>
    `;
    });
};

// Function to delete a task
const deleteTask = (buttonEl) => {
    // Find the index of the task to delete
    const dataArrIndex = taskData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );

    buttonEl.parentElement.remove(); // Remove the task's HTML element
    taskData.splice(dataArrIndex, 1); // Remove the task from the array
    localStorage.setItem("data", JSON.stringify(taskData)); // Update localStorage
};

// Function to edit a task
const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );

    currentTask = taskData[dataArrIndex]; // Set the current task to the one being edited

    // Populate the form inputs with the task's data
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;

    addOrUpdateTaskBtn.innerText = "Update Task"; // Change button text to "Update Task"

    taskForm.classList.toggle("hidden"); // Show the form
};

// Function to reset the form
const reset = () => {
    addOrUpdateTaskBtn.innerText = "Add Task"; // Reset button text to "Add Task"
    titleInput.value = ""; // Clear the title input
    dateInput.value = ""; // Clear the date input
    descriptionInput.value = ""; // Clear the description input
    taskForm.classList.toggle("hidden"); // Hide the form
    currentTask = {}; // Clear the current task
};

// If there are tasks in the array, populate the task container on page load
if (taskData.length) {
    updateTaskContainer();
}

// Event listener to toggle the task form's visibility when the open button is clicked
openTaskFormBtn.addEventListener("click", () =>
    taskForm.classList.toggle("hidden")
);

// Event listener for the close button in the task form
closeTaskFormBtn.addEventListener("click", () => {
    // Check if the form contains any values or if the values have been modified
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal(); // Show the confirmation dialog if there are unsaved changes
    } else {
        reset(); // Otherwise, reset the form
    }
});

// Event listener to close the dialog when the cancel button is clicked
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

// Event listener to discard changes and reset the form when the discard button is clicked
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
});

// Prevent the default form submission behavior and handle task addition/updation instead
taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page

    addOrUpdateTask(); // Add or update the task
});
