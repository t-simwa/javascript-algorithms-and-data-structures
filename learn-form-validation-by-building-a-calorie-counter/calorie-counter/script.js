const calorieCounter = document.getElementById('calorie-counter'); 
// Selects the form element for the calorie counter by its ID

const budgetNumberInput = document.getElementById('budget'); 
// Selects the input element for the calorie budget by its ID

const entryDropdown = document.getElementById('entry-dropdown'); 
// Selects the dropdown menu for selecting the entry type by its ID

const addEntryButton = document.getElementById('add-entry'); 
// Selects the button to add a new entry by its ID

const clearButton = document.getElementById('clear'); 
// Selects the button to clear all inputs by its ID

const output = document.getElementById('output'); 
// Selects the output container for displaying results by its ID

let isError = false; 
// A flag to track if there are any input errors

function cleanInputString(str) {
  const regex = /[+-\s]/g; 
  // Regular expression to match plus, minus, and whitespace characters
  return str.replace(regex, ''); 
  // Removes all matches of the regex from the input string
}

function isInvalidInput(str) {
  const regex = /\d+e\d+/i; 
  // Regular expression to match scientific notation (e.g., 1e10)
  return str.match(regex); 
  // Returns a match if the string contains scientific notation
}

function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); 
  // Selects the container corresponding to the selected entry type
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; 
  // Determines the next entry number by counting existing text inputs
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`; 
  // Creates the HTML string for the new entry inputs
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); 
  // Inserts the HTML string into the target container
}

function calculateCalories(e) {
  e.preventDefault(); 
  // Prevents the form from submitting and reloading the page
  isError = false; 
  // Resets the error flag

  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']"); 
  // Selects all number inputs in the breakfast section
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']"); 
  // Selects all number inputs in the lunch section
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']"); 
  // Selects all number inputs in the dinner section
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']"); 
  // Selects all number inputs in the snacks section
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']"); 
  // Selects all number inputs in the exercise section

  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs); 
  // Calculates the total calories for breakfast
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs); 
  // Calculates the total calories for lunch
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs); 
  // Calculates the total calories for dinner
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs); 
  // Calculates the total calories for snacks
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs); 
  // Calculates the total calories burned through exercise
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); 
  // Retrieves the calorie budget from the input field

  if (isError) {
    return; 
    // Stops execution if there is an input error
  }

  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories; 
  // Calculates total consumed calories
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories; 
  // Calculates remaining calories after consumption and exercise
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit'; 
  // Determines whether the user has a surplus or deficit
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `; 
  // Displays the calorie calculation results in the output container

  output.classList.remove('hide'); 
  // Makes the output container visible
}

function getCaloriesFromInputs(list) {
  let calories = 0; 
  // Initializes a variable to store the total calories

  for (const item of list) {
    const currVal = cleanInputString(item.value); 
    // Cleans the input value by removing invalid characters
    const invalidInputMatch = isInvalidInput(currVal); 
    // Checks if the input value is in scientific notation

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`); 
      // Alerts the user about the invalid input
      isError = true; 
      // Sets the error flag to true
      return null; 
      // Stops further processing and returns null
    }
    calories += Number(currVal); 
    // Adds the numeric value of the input to the total
  }
  return calories; 
  // Returns the total calories
}

function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container')); 
  // Selects all input containers and converts them to an array

  for (const container of inputContainers) {
    container.innerHTML = ''; 
    // Clears all inputs within each container
  }

  budgetNumberInput.value = ''; 
  // Clears the calorie budget input field
  output.innerText = ''; 
  // Clears the output container
  output.classList.add('hide'); 
  // Hides the output container
}

addEntryButton.addEventListener("click", addEntry); 
// Adds an event listener to the add entry button to call the addEntry function

calorieCounter.addEventListener("submit", calculateCalories); 
// Adds an event listener to the form to call the calculateCalories function on submit

clearButton.addEventListener("click", clearForm); 
// Adds an event listener to the clear button to call the clearForm function
