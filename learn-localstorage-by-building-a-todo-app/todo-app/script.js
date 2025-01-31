//
// SECTION: DOM ELEMENT REFERENCES
//

// Retrieves the form element with the ID 'task-form', which contains fields and controls for adding or updating tasks.
const taskForm = document.getElementById("task-form");
/* This line accesses the DOM to fetch the element with the ID 'task-form'.
   This form is central to creating new tasks or modifying existing ones. */

// Retrieves the dialog element with the ID 'confirm-close-dialog', used to confirm if the user wants
// to close the form without saving when there are unsaved changes.
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
/* This fetches the dialog in the DOM that serves as a confirmation box for unsaved changes.
   It's shown when the user tries to close the form while it has data that has not been saved. */

// Retrieves the button with the ID 'open-task-form-btn', used to open or show the task form in the UI.
const openTaskFormBtn = document.getElementById("open-task-form-btn");
/* This button, when clicked, will toggle the visibility of the form, allowing the user to create or edit tasks. */

// Retrieves the button with the ID 'close-task-form-btn', used to close or hide the task form in the UI.
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
/* This button, when clicked, triggers a mechanism to either close the form immediately or prompt the user
   if there are unsaved changes. */

// Retrieves the button with the ID 'add-or-update-task-btn', used to add a new task or update an existing task.
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
/* The text of this button changes between "Add Task" and "Update Task" based on the context, indicating
   whether a new task is being created or an existing one is being modified. */

// Retrieves the button with the ID 'cancel-btn', which is part of the confirmation dialog for closing
// the form with unsaved changes. Clicking it cancels the closure.
const cancelBtn = document.getElementById("cancel-btn");
/* This button resides inside the confirmation dialog and allows the user to back out of closing the form
   if they wish to continue editing. */

// Retrieves the button with the ID 'discard-btn', which discards any unsaved changes and closes the form.
const discardBtn = document.getElementById("discard-btn");
/* This button also resides in the confirmation dialog and, when clicked, confirms that the user wants
   to discard changes, closing the form without saving. */

// Retrieves the container with the ID 'tasks-container', where tasks will be displayed as HTML elements.
const tasksContainer = document.getElementById("tasks-container");
/* This container holds all the dynamically created HTML elements foreach task, including its title, date,
   and description, as well as Edit and Delete buttons. */

// Retrieves the input element with the ID 'title-input', where the user can enter the title of a task.
const titleInput = document.getElementById("title-input");
/* The user types the task title here. It's also used when editing a task to load its existing title. */

// Retrieves the input element with the ID 'date-input', where the user can enter the date associated with a task.
const dateInput = document.getElementById("date-input");
/* The user can assign a date, such as a due date or an event date, for each task. 
   This field is optional depending on the app's usage. */

// Retrieves the input element with the ID 'description-input', where the user can enter a descriptive note for a task.
const descriptionInput = document.getElementById("description-input");
/* This input field captures general descriptive information about the task, clarifying its details. */

//
// SECTION: DATA INITIALIZATION
//

// Retrieves data from localStorage under the key 'data'. If not found, initializes an empty array.
const taskData = JSON.parse(localStorage.getItem("data")) || [];
/* Attempting to parse JSON from localStorage. If it's empty or invalid, 
   we default to an empty array to avoid errors. */

//
// SECTION: STATE
//

// Declares a variable 'currentTask' to store a reference to the task currently being edited.
let currentTask = {};
/* This object is initialized as empty. Once the user clicks to edit a task, this will hold that task's data
   so the form can be pre-filled accordingly. */

//
// SECTION: UTILITY FUNCTIONS
//

// Declares a function called 'removeSpecialChars' that removes special characters from a given string 'val'.
const removeSpecialChars = (val) => {
    return val.trim().replace(/[^A-Za-z0-9\-\s]/g, '');
};
/* This function trims whitespace from the start and end of the string and then uses a regular expression
   to remove anything that is not a letter, digit, dash, or space, thereby sanitizing the input. */

//
// SECTION: MAIN FUNCTIONS
//

