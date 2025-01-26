// Begin script.js for the calorie counter application

// Section: VARIABLE DECLARATION & DOM ELEMENT SELECTION

const calorieCounter = document.getElementById('calorie-counter');
/* Selects the HTML element with the ID 'calorie-counter' and assigns it to the constant variable `calorieCounter`.
   - This element is expected to be a form used for managing calorie entries.
   - `document.getElementById` is a DOM method that returns the element with the specified ID. */

const budgetNumberInput = document.getElementById('budget');
/* Selects the HTML input element with the ID 'budget' and assigns it to the constant variable `budgetNumberInput`.
   - This input is used to capture the user's calorie budget.
   - `document.getElementById` is used to retrieve the element by its ID. */

const entryDropdown = document.getElementById('entry-dropdown');
/* Selects the HTML dropdown element with the ID 'entry-dropdown' and assigns it to the constant variable `entryDropdown`.
   - This dropdown allows users to select the type of entry they want to add (e.g., breakfast, lunch, etc.).
   - `document.getElementById` is used to retrieve the element by its ID. */

const addEntryButton = document.getElementById('add-entry');
/* Selects the HTML button element with the ID 'add-entry' and assigns it to the constant variable `addEntryButton`.
   - This button is used to trigger the addition of a new entry to the calorie counter.
   - `document.getElementById` is used to retrieve the element by its ID. */

const clearButton = document.getElementById('clear');
/* Selects the HTML button element with the ID 'clear' and assigns it to the constant variable `clearButton`.
   - This button is used to clear all inputs and reset the form.
   - `document.getElementById` is used to retrieve the element by its ID. */

const output = document.getElementById('output');
/* Selects the HTML element with the ID 'output' and assigns it to the constant variable `output`.
   - This element is used to display the results of the calorie calculations.
   - `document.getElementById` is used to retrieve the element by its ID. */

let isError = false;
/* Initializes a boolean variable `isError` to `false`.
   - This variable acts as a flag to track whether there are any input errors during the form processing.
   - It is used to control the flow of the program based on the presence of errors. */

// SECTION: UTILITY FUNCTIONS

function cleanInputString(str) {
  /* Function definition for `cleanInputString`, which takes a single parameter `str`.
     - This function is designed to clean the input string by removing certain characters. */

  const regex = /[+-\s]/g;
  /* Declaration of a constant variable `regex` that holds a regular expression.
     - The regular expression /[+-\s]/g is used to match specific characters in the string:
       - `+` matches the plus sign character.
       - `-` matches the minus sign character.
       - `\s` matches any whitespace character (spaces, tabs, etc.).
     - The `g` flag indicates a global search, meaning it will search for all matches in the string, not just the first one. */

  return str.replace(regex, '');
  /* Returns the result of calling the `replace` method on the input string `str`.
     - `str.replace(regex, '')` performs the following actions:
       - Searches the string `str` for all occurrences of characters that match the `regex`.
       - Replaces each matched character with an empty string `''`, effectively removing them from the string.
     - The cleaned string, with all plus, minus, and whitespace characters removed, is returned to the caller. */
}
/* End of cleanInputString function */

function isInvalidInput(str) {
  /* Function definition for `isInvalidInput`, which takes a single parameter `str`.
     - This function checks if the input string contains scientific notation, which is considered invalid for this application. */

  const regex = /\d+e\d+/i;
  /* Declaration of a constant variable `regex` that holds a regular expression.
     - The regular expression /\d+e\d+/i is used to match numbers in scientific notation:
       - `\d+` matches one or more digits.
       - `e` matches the letter 'e', which is used in scientific notation.
       - `\d+` matches one or more digits following the 'e'.
     - The `i` flag makes the search case-insensitive, allowing for both 'e' and 'E'. */

  return str.match(regex);
  /* Returns the result of calling the `match` method on the input string `str`.
     - `str.match(regex)` checks if the string contains a match for the scientific notation pattern.
     - If a match is found, it returns an array containing the matched string; otherwise, it returns `null`. */
}
/* End of isInvalidInput function */

// SECTION: MAIN FUNCTIONS

