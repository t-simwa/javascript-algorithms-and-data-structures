function getRandomComputerResult() {
    // Function to randomly select Rock, Paper, or Scissors for the computer
    const options = ["Rock", "Paper", "Scissors"]; // Array containing the possible options
    const randomIndex = Math.floor(Math.random() * options.length);
    // Generates a random index between 0 and 2
    return options[randomIndex]; // Returns the randomly chosen option
}

function hasPlayerWonTheRound(player, computer) {
    // Function to check if the player wins the current round
    return (
        (player === "Rock" && computer === "Scissors") ||
        // Rock beats Scissors
        (player === "Scissors" && computer === "Paper") ||
        // Scissors beats Paper
        (player === "Paper" && computer === "Rock")
        // Paper beats Rock
    );
}

let playerScore = 0; // Initializes the player's score to 0
let computerScore = 0; // Initializes the computer's score to 0

function getRoundResults(userOption) {
    // Function to get the results of a single round
    const computerResult = getRandomComputerResult();
    // Gets the computer's choice

    if (hasPlayerWonTheRound(userOption, computerResult)) {
        // Checks if the player has won the round
        playerScore++; // Increments the player's score
        return `Player wins! ${userOption} beats ${computerResult}`;
        // Returns the result message
    } else if (computerResult === userOption) {
        // Checks if it's a tie
        return `It's a tie! Both chose ${userOption}`;
        // Returns the tie message
    } else {
        computerScore++; // Increments the computer's score
        return `Computer wins! ${computerResult} beats ${userOption}`;
        // Returns the result message for the computer's win
    }
}

const playerScoreSpanElement = document.getElementById("player-score");
// Gets the element displaying the player's score
const computerScoreSpanElement = document.getElementById("computer-score");
// Gets the element displaying the computer's score
const roundResultsMsg = document.getElementById("results-msg");
// Gets the element to display the round result message
const winnerMsgElement = document.getElementById("winner-msg");
// Gets the element to display the overall winner message
const optionsContainer = document.querySelector(".options-container");
// Gets the container holding the game options
const resetGameBtn = document.getElementById("reset-game-btn");
// Gets the reset game button element

function showResults(userOption) {
    // Function to display the results of a round
    roundResultsMsg.innerText = getRoundResults(userOption);
    // Updates the round result message
    computerScoreSpanElement.innerText = computerScore;
    // Updates the computer's score display
    playerScoreSpanElement.innerText = playerScore;
    // Updates the player's score display

    if (playerScore === 3 || computerScore === 3) {
        // Checks if either player or computer has won the game
        winnerMsgElement.innerText = `${playerScore === 3 ? "Player" : "Computer"
            } has won the game!`;
        // Displays the winner message based on who reached 3 points

        resetGameBtn.style.display = "block";
        // Shows the reset button
        optionsContainer.style.display = "none";
        // Hides the options container
    }
}

function resetGame() {
    // Function to reset the game state
    playerScore = 0; // Resets the player's score
    computerScore = 0; // Resets the computer's score
    playerScoreSpanElement.innerText = playerScore;
    // Updates the player's score display
    computerScoreSpanElement.innerText = computerScore;
    // Updates the computer's score display
    resetGameBtn.style.display = "none";
    // Hides the reset button
    optionsContainer.style.display = "block";
    // Shows the options container
    winnerMsgElement.innerText = "";
    // Clears the winner message
    roundResultsMsg.innerText = "";
    // Clears the round results message
}

resetGameBtn.addEventListener("click", resetGame);
// Adds a click event listener to the reset button to reset the game

const rockBtn = document.getElementById("rock-btn");
// Gets the button for the Rock option
const paperBtn = document.getElementById("paper-btn");
// Gets the button for the Paper option
const scissorsBtn = document.getElementById("scissors-btn");
// Gets the button for the Scissors option

rockBtn.addEventListener("click", function () {
    // Adds a click event listener to the Rock button
    showResults("Rock");
    // Calls the showResults function with "Rock" as the player's choice
});

paperBtn.addEventListener("click", function () {
    // Adds a click event listener to the Paper button
    showResults("Paper");
    // Calls the showResults function with "Paper" as the player's choice
});

scissorsBtn.addEventListener("click", function () {
    // Adds a click event listener to the Scissors button
    showResults("Scissors");
    // Calls the showResults function with "Scissors" as the player's choice
});