// Declares a function 'addOrUpdateTask' that handles both adding a new task and updating an existing one.
const addOrUpdateTask = () => {
    // Checks if there's any non-whitespace text entered in 'titleInput'. If not, alerts and returns.
    if (!titleInput.value.trim()) {
        alert("Please provide a title"); // Asks the user to provide a title for the task.
        return; // Aborts the function if the title is empty.
    }

    // Finds the index of the current task in 'taskData' based on its 'id'.
    const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
    /* If 'currentTask' has a valid 'id', we find it in the array to decide if we update it. 
       Otherwise, a new task will be created. */

    // Creates a new task object, 'taskObj', which includes a sanitized title, date, and description.
    const taskObj = {
        id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
        // Above line generates a unique 'id' by combining a sanitized version of the title with the current timestamp.
        title: removeSpecialChars(titleInput.value), // Stores a cleaned-up version of the title input.
        date: dateInput.value, // Uses the exact date string from the user input.
        description: removeSpecialChars(descriptionInput.value), // Stores a cleaned-up description.
    };
    /* Combining the user input with Date.now() helps ensure uniqueness, so no two tasks share the same 'id'. */

    // Checks if the task is new or existing. If 'dataArrIndex' is -1, the task is new; otherwise, it updates the existing task.
    if (dataArrIndex === -1) {
        taskData.unshift(taskObj); // Inserts the new task at the beginning of the array.
    } else {
        taskData[dataArrIndex] = taskObj; // Updates the existing task in-place.
    }
    /* This approach allows us to handle both scenarios (creation and editing) with a single function. */

    // Saves the updated 'taskData' array back to localStorage by converting it to a JSON string.
    localStorage.setItem("data", JSON.stringify(taskData));
    /* This ensures that changes persist across browser sessions. 
       The user can close or refresh the page without losing data. */

    // Calls 'updateTaskContainer' to refresh the UI with the latest data.
    updateTaskContainer();
    /* Any time we change the underlying data, we update the displayed tasks so the UI remains in sync. */

    // Calls 'reset' to clear the form fields and hide the form.
    reset();
    /* This ensures the form is ready for a new entry and not left in a partially completed state. */
};

// Declares a function 'updateTaskContainer' to update the 'tasksContainer' element with the current tasks in 'taskData'.
const updateTaskContainer = () => {
    tasksContainer.innerHTML = ""; // Clears the container's existing contents.
    /* This ensures we don't duplicate tasks. We rebuild the entire list each time for simplicity. */

    // Iterates over each task object in 'taskData' using 'forEach', destructuring its properties.
    taskData.forEach(({ id, title, date, description }) => {
        // Appends a new HTML structure for each task to 'tasksContainer'.
        tasksContainer.innerHTML += `
      <div class="task" id="${id}">
        <!-- The outer 'div' represents a single task and uses the task's 'id' as its 'id' in the DOM. -->
        <p><strong>Title:</strong> ${title}</p> <!-- A paragraph displaying the task's title -->
        <p><strong>Date:</strong> ${date}</p> <!-- A paragraph displaying the task's date -->
        <p><strong>Description:</strong> ${description}</p> <!-- A paragraph displaying the task's description -->
        <button onclick="editTask(this)" type="button" class="btn">Edit</button> <!-- A button for editing the task -->
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> <!-- A button for deleting the task -->
      </div>
    `;
        /* In the template literal above, we inject the unique 'id' into the 'div' element,
           and display the title, date, and description. 
           The 'Edit' and 'Delete' buttons have inline 'onclick' attributes that call respective functions. */
    });
    /* Once this loop is complete, 'tasksContainer' contains the new structure for every task in 'taskData'. */
};

// Declares a function 'deleteTask' that removes a task from both the DOM and 'taskData'.
const deleteTask = (buttonEl) => {
    // Finds the index of the task within 'taskData' by matching the parent element's 'id' with the task's 'id'.
    const dataArrIndex = taskData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );
    /* 'buttonEl.parentElement' is the 'div' that holds the entire task's details,
       so its 'id' corresponds to the 'id' property of the task in 'taskData'. */

    buttonEl.parentElement.remove(); // Removes the task element from the DOM.
    /* This line ensures the user sees the task disappear immediately without needing a page refresh. */

    taskData.splice(dataArrIndex, 1); // Removes the task from the 'taskData' array.
    /* 'splice' removes exactly one element at 'dataArrIndex', effectively deleting the task from our array. */

    localStorage.setItem("data", JSON.stringify(taskData)); // Updates localStorage with the new array.
    /* This persistence ensures that if the page is reloaded, the deleted task does not reappear. */
};

