// SECTION: UTILITY FUNCTIONS

function getRandomComputerResult() {
    // Declaration of a function named `getRandomComputerResult` to randomly select Rock, Paper, or Scissors for the computer

    const options = ["Rock", "Paper", "Scissors"];
    /* Declaration of a constant variable `options` that holds an array of strings.
       - The array contains three elements: "Rock", "Paper", and "Scissors".
       - These represent the possible choices in the game. */

    const randomIndex = Math.floor(Math.random() * options.length);
    /* Declaration of a constant variable `randomIndex` that calculates a random index.
       - `Math.random()` generates a random floating-point number between 0 (inclusive) and 1 (exclusive).
       - `options.length` gives the number of elements in the `options` array, which is 3.
       - `Math.random() * options.length` results in a number between 0 and 3 (exclusive).
       - `Math.floor()` rounds down the result to the nearest whole number, producing an integer between 0 and 2. */

    return options[randomIndex];
    // Returns the element from the `options` array at the index `randomIndex`, which is a randomly chosen option.
}

function hasPlayerWonTheRound(player, computer) {
    // Declaration of a function named `hasPlayerWonTheRound` that checks if the player wins the current round.
    // It takes two parameters: `player` and `computer`, representing the player's and computer's choices, respectively.

    return (
        (player === "Rock" && computer === "Scissors") ||
        // Checks if the player's choice is "Rock" and the computer's choice is "Scissors". Rock beats Scissors.

        (player === "Scissors" && computer === "Paper") ||
        // Checks if the player's choice is "Scissors" and the computer's choice is "Paper". Scissors beats Paper.

        (player === "Paper" && computer === "Rock")
        // Checks if the player's choice is "Paper" and the computer's choice is "Rock". Paper beats Rock.
    );
    // Returns `true` if any of the above conditions are met, indicating the player has won the round.
}

// SECTION: SCORE VARIABLES

let playerScore = 0;
// Declaration of a variable `playerScore` initialized to 0.
// This variable keeps track of the player's score throughout the game.

let computerScore = 0;
// Declaration of a variable `computerScore` initialized to 0.
// This variable keeps track of the computer's score throughout the game.

// SECTION: GAME LOGIC FUNCTIONS

function getRoundResults(userOption) {
    // Declaration of a function named `getRoundResults` to determine the results of a single round.
    // It takes one parameter: `userOption`, representing the player's choice.

    const computerResult = getRandomComputerResult();
    // Declaration of a constant variable `computerResult` that stores the computer's choice.
    // Calls the `getRandomComputerResult` function to get a random choice for the computer.

    if (hasPlayerWonTheRound(userOption, computerResult)) {
        // Checks if the player has won the round by calling `hasPlayerWonTheRound` with `userOption` and `computerResult`.

        playerScore++;
        // Increments the `playerScore` by 1 if the player wins the round.

        return `Player wins! ${userOption} beats ${computerResult}`;
        // Returns a string message indicating the player wins, showing the player's and computer's choices.
    } else if (computerResult === userOption) {
        // Checks if the round is a tie by comparing `computerResult` and `userOption`.

        return `It's a tie! Both chose ${userOption}`;
        // Returns a string message indicating a tie, showing the choice both the player and computer made.
    } else {
        computerScore++;
        // Increments the `computerScore` by 1 if the computer wins the round.

        return `Computer wins! ${computerResult} beats ${userOption}`;
        // Returns a string message indicating the computer wins, showing the computer's and player's choices.
    }
}

// SECTION: DOM ELEMENTS

const playerScoreSpanElement = document.getElementById("player-score");
// Declaration of a constant variable `playerScoreSpanElement` that stores a reference to the DOM element with the ID "player-score".
// This element displays the player's score on the webpage.

const computerScoreSpanElement = document.getElementById("computer-score");
// Declaration of a constant variable `computerScoreSpanElement` that stores a reference to the DOM element with the ID "computer-score".
// This element displays the computer's score on the webpage.

const roundResultsMsg = document.getElementById("results-msg");
// Declaration of a constant variable `roundResultsMsg` that stores a reference to the DOM element with the ID "results-msg".
// This element displays the result message of each round on the webpage.

const winnerMsgElement = document.getElementById("winner-msg");
// Declaration of a constant variable `winnerMsgElement` that stores a reference to the DOM element with the ID "winner-msg".
// This element displays the overall winner message when the game ends.