function addEntry() {
  /* Function definition for `addEntry`, which adds a new entry input field to the form.
     - This function is triggered by the `addEntryButton` when clicked. */

  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
  /* Selects the container corresponding to the selected entry type from the dropdown.
     - Uses a template literal to dynamically construct the selector based on the dropdown's current value.
     - `document.querySelector` is used to select the first element that matches the specified CSS selector. */

  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  /* Counts the number of text input fields already present in the selected container.
     - `targetInputContainer.querySelectorAll('input[type="text"]')` returns a NodeList of all text input elements within the container.
     - `.length` gives the number of elements in the NodeList.
     - `+ 1` increments the count to determine the number for the new entry. */

  const HTMLString = `
      <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
      <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
      <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
      <input type="number" min="0" id="${entryDropdown.value}-${entryNumber}-calories" placeholder="Calories" />`;
  /* Constructs a template literal `HTMLString` containing the HTML for the new entry inputs.
     - `<label>` elements are created for both the name and calorie input fields, with `for` attributes linked to the corresponding input IDs.
     - `<input>` elements are created for the entry's name and calories, with unique IDs based on the entry type and number.
     - The calorie input field has a `min` attribute set to `0`, ensuring only non-negative values are accepted. */

  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
  /* Inserts the constructed HTML string into the selected container.
     - `targetInputContainer.insertAdjacentHTML('beforeend', HTMLString)` adds the new entry inputs to the end of the container's existing content. */
}
/* End of addEntry function */

function calculateCalories(e) {
  /* Function definition for `calculateCalories`, which calculates and displays the calorie data.
     - This function is triggered by the `calorieCounter` form's submission event. */

  e.preventDefault();
  /* Calls the `preventDefault` method on the event object `e`.
     - Prevents the default form submission behavior, which would reload the page. */

  isError = false;
  /* Resets the `isError` flag to `false` at the start of the calculation process.
     - Ensures that any previous errors do not affect the current calculation. */

  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  /* Selects all number input fields in the breakfast section and assigns them to the constant variable `breakfastNumberInputs`.
     - `document.querySelectorAll` returns a NodeList of all matching elements. */

  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  /* Selects all number input fields in the lunch section and assigns them to the constant variable `lunchNumberInputs`.
     - `document.querySelectorAll` returns a NodeList of all matching elements. */

  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  /* Selects all number input fields in the dinner section and assigns them to the constant variable `dinnerNumberInputs`.
     - `document.querySelectorAll` returns a NodeList of all matching elements. */

  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  /* Selects all number input fields in the snacks section and assigns them to the constant variable `snacksNumberInputs`.
     - `document.querySelectorAll` returns a NodeList of all matching elements. */

  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");
  /* Selects all number input fields in the exercise section and assigns them to the constant variable `exerciseNumberInputs`.
     - `document.querySelectorAll` returns a NodeList of all matching elements. */

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  /* Calls the `getCaloriesFromInputs` function with `breakfastNumberInputs` as an argument.
     - Calculates the total calories for breakfast and assigns the result to the constant variable `breakfastCalories`. */

  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  /* Calls the `getCaloriesFromInputs` function with `lunchNumberInputs` as an argument.
     - Calculates the total calories for lunch and assigns the result to the constant variable `lunchCalories`. */

  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  /* Calls the `getCaloriesFromInputs` function with `dinnerNumberInputs` as an argument.
     - Calculates the total calories for dinner and assigns the result to the constant variable `dinnerCalories`. */

  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  /* Calls the `getCaloriesFromInputs` function with `snacksNumberInputs` as an argument.
     - Calculates the total calories for snacks and assigns the result to the constant variable `snacksCalories`. */

  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  /* Calls the `getCaloriesFromInputs` function with `exerciseNumberInputs` as an argument.
     - Calculates the total calories burned through exercise and assigns the result to the constant variable `exerciseCalories`. */

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  /* Calls the `getCaloriesFromInputs` function with an array containing `budgetNumberInput` as an argument.
     - Retrieves the calorie budget and assigns the result to the constant variable `budgetCalories`. */

  if (isError) { return; }
  /* Checks if there was an input error by evaluating the `isError` flag.
     - If `isError` is `true`, the function exits early using `return`, preventing further calculations. */

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  /* Calculates the total consumed calories by summing the calories from breakfast, lunch, dinner, and snacks.
     - The result is assigned to the constant variable `consumedCalories`. */

  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  /* Calculates the remaining calories by subtracting consumed calories from the budget and adding burned calories.
     - The result is assigned to the constant variable `remainingCalories`. */

  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';
  /* Determines if there is a calorie surplus or deficit based on the remaining calories.
     - Uses a ternary operator to assign 'Surplus' if `remainingCalories` is less than 0, otherwise assigns 'Deficit'.
     - The result is assigned to the constant variable `surplusOrDeficit`. */

  output.innerHTML = `
      <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
      <hr>
      <p>${budgetCalories} Calories Budgeted</p>
      <p>${consumedCalories} Calories Consumed</p>
      <p>${exerciseCalories} Calories Burned</p>`;
  /* Constructs a template literal to define the HTML content for the `output` container.
     - `<span>` element displays the absolute value of remaining calories and whether it's a surplus or deficit.
     - `<hr>` inserts a horizontal rule for visual separation.
     - `<p>` elements display the total calorie budget, consumed calories, and burned calories. */

  output.classList.remove('hide');
  /* Removes the `hide` class from the `output` container, making it visible.
     - `output.classList.remove('hide')` modifies the class list of the `output` element. */
}
/* End of calculateCalories function */

