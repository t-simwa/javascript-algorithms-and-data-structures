// Get references to various HTML elements by their unique IDs
const teamName = document.getElementById("team"); // Selects the HTML element where the team name will be displayed
const typeOfSport = document.getElementById("sport"); // Selects the HTML element where the type of sport will be displayed
const worldCupYear = document.getElementById("year"); // Selects the HTML element where the World Cup year will be displayed
const headCoach = document.getElementById("head-coach"); // Selects the HTML element where the head coach's name will be displayed
const playerCards = document.getElementById("player-cards"); // Selects the container where player cards will be dynamically added
const playersDropdownList = document.getElementById("players"); // Selects the dropdown menu for filtering players by criteria

// Define an object representing my favorite football team
const myFavoriteFootballTeam = {
    team: "Argentina", // The team's name
    sport: "Football", // The type of sport the team plays
    year: 1986, // The year the team won the World Cup
    isWorldCupWinner: true, // Boolean indicating whether the team won the World Cup
    headCoach: {
        coachName: "Carlos Bilardo", // Name of the head coach of the team
        matches: 7, // Total number of matches coached during the World Cup
    },
    players: [ // Array of player objects representing the team
        {
            name: "Sergio Almirón", // Name of the player
            position: "forward", // Position the player plays in
            number: 1, // Jersey number of the player
            isCaptain: false, // Indicates if the player is the captain
            nickname: null, // Nickname of the player (null if none)
        },
        {
            name: "Sergio Batista", // Another player object with the same structure
            position: "midfielder",
            number: 2,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Ricardo Bochini",
            position: "midfielder",
            number: 3,
            isCaptain: false,
            nickname: "El Bocha", // This player has a nickname
        },
        {
            name: "Claudio Borghi",
            position: "midfielder",
            number: 4,
            isCaptain: false,
            nickname: "Bichi",
        },
        {
            name: "José Luis Brown",
            position: "defender",
            number: 5,
            isCaptain: false,
            nickname: "Tata",
        },
        {
            name: "Daniel Passarella",
            position: "defender",
            number: 6,
            isCaptain: false,
            nickname: "El Gran Capitán",
        },
        {
            name: "Jorge Burruchaga",
            position: "forward",
            number: 7,
            isCaptain: false,
            nickname: "Burru",
        },
        {
            name: "Néstor Clausen",
            position: "defender",
            number: 8,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "José Luis Cuciuffo",
            position: "defender",
            number: 9,
            isCaptain: false,
            nickname: "El Cuchu",
        },
        {
            name: "Diego Maradona",
            position: "midfielder",
            number: 10,
            isCaptain: true, // This player is the team captain
            nickname: "El Pibe de Oro", // Nickname of the player
        },
        {
            name: "Jorge Valdano",
            position: "forward",
            number: 11,
            isCaptain: false,
            nickname: "The Philosopher of Football", // Nickname
        },
        // Remaining players have similar structures as above
        {
            name: "Héctor Enrique",
            position: "midfielder",
            number: 12,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Oscar Garré",
            position: "defender",
            number: 13,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Ricardo Giusti",
            position: "midfielder",
            number: 14,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Luis Islas",
            position: "goalkeeper",
            number: 15,
            isCaptain: false,
            nickname: "El loco",
        },
        {
            name: "Julio Olarticoechea",
            position: "defender",
            number: 16,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Pedro Pasculli",
            position: "forward",
            number: 17,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Nery Pumpido",
            position: "goalkeeper",
            number: 18,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Oscar Ruggeri",
            position: "defender",
            number: 19,
            isCaptain: false,
            nickname: "El Cabezón",
        },
        {
            name: "Carlos Tapia",
            position: "midfielder",
            number: 20,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Marcelo Trobbiani",
            position: "midfielder",
            number: 21,
            isCaptain: false,
            nickname: "Calesita",
        },
        {
            name: "Héctor Zelada",
            position: "goalkeeper",
            number: 22,
            isCaptain: false,
            nickname: null,
        },
    ],
};

// Freeze the myFavoriteFootballTeam object to prevent any modifications
Object.freeze(myFavoriteFootballTeam);

// Destructure properties from myFavoriteFootballTeam for easier access
const { sport, team, year, players } = myFavoriteFootballTeam; // Extracts sport, team, year, and players
const { coachName } = myFavoriteFootballTeam.headCoach; // Extracts the coachName from the headCoach object

// Set the text content of HTML elements to the respective properties of the team object
typeOfSport.textContent = sport; // Displays the type of sport in the DOM
teamName.textContent = team; // Displays the team name in the DOM
worldCupYear.textContent = year; // Displays the year in the DOM
headCoach.textContent = coachName; // Displays the head coach's name in the DOM

// Function to create and display player cards
const setPlayerCards = (arr = players) => {
    playerCards.innerHTML += arr // Iterate over the array of players
        .map(
            ({ name, position, number, isCaptain, nickname }) => { // Destructure player properties
                return `
        <div class="player-card">
          <h2>${isCaptain ? "(Captain)" : ""} ${name}</h2> <!-- Show if player is captain -->
          <p>Position: ${position}</p> <!-- Display position -->
          <p>Number: ${number}</p> <!-- Display jersey number -->
          <p>Nickname: ${nickname !== null ? nickname : "N/A"}</p> <!-- Show nickname or 'N/A' -->
        </div>
      ` }
        )
        .join(""); // Joins all HTML strings into a single string
};

// Event listener for dropdown menu changes to filter players
playersDropdownList.addEventListener("change", (e) => {
    playerCards.innerHTML = ""; // Clears the current player cards

    switch (e.target.value) { // Checks the selected dropdown value
        case "nickname":
            setPlayerCards(players.filter((player) => player.nickname !== null)); // Filters players with nicknames
            break;
        case "forward":
            setPlayerCards(players.filter((player) => player.position === "forward")); // Filters forwards
            break;
        case "midfielder":
            setPlayerCards(players.filter((player) => player.position === "midfielder")); // Filters midfielders
            break;
        case "defender":
            setPlayerCards(players.filter((player) => player.position === "defender")); // Filters defenders
            break;
        case "goalkeeper":
            setPlayerCards(players.filter((player) => player.position === "goalkeeper")); // Filters goalkeepers
            break;
        default:
            setPlayerCards(); // Displays all players if no filter is selected
    }
});
