// Selects all elements with the class "die" and stores them in a NodeList
const listOfAllDice = document.querySelectorAll(".die");

// Selects all input elements inside the element with the ID "score-options"
const scoreInputs = document.querySelectorAll("#score-options input");

// Selects all span elements inside the element with the ID "score-options"
const scoreSpans = document.querySelectorAll("#score-options span");

// Selects the element with the ID "current-round"
const roundElement = document.getElementById("current-round");

// Selects the element with the ID "current-round-rolls"
const rollsElement = document.getElementById("current-round-rolls");

// Selects the element with the ID "total-score"
const totalScoreElement = document.getElementById("total-score");

// Selects the element with the ID "score-history"
const scoreHistory = document.getElementById("score-history");

// Selects the element with the ID "roll-dice-btn"
const rollDiceBtn = document.getElementById("roll-dice-btn");

// Selects the element with the ID "keep-score-btn"
const keepScoreBtn = document.getElementById("keep-score-btn");

// Selects the first element with the class "rules-container"
const rulesContainer = document.querySelector(".rules-container");

// Selects the element with the ID "rules-btn"
const rulesBtn = document.getElementById("rules-btn");

// Initializes an empty array to store dice values
let diceValuesArr = [];

// Initializes a boolean to track if the rules modal is visible
let isModalShowing = false;

// Initializes the score to 0
let score = 0;

// Initializes the round number to 1
let round = 1;

// Initializes the number of rolls in the current round to 0
let rolls = 0;

// Function to roll the dice and update dice values
const rollDice = () => {
    // Resets the dice values array to empty before rolling
    diceValuesArr = [];

    // Rolls 5 dice, generating random values between 1 and 6
    for (let i = 0; i < 5; i++) {
        const randomDice = Math.floor(Math.random() * 6) + 1; // Generates a random number between 1 and 6
        diceValuesArr.push(randomDice); // Adds the generated number to the dice values array
    }

    // Updates the text content of each dice element with the corresponding value
    listOfAllDice.forEach((dice, index) => {
        dice.textContent = diceValuesArr[index]; // Sets the text content of the dice element
    });
};

// Function to update the displayed statistics (rounds and rolls)
const updateStats = () => {
    rollsElement.textContent = rolls; // Updates the text content with the number of rolls
    roundElement.textContent = round; // Updates the text content with the current round number
};

// Function to enable and update a specific radio option
const updateRadioOption = (index, score) => {
    scoreInputs[index].disabled = false; // Enables the radio button at the specified index
    scoreInputs[index].value = score; // Sets the value of the radio button to the provided score
    scoreSpans[index].textContent = `, score = ${score}`; // Updates the span to display the score
};