// Declares a function 'editTask' that populates the form with data from the selected task for editing.
const editTask = (buttonEl) => {
    // Finds the index of the task in 'taskData' whose 'id' matches the parent element's 'id'.
    const dataArrIndex = taskData.findIndex(
        (item) => item.id === buttonEl.parentElement.id
    );

    currentTask = taskData[dataArrIndex]; // Assigns the selected task to 'currentTask'.
    /* This allows us to differentiate between editing an existing task and creating a new one. */

    // Pre-fills the title, date, and description fields with the task's current data.
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    /* The user can now see and modify the existing information. 
       Once the user saves, these values will be updated in 'taskData'. */

    addOrUpdateTaskBtn.innerText = "Update Task"; // Changes the button text to reflect that we're updating, not adding.
    /* This is an important visual indicator for the user so they know they're editing an existing task. */

    taskForm.classList.toggle("hidden"); // Reveals the form to the user for editing.
    /* If the form was hidden, it is now made visible so the user can make changes. */
};

// Declares a function 'reset' that restores the form to its default state and hides it.
const reset = () => {
    addOrUpdateTaskBtn.innerText = "Add Task"; // Resets the button text to 'Add Task'.
    /* This prepares the form for creating a brand-new task the next time it's opened. */

    titleInput.value = ""; // Clears the title field.
    dateInput.value = ""; // Clears the date field.
    descriptionInput.value = ""; // Clears the description field.
    /* By clearing these fields, we ensure that any data from the last operation isn't carried over. */

    taskForm.classList.toggle("hidden"); // Hides the form from view.
    /* If it was visible, it's now hidden. This helps maintain a clean interface after operations. */

    currentTask = {}; // Resets the 'currentTask' object to an empty state.
    /* Now the editor is no longer referencing any existing task, so a future operation will be treated as a new task. */
};

//
// SECTION: INITIALIZATION
//

// Checks if there are any existing tasks in 'taskData'. If so, calls 'updateTaskContainer' to display them on page load.
if (taskData.length) {
    updateTaskContainer();
}
/* This ensures that any tasks from a previous session or earlier usage of the app are visible immediately 
   when the page is first opened or refreshed. */

//
// SECTION: EVENT LISTENERS
//

// Adds a click event listener to 'openTaskFormBtn' that toggles the visibility of the task form.
openTaskFormBtn.addEventListener("click", () =>
    taskForm.classList.toggle("hidden")
);
/* This allows the user to open the form and create a new task. 
   If the form is already open, it will close instead. */

// Adds a click event listener to 'closeTaskFormBtn' that checks for unsaved changes and either resets the form or shows a warning dialog.
closeTaskFormBtn.addEventListener("click", () => {
    // Checks if the user has entered values into any of the input fields or if they've been modified from 'currentTask'.
    const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
    const formInputValuesUpdated = titleInput.value !== currentTask.title
        || dateInput.value !== currentTask.date
        || descriptionInput.value !== currentTask.description;
    /* 'formInputsContainValues' is true if any field has text.
       'formInputValuesUpdated' is true if the text differs from what's stored in the currently loaded task. */

    // If there is data in the form that is not saved, shows the 'confirmCloseDialog'. Otherwise, resets the form.
    if (formInputsContainValues && formInputValuesUpdated) {
        confirmCloseDialog.showModal(); // Opens the dialog asking the user to confirm discarding changes.
    } else {
        reset(); // Immediately resets and hides the form if no changes need to be saved.
    }
});

// Adds a click event listener to 'cancelBtn' that closes the confirmation dialog without discarding the form data.
cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
/* This allows the user to continue editing without closing the form if they choose. */

// Adds a click event listener to 'discardBtn' that discards unsaved changes and resets the form.
discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close(); // Closes the dialog, indicating the user has chosen to discard.
    reset(); // Clears and hides the form, effectively discarding changes.
});

// Listens for the 'submit' event on 'taskForm' and intercepts the default behavior to handle task creation/updating.
taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevents a page refresh or navigation.
    /* This is important because the default form submission would reload the page, losing our data in the process. */

    addOrUpdateTask(); // Calls the function that either adds a new task or updates the existing one.
    /* By doing so on form submit, we keep everything in one place. 
       The user can then continue with new tasks or close the form as needed. */
});