// SECTION: HELPER FUNCTIONS

function getCaloriesFromInputs(list) {
  /* Function definition for `getCaloriesFromInputs`, which calculates total calories from a list of input elements.
     - Takes a single parameter `list`, which is an array or NodeList of input elements. */

  let calories = 0;
  /* Initializes a variable `calories` to store the total calories.
     - Starts with a value of `0` and will accumulate the calorie values from the inputs. */

  for (const item of list) {
    /* Begins a loop to iterate over each input element in the `list`.
       - Uses a `for...of` loop to access each element in the iterable `list`. */

    const currVal = cleanInputString(item.value);
    /* Calls the `cleanInputString` function with the current input's value as an argument.
       - Cleans the input value by removing invalid characters and assigns the result to the constant variable `currVal`. */

    const invalidInputMatch = isInvalidInput(currVal);
    /* Calls the `isInvalidInput` function with `currVal` as an argument.
       - Checks if the cleaned input value is in scientific notation and assigns the result to the constant variable `invalidInputMatch`. */

    if (invalidInputMatch) {
      /* Begins a conditional block to handle invalid input.
         - Evaluates `invalidInputMatch` to determine if there is a match for scientific notation. */

      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      /* Alerts the user about the invalid input.
         - Displays a message with the matched scientific notation using a template literal. */

      isError = true;
      /* Sets the `isError` flag to `true` to indicate an input error.
         - This flag will prevent further calculations and display of results. */

      return null;
      /* Exits the function early, returning `null` due to the error.
         - Prevents further processing of the current input list. */
    }

    calories += Number(currVal);
    /* Converts the cleaned input value `currVal` to a number and adds it to the total `calories`.
       - Uses `Number()` to ensure the value is treated as a numeric type. */
  }

  return calories;
  /* Returns the total calories calculated from the inputs.
     - The accumulated value of `calories` is returned to the caller. */
}
/* End of getCaloriesFromInputs function */

// SECTION: FORM RESET FUNCTION

function clearForm() {
  /* Function definition for `clearForm`, which resets the form inputs.
     - This function is triggered by the `clearButton` when clicked. */

  const inputContainers = Array.from(document.querySelectorAll('.input-container'));
  /* Selects all elements with the class 'input-container' and converts the NodeList to an array.
     - `document.querySelectorAll` returns a NodeList of all matching elements.
     - `Array.from()` creates a new array from the NodeList, allowing for array methods to be used. */

  for (const container of inputContainers) {
    /* Begins a loop to iterate over each input container in the `inputContainers` array.
       - Uses a `for...of` loop to access each element in the array. */

    container.innerHTML = '';
    /* Clears all inputs within each container by setting their inner HTML to an empty string.
       - Removes all child elements and content from the container. */
  }

  budgetNumberInput.value = '';
  /* Clears the calorie budget input field by setting its value to an empty string.
     - Resets the input to its default state with no value. */

  output.innerText = '';
  /* Clears the `output` container by setting its inner text to an empty string.
     - Removes any displayed results from previous calculations. */

  output.classList.add('hide');
  /* Adds the `hide` class to the `output` container, making it invisible.
     - `output.classList.add('hide')` modifies the class list of the `output` element. */
}
/* End of clearForm function */

// SECTION: EVENT LISTENERS

addEntryButton.addEventListener("click", addEntry);
/* Adds an event listener to the `addEntryButton`.
   - Listens for the 'click' event and calls the `addEntry` function when the event occurs. */

calorieCounter.addEventListener("submit", calculateCalories);
/* Adds an event listener to the `calorieCounter` form.
   - Listens for the 'submit' event and calls the `calculateCalories` function when the event occurs. */

clearButton.addEventListener("click", clearForm);
/* Adds an event listener to the `clearButton`.
   - Listens for the 'click' event and calls the `clearForm` function when the event occurs. */

// End of script.js for the calorie counter application