// Function to update the total score and score history
const updateScore = (selectedValue, achieved) => {
    score += parseInt(selectedValue); // Adds the selected score value to the total score
    totalScoreElement.textContent = score; // Updates the displayed total score

    // Adds the achieved score and description to the score history as a new list item
    scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

// Function to find the highest duplicate values in the dice array
const getHighestDuplicates = (arr) => {
    const counts = {}; // Object to store the count of each dice value

    // Counts occurrences of each number in the array
    for (const num of arr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1; // Increments the count or initializes it to 1
    }

    let highestCount = 0; // Tracks the highest count of duplicates

    // Iterates through the dice array to determine the highest count
    for (const num of arr) {
        const count = counts[num];
        if (count >= 3 && count > highestCount) { // Checks for at least 3 duplicates
            highestCount = count;
        }
        if (count >= 4 && count > highestCount) { // Checks for at least 4 duplicates
            highestCount = count;
        }
    }

    // Calculates the sum of all dice values
    const sumOfAllDice = arr.reduce((a, b) => a + b, 0);

    // Updates radio options for 4-of-a-kind and 3-of-a-kind based on highest count
    if (highestCount >= 4) {
        updateRadioOption(1, sumOfAllDice);
    }

    if (highestCount >= 3) {
        updateRadioOption(0, sumOfAllDice);
    }

    updateRadioOption(5, 0); // Updates a fallback radio option with a score of 0
};

// Function to detect a full house in the dice array
const detectFullHouse = (arr) => {
    const counts = {}; // Object to store the count of each dice value

    // Counts occurrences of each number in the array
    for (const num of arr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1; // Increments the count or initializes it to 1
    }

    // Checks for the presence of three-of-a-kind and a pair
    const hasThreeOfAKind = Object.values(counts).includes(3);
    const hasPair = Object.values(counts).includes(2);

    if (hasThreeOfAKind && hasPair) {
        updateRadioOption(2, 25); // Updates the radio option for a full house with a score of 25
    }

    updateRadioOption(5, 0); // Updates a fallback radio option with a score of 0
};

// Function to reset all radio button options
const resetRadioOptions = () => {
    scoreInputs.forEach((input) => {
        input.disabled = true; // Disables the radio button
        input.checked = false; // Unchecks the radio button
    });

    scoreSpans.forEach((span) => {
        span.textContent = ""; // Clears the text content of the span
    });
};

// Function to reset the game state
const resetGame = () => {
    diceValuesArr = [0, 0, 0, 0, 0]; // Resets the dice values array to all zeros
    score = 0; // Resets the total score to 0
    round = 1; // Resets the round number to 1
    rolls = 0; // Resets the number of rolls to 0

    // Updates the text content of each dice element with the reset dice values
    listOfAllDice.forEach((dice, index) => {
        dice.textContent = diceValuesArr[index];
    });

    totalScoreElement.textContent = score; // Updates the displayed total score
    scoreHistory.innerHTML = ""; // Clears the score history

    rollsElement.textContent = rolls; // Updates the displayed number of rolls
    roundElement.textContent = round; // Updates the displayed round number

    resetRadioOptions(); // Resets all radio button options
};

// Function to check for straights in the dice array
const checkForStraights = (arr) => {
    const counts = {}; // Object to store the count of each dice value

    // Counts occurrences of each number in the array
    for (const num of arr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1; // Increments the count or initializes it to 1
    }

    const keys = Object.keys(counts).join(''); // Joins the keys of the counts object into a string

    if (keys === '12345' || keys === "23456") {
        updateRadioOption(4, 40); // Updates the radio option for a large straight with a score of 40
    }

    if (keys.slice(0, 4) === '1234' || keys.slice(1, 5) === '2345') {
        updateRadioOption(3, 30); // Updates the radio option for a small straight with a score of 30
    }

    updateRadioOption(5, 0); // Updates a fallback radio option with a score of 0
};

// Adds an event listener to the "Roll Dice" button
rollDiceBtn.addEventListener("click", () => {
    if (rolls === 3) {
        alert("You have made three rolls this round. Please select a score."); // Alerts the user if they have made three rolls
    } else {
        rolls++; // Increments the number of rolls
        resetRadioOptions(); // Resets all radio button options
        rollDice(); // Rolls the dice
        updateStats(); // Updates the displayed statistics
        getHighestDuplicates(diceValuesArr); // Checks for highest duplicates in the dice array
        detectFullHouse(diceValuesArr); // Detects a full house in the dice array
        checkForStraights(diceValuesArr); // Checks for straights in the dice array
    }
});

// Adds an event listener to the "Rules" button
rulesBtn.addEventListener("click", () => {
    isModalShowing = !isModalShowing; // Toggles the modal visibility state

    if (isModalShowing) {
        rulesBtn.textContent = "Hide rules"; // Changes the button text to "Hide rules"
        rulesContainer.style.display = "block"; // Displays the rules container
    } else {
        rulesBtn.textContent = "Show rules"; // Changes the button text to "Show rules"
        rulesContainer.style.display = "none"; // Hides the rules container
    }
});

// Adds an event listener to the "Keep Score" button
keepScoreBtn.addEventListener("click", () => {
    let selectedValue; // Variable to store the selected radio button value
    let achieved; // Variable to store the achieved score description

    for (const radioButton of scoreInputs) {
        if (radioButton.checked) {
            selectedValue = radioButton.value; // Retrieves the value of the selected radio button
            achieved = radioButton.id; // Retrieves the ID of the selected radio button
            break; // Exits the loop after finding the selected button
        }
    }

    if (selectedValue) {
        rolls = 0; // Resets the number of rolls
        round++; // Increments the round number
        updateStats(); // Updates the displayed statistics
        resetRadioOptions(); // Resets all radio button options
        updateScore(selectedValue, achieved); // Updates the total score and score history
        if (round > 6) {
            setTimeout(() => {
                alert(`Game Over! Your total score is ${score}`); // Alerts the user that the game is over
                resetGame(); // Resets the game state
            }, 500); // Adds a delay of 500 milliseconds before showing the alert
        }
    } else {
        alert("Please select an option or roll the dice"); // Alerts the user to select a score option or roll the dice
    }
});