const optionsContainer = document.querySelector(".options-container");
// Declaration of a constant variable `optionsContainer` that stores a reference to the DOM element with the class "options-container".
// This element contains the buttons for the game options (Rock, Paper, Scissors).

const resetGameBtn = document.getElementById("reset-game-btn");
// Declaration of a constant variable `resetGameBtn` that stores a reference to the DOM element with the ID "reset-game-btn".
// This element is the button used to reset the game.

// SECTION: DISPLAY FUNCTIONS

function showResults(userOption) {
    // Declaration of a function named `showResults` to display the results of a round.
    // It takes one parameter: `userOption`, representing the player's choice.

    roundResultsMsg.innerText = getRoundResults(userOption);
    // Updates the text content of the `roundResultsMsg` element with the result of the round.
    // Calls `getRoundResults` with `userOption` to get the result message.

    computerScoreSpanElement.innerText = computerScore;
    // Updates the text content of the `computerScoreSpanElement` with the current `computerScore`.

    playerScoreSpanElement.innerText = playerScore;
    // Updates the text content of the `playerScoreSpanElement` with the current `playerScore`.

    if (playerScore === 3 || computerScore === 3) {
        // Checks if either the player or the computer has reached a score of 3, indicating the end of the game.

        winnerMsgElement.innerText = `${playerScore === 3 ? "Player" : "Computer"} has won the game!`;
        /* Updates the text content of the `winnerMsgElement` with a message indicating the winner.
           - Uses a template literal to dynamically insert the winner's name based on who reached 3 points first.
           - The ternary operator `playerScore === 3 ? "Player" : "Computer"` determines the winner. */

        resetGameBtn.style.display = "block";
        // Sets the display style of the `resetGameBtn` element to "block", making it visible.

        optionsContainer.style.display = "none";
        // Sets the display style of the `optionsContainer` element to "none", hiding it.
    }
}

// SECTION: RESET FUNCTION

function resetGame() {
    // Declaration of a function named `resetGame` to reset the game state.

    playerScore = 0;
    // Resets the `playerScore` variable to 0.

    computerScore = 0;
    // Resets the `computerScore` variable to 0.

    playerScoreSpanElement.innerText = playerScore;
    // Updates the text content of the `playerScoreSpanElement` with the reset `playerScore`.

    computerScoreSpanElement.innerText = computerScore;
    // Updates the text content of the `computerScoreSpanElement` with the reset `computerScore`.

    resetGameBtn.style.display = "none";
    // Sets the display style of the `resetGameBtn` element to "none", hiding it.

    optionsContainer.style.display = "block";
    // Sets the display style of the `optionsContainer` element to "block", making it visible.

    winnerMsgElement.innerText = "";
    // Clears the text content of the `winnerMsgElement`, removing any winner message.

    roundResultsMsg.innerText = "";
    // Clears the text content of the `roundResultsMsg`, removing any round result message.
}

// SECTION: EVENT LISTENERS

resetGameBtn.addEventListener("click", resetGame);
// Adds a click event listener to the `resetGameBtn` element.
// When the button is clicked, the `resetGame` function is called to reset the game.

const rockBtn = document.getElementById("rock-btn");
// Declaration of a constant variable `rockBtn` that stores a reference to the DOM element with the ID "rock-btn".
// This element is the button for the Rock option.

const paperBtn = document.getElementById("paper-btn");
// Declaration of a constant variable `paperBtn` that stores a reference to the DOM element with the ID "paper-btn".
// This element is the button for the Paper option.

const scissorsBtn = document.getElementById("scissors-btn");
// Declaration of a constant variable `scissorsBtn` that stores a reference to the DOM element with the ID "scissors-btn".
// This element is the button for the Scissors option.

rockBtn.addEventListener("click", function () {
    // Adds a click event listener to the `rockBtn` element.
    // When the button is clicked, an anonymous function is executed.

    showResults("Rock");
    // Calls the `showResults` function with "Rock" as the argument, representing the player's choice.
});

paperBtn.addEventListener("click", function () {
    // Adds a click event listener to the `paperBtn` element.
    // When the button is clicked, an anonymous function is executed.

    showResults("Paper");
    // Calls the `showResults` function with "Paper" as the argument, representing the player's choice.
});

scissorsBtn.addEventListener("click", function () {
    // Adds a click event listener to the `scissorsBtn` element.
    // When the button is clicked, an anonymous function is executed.

    showResults("Scissors");
    // Calls the `showResults` function with "Scissors" as the argument, representing the player's choice.
});