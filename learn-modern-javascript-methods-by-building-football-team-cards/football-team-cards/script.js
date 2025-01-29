
// SECTION: DOM ELEMENT REFERENCES
// The lines in this section retrieve and store references to elements on the page.
// Each reference allows us to manipulate or read from these elements in later parts
// of the code, such as updating text content or appending new HTML structures.

// Selects the HTML element with the ID "team" and stores it in a constant named `teamName`.
// This element will display the team name in the UI.
const teamName = document.getElementById("team");

// Selects the HTML element with the ID "sport" and stores it in a constant named `typeOfSport`.
// This element will display the type of sport in the UI.
const typeOfSport = document.getElementById("sport");

// Selects the HTML element with the ID "year" and stores it in a constant named `worldCupYear`.
// This element will display the year in the UI, specifically when the team won the World Cup.
const worldCupYear = document.getElementById("year");

// Selects the HTML element with the ID "head-coach" and stores it in a constant named `headCoach`.
// This element will display the head coach's name in the UI.
const headCoach = document.getElementById("head-coach");

// Selects the container element with the ID "player-cards" and stores it in a constant named `playerCards`.
// This container will hold dynamically generated player cards.
const playerCards = document.getElementById("player-cards");

// Selects the dropdown menu element with the ID "players" and stores it in a constant named `playersDropdownList`.
// This dropdown will allow filtering players by certain criteria (e.g., position).
const playersDropdownList = document.getElementById("players");

// SECTION: DATA OBJECT
// This section defines the data for our favorite football team, including
// its basic info and details about players. The object is also frozen
// to prevent modifications.


// Defines an object named `myFavoriteFootballTeam` that holds information about the team.
const myFavoriteFootballTeam = {
    team: "Argentina",         // The name of the team to be displayed.
    sport: "Football",         // The type of sport this team plays.
    year: 1986,                // The year the team achieved a notable milestone (e.g., World Cup victory).
    isWorldCupWinner: true,    // A boolean indicating whether this team has won the World Cup.
    headCoach: {
        coachName: "Carlos Bilardo", // The head coach's name.
        matches: 7,                  // Total number of matches coached during the World Cup.
    },
    // An array of player objects, each describing an individual player's details.
    players: [
        {
            name: "Sergio Almirón",
            position: "forward",
            number: 1,
            isCaptain: false,
            nickname: null,
        },
        {
            name: "Sergio Batista",
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
            nickname: "El Bocha",
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
            isCaptain: true, // Marked true because he served as the team captain.
            nickname: "El Pibe de Oro",
        },
        {
            name: "Jorge Valdano",
            position: "forward",
            number: 11,
            isCaptain: false,
            nickname: "The Philosopher of Football",
        },
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

// Freezes the `myFavoriteFootballTeam` object, preventing any modifications to it.
// This is often done to keep data immutable, ensuring consistency in usage.
Object.freeze(myFavoriteFootballTeam);

// SECTION: DESTRUCTURING
// Destructures specific properties from the team object to simplify usage.
// We can directly reference `sport`, `team`, `year`, etc., without repeatedly
// writing `myFavoriteFootballTeam.sport`, for instance.


// Extracts `sport`, `team`, `year`, and `players` into local constants.
const { sport, team, year, players } = myFavoriteFootballTeam;

// Extracts the head coach's name into a constant named `coachName`.
const { coachName } = myFavoriteFootballTeam.headCoach;

// SECTION: DOM UPDATES
// Sets text content on various page elements to display the data we extracted.
// This provides the user interface with relevant information about the team
// immediately on page load.


// Displays the type of sport in the DOM by setting the `textContent` property.
typeOfSport.textContent = sport;

// Displays the team name in the DOM by setting the `textContent` property.
teamName.textContent = team;

// Displays the year the team won the World Cup in the DOM.
worldCupYear.textContent = year;

// Displays the head coach's name in the DOM.
headCoach.textContent = coachName;

// SECTION: FUNCTION TO CREATE AND DISPLAY PLAYER CARDS
// Defines a function that takes an array of player objects and renders them
// as cards inside the `playerCards` container. By default, it uses the
// entire `players` array, but customization is possible by passing a subset.

const setPlayerCards = (arr = players) => {
    // Appends HTML to the inner content of the `playerCards` container. We use
    // `map` to transform each player object into a piece of HTML. Then we join
    // the resulting array of strings into a single string for rendering.
    playerCards.innerHTML += arr
        .map(({ name, position, number, isCaptain, nickname }) => {
            // Each player is displayed with their name, position, number, and nickname.
            // We also conditionally show "(Captain)" if `isCaptain === true`.
            // If a nickname is null, we display "N/A" instead.
            return `
        <div class="player-card">
          <h2>${isCaptain ? "(Captain)" : ""} ${name}</h2>
          <p>Position: ${position}</p>
          <p>Number: ${number}</p>
          <p>Nickname: ${nickname !== null ? nickname : "N/A"}</p>
        </div>
      `;
        })
        .join(""); // Combines all HTML card segments into a single block.
};

// SECTION: EVENT LISTENER FOR PLAYER FILTERING
// An event listener is attached to the dropdown menu that filters displayed
// players based on user choices, such as position or nickname.

playersDropdownList.addEventListener("change", (e) => {
    // Clears the current card display so we can rebuild it according to the filter.
    playerCards.innerHTML = "";

    // Switch statement checks which filter option is selected by the user,
    // then calls `setPlayerCards` with a filtered array of players accordingly.
    switch (e.target.value) {
        case "nickname":
            // Filters players who have a non-null nickname field.
            setPlayerCards(players.filter((player) => player.nickname !== null));
            break;
        case "forward":
            // Filters players based on position: forward.
            setPlayerCards(players.filter((player) => player.position === "forward"));
            break;
        case "midfielder":
            // Filters players based on position: midfielder.
            setPlayerCards(players.filter((player) => player.position === "midfielder"));
            break;
        case "defender":
            // Filters players based on position: defender.
            setPlayerCards(players.filter((player) => player.position === "defender"));
            break;
        case "goalkeeper":
            // Filters players based on position: goalkeeper.
            setPlayerCards(players.filter((player) => player.position === "goalkeeper"));
            break;
        default:
            // If the user selects no specific filter,
            // we display all players by calling `setPlayerCards` with no filter.
            setPlayerCards();
    }
});