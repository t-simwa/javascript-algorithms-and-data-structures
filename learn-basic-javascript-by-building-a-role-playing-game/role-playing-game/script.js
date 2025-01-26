// SECTION: VARIABLE DECLARATIONS

let xp = 0;
// Initializes the player's experience points to 0, representing progress or skill level in the game.
// - 'xp' will be incremented as the player gains experience through gameplay.

let health = 100;
// Sets the player's health to the initial value of 100, representing the player's vitality.
// - 'health' will decrease when the player takes damage and can be restored through certain actions.

let gold = 50;
// Sets the player's starting gold to 50, which can be used to buy items or upgrades in the game.
// - 'gold' will be spent or earned through various in-game transactions.

let currentWeapon = 0;
// Initializes the index of the current weapon in the player's inventory to 0, pointing to the first weapon.
// - 'currentWeapon' will change as the player acquires new weapons.

let fighting;
// Declares a variable to store the index of the monster currently being fought, left undefined until assigned.
// - 'fighting' will be set when the player engages in combat with a monster.

let monsterHealth;
// Declares a variable to store the health of the monster the player is currently fighting.
// - 'monsterHealth' will decrease as the player attacks the monster.

let inventory = ["stick"];
// Initializes the player's inventory as an array containing a single weapon, "stick".
// - 'inventory' will expand as the player acquires new items.

// SECTION: DOM ELEMENT SELECTION

const button1 = document.querySelector('#button1');
// Selects the first button element from the HTML document using its ID and stores it in 'button1'.
// - 'button1' will be used to trigger specific game actions when clicked.

const button2 = document.querySelector("#button2");
// Selects the second button element by its ID and stores it in 'button2'.
// - 'button2' will be used to trigger specific game actions when clicked.

const button3 = document.querySelector("#button3");
// Selects the third button element by its ID and stores it in 'button3'.
// - 'button3' will be used to trigger specific game actions when clicked.

const text = document.querySelector("#text");
// Selects the element where main game text is displayed, identified by the ID 'text'.
// - 'text' will be updated to show narrative and instructions to the player.

const xpText = document.querySelector("#xpText");
// Selects the HTML element displaying the player's experience points, identified by the ID 'xpText'.
// - 'xpText' will be updated to reflect changes in the player's experience points.

const healthText = document.querySelector("#healthText");
// Selects the element displaying the player's health, identified by the ID 'healthText'.
// - 'healthText' will be updated to reflect changes in the player's health.

const goldText = document.querySelector("#goldText");
// Selects the element displaying the player's gold amount, identified by the ID 'goldText'.
// - 'goldText' will be updated to reflect changes in the player's gold.

const monsterStats = document.querySelector("#monsterStats");
// Selects the container displaying the stats of the current monster, identified by 'monsterStats'.
// - 'monsterStats' will be shown or hidden depending on the game state.

const monsterName = document.querySelector("#monsterName");
// Selects the element showing the monster's name, identified by the ID 'monsterName'.
// - 'monsterName' will be updated to display the name of the monster being fought.

const monsterHealthText = document.querySelector("#monsterHealth");
// Selects the element showing the monster's health, identified by the ID 'monsterHealth'.
// - 'monsterHealthText' will be updated to reflect changes in the monster's health.

// SECTION: GAME DATA STRUCTURES

const weapons = [
    // Declares an array of weapon objects, each representing a weapon available in the game with its name and power level.
    { name: 'stick', power: 5 },
    // First weapon in the game, named "stick," with a power level of 5.
    { name: 'dagger', power: 30 },
    // Second weapon in the game, named "dagger," with a power level of 30.
    { name: 'claw hammer', power: 50 },
    // Third weapon, "claw hammer," has a higher power level of 50.
    { name: 'sword', power: 100 }
    // Fourth weapon, "sword," with the highest power level of 100.
];

const monsters = [
    // Declares an array of monster objects, each representing a type of enemy in the game with specific attributes.
    {
        name: "slime",
        // The first monster's name is "slime."
        level: 2,
        // The "slime" monster has a level of 2, indicating its difficulty.
        health: 15
        // The "slime" monster has 15 health points.
    },
    {
        name: "fanged beast",
        // The second monster is named "fanged beast."
        level: 8,
        // The "fanged beast" monster has a level of 8, indicating it's stronger than the "slime."
        health: 60
        // The "fanged beast" monster has 60 health points.
    },
    {
        name: "dragon",
        // The third monster is named "dragon."
        level: 20,
        // The "dragon" monster has a level of 20, indicating it is a formidable foe.
        health: 300
        // The "dragon" monster has 300 health points, making it the most difficult to defeat.
    }
];

const locations = [
    // Declares an array of location objects, each representing a game location with specific properties and actions.
    {
        name: "town square",
        // The name of the first location is "town square."
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        // Button labels for actions in the town square.
        "button functions": [goStore, goCave, fightDragon],
        // Functions corresponding to each button's action.
        text: "You are in the town square. You see a sign that says \"Store\"."
        // Describes the town square setting.
    },
    {
        name: "store",
        // The name of the second location is "store."
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        // Options for actions in the store.
        "button functions": [buyHealth, buyWeapon, goTown],
        // Functions to execute when each button is clicked.
        text: "You enter the store."
        // Description displayed when the player enters the store.
    },
    {
        name: "cave",
        // The name of the third location is "cave."
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        // Button labels for actions in the cave.
        "button functions": [fightSlime, fightBeast, goTown],
        // Functions to execute for each cave action.
        text: "You enter the cave. You see some monsters."
        // Description of the cave location.
    },
    {
        name: "fight",
        // The name of the fourth location is "fight."
        "button text": ["Attack", "Dodge", "Run"],
        // Options for combat actions.
        "button functions": [attack, dodge, goTown],
        // Functions for each combat option.
        text: "You are fighting a monster."
        // Description displayed during a fight.
    },
    {
        name: "kill monster",
        // The location name after successfully killing a monster.
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        // Options to proceed after killing a monster.
        "button functions": [goTown, goTown, easterEgg],
        // Functions for the buttons, including an easter egg option.
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
        // Description of the outcome after defeating a monster.
    },
    {
        name: "lose",
        // The location displayed when the player loses the game.
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        // Options to restart the game.
        "button functions": [restart, restart, restart],
        // Functions for restarting the game after losing.
        text: "You die. &#x2620;"
        // Message displayed upon losing, with a skull and crossbones symbol.
    },
    {
        name: "win",
        // The location displayed when the player wins the game.
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        // Options to replay the game after winning.
        "button functions": [restart, restart, restart],
        // Functions for restarting the game after winning.
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
        // Message displayed upon winning, with a party popper emoji.
    },
    {
        name: "easter egg",
        // A secret game location for the easter egg.
        "button text": ["2", "8", "Go to town square?"],
        // Options for the easter egg.
        "button functions": [pickTwo, pickEight, goTown],
        // Functions corresponding to each button in the easter egg.
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
        // Description of the easter egg gameplay.
    }
];

// SECTION: INITIALIZE BUTTONS

// Initialize buttons with their respective functions for click events
button1.onclick = goStore;
// Sets the function goStore to be triggered when button1 is clicked.

button2.onclick = goCave;
// Sets the function goCave to be triggered when button2 is clicked.

button3.onclick = fightDragon;
// Sets the function fightDragon to be triggered when button3 is clicked.

// SECTION: MAIN FUNCTIONS

function update(location) {
    // Function to update the game state and UI elements based on the current location.
    monsterStats.style.display = "none";
    // Hides the monster stats section, as it's not relevant for most locations.
    button1.innerText = location["button text"][0];
    // Updates the text for button1 based on the location's button text array.
    button2.innerText = location["button text"][1];
    // Updates the text for button2 based on the location's button text array.
    button3.innerText = location["button text"][2];
    // Updates the text for button3 based on the location's button text array.
    button1.onclick = location["button functions"][0];
    // Assigns the first function in the location's button functions array to button1.
    button2.onclick = location["button functions"][1];
    // Assigns the second function in the location's button functions array to button2.
    button3.onclick = location["button functions"][2];
    // Assigns the third function in the location's button functions array to button3.
    text.innerHTML = location.text;
    // Updates the content of the text element to the location's description.
}

function goTown() {
    // Function to navigate to the town square location.
    update(locations[0]);
    // Updates the game state to the first location (town square) in the locations array.
}

function goStore() {
    // Function to navigate to the store location.
    update(locations[1]);
    // Updates the game state to the second location (store) in the locations array.
}

function goCave() {
    // Function to navigate to the cave location.
    update(locations[2]);
    // Updates the game state to the third location (cave) in the locations array.
}

function buyHealth() {
    // Function to allow the player to purchase health at the store.
    if (gold >= 10) {
        // Checks if the player has at least 10 gold to purchase health.
        gold -= 10;
        // Deducts 10 gold from the player's total.
        health += 10;
        // Adds 10 health points to the player's total health.
        goldText.innerText = gold;
        // Updates the gold display element to show the new total.
        healthText.innerText = health;
        // Updates the health display element to show the new total.
    } else {
        text.innerText = "You do not have enough gold to buy health.";
        // Displays a message indicating insufficient gold.
    }
}

function buyWeapon() {
    // Function to allow the player to purchase a weapon at the store.
    if (currentWeapon < weapons.length - 1) {
        // Checks if there are more powerful weapons available to purchase.
        if (gold >= 30) {
            // Checks if the player has at least 30 gold to purchase a weapon.
            gold -= 30;
            // Deducts 30 gold from the player's total.
            currentWeapon++;
            // Increments the currentWeapon index to select the next weapon in the array.
            goldText.innerText = gold;
            // Updates the gold display element to show the new total.
            let newWeapon = weapons[currentWeapon].name;
            // Retrieves the name of the newly purchased weapon.
            text.innerText = "You now have a " + newWeapon + ".";
            // Displays a message showing the new weapon acquired.
            inventory.push(newWeapon);
            // Adds the new weapon to the player's inventory.
            text.innerText += " In your inventory you have: " + inventory;
            // Updates the display to show the updated inventory.
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
            // Displays a message indicating insufficient gold.
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        // Displays a message if the player owns the strongest weapon.
        button2.innerText = "Sell weapon for 15 gold";
        // Changes button2 text to indicate selling the weapon for gold.
        button2.onclick = sellWeapon;
        // Assigns the sellWeapon function to button2 for selling the weapon.
    }
}

function sellWeapon() {
    // Function to allow the player to sell a weapon for gold.
    if (inventory.length > 1) {
        // Checks if the player has more than one weapon in their inventory.
        gold += 15;
        // Adds 15 gold to the player's total from selling the weapon.
        goldText.innerText = gold;
        // Updates the gold display element to show the new total.
        let currentWeapon = inventory.shift();
        // Removes the first weapon from the inventory and stores it in currentWeapon.
        text.innerText = "You sold a " + currentWeapon + ".";
        // Displays a message showing the weapon sold.
        text.innerText += " In your inventory you have: " + inventory;
        // Updates the display to show the updated inventory.
    } else {
        text.innerText = "Don't sell your only weapon!";
        // Displays a message if the player tries to sell their only weapon.
    }
}

function fightSlime() {
    // Function to initiate a fight with the slime monster.
    fighting = 0;
    // Sets the fighting variable to 0, corresponding to the slime monster's index.
    goFight();
    // Calls the goFight function to start the combat sequence.
}

function fightBeast() {
    // Function to initiate a fight with the fanged beast monster.
    fighting = 1;
    // Sets the fighting variable to 1, corresponding to the fanged beast monster's index.
    goFight();
    // Calls the goFight function to start the combat sequence.
}

function fightDragon() {
    // Function to initiate a fight with the dragon monster.
    fighting = 2;
    // Sets the fighting variable to 2, corresponding to the dragon monster's index.
    goFight();
    // Calls the goFight function to start the combat sequence.
}

function goFight() {
    // Function to transition to the fight location and set up combat with the selected monster.
    update(locations[3]);
    // Updates the game state to the fight location, which is the fourth entry in the locations array.
    monsterHealth = monsters[fighting].health;
    // Sets the monsterHealth variable to the health of the selected monster.
    monsterStats.style.display = "block";
    // Displays the monster stats section to show monster details during combat.
    monsterName.innerText = monsters[fighting].name;
    // Updates the monsterName display element to show the selected monster's name.
    monsterHealthText.innerText = monsterHealth;
    // Updates the monsterHealthText display element to show the monster's current health.
}

function attack() {
    // Function to handle the player's attack action
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    // Sets the text to indicate the monster is attacking
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    // Appends the text to indicate the player is attacking the monster with their current weapon
    health -= getMonsterAttackValue(monsters[fighting].level);
    // Reduces the player's health based on the attack value of the monster's level
    if (isMonsterHit()) {
        // Checks if the player's attack successfully hits the monster
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        // Reduces the monster's health by the weapon's power, a random XP factor, and a base value of 1
    } else {
        // Executes if the player's attack misses
        text.innerText += " You miss.";
        // Appends text indicating the player's attack missed
    }
    healthText.innerText = health;
    // Updates the HTML element showing the player's health
    monsterHealthText.innerText = monsterHealth;
    // Updates the HTML element showing the monster's health
    if (health <= 0) {
        // Checks if the player's health has reached zero or below
        lose();
        // Calls the lose function, ending the game for the player
    } else if (monsterHealth <= 0) {
        // Checks if the monster's health has reached zero or below
        if (fighting === 2) {
            // Checks if the player was fighting the dragon (index 2 in the monsters array)
            winGame();
            // Calls the winGame function if the dragon is defeated
        } else {
            // Executes if the player defeated a non-dragon monster
            defeatMonster();
            // Calls the defeatMonster function to handle the monster's defeat
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        // Has a 10% chance of executing if the player has more than one weapon in the inventory
        text.innerText += " Your " + inventory.pop() + " breaks.";
        // Removes the last weapon from the inventory and appends a message indicating the weapon broke
        currentWeapon--;
        // Reduces the current weapon index by 1, switching to the previous weapon
    }
}

function getMonsterAttackValue(level) {
    // Function to calculate the monster's attack value based on its level
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    // Calculates the hit value as the monster's level multiplied by 5, reduced by a random XP-based value
    console.log(hit);
    // Logs the calculated hit value to the console for debugging purposes
    return hit > 0 ? hit : 0;
    // Returns the hit value if it's positive; otherwise, returns 0 to ensure no negative attack values
}

function isMonsterHit() {
    // Function to determine if the player's attack hits the monster
    return Math.random() > .2 || health < 20;
    // Returns true if a random value is greater than 0.2 or if the player's health is below 20
}

function dodge() {
    // Function to handle the player's dodge action
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
    // Sets the text to indicate the player successfully dodged the monster's attack
}

function defeatMonster() {
    // Function to handle the player defeating a monster
    gold += Math.floor(monsters[fighting].level * 6.7);
    // Increases the player's gold by a value based on the monster's level multiplied by 6.7
    xp += monsters[fighting].level;
    // Increases the player's XP by the monster's level
    goldText.innerText = gold;
    // Updates the HTML element showing the player's gold
    xpText.innerText = xp;
    // Updates the HTML element showing the player's XP
    update(locations[4]);
    // Calls the update function to change the location to "kill monster"
}

function lose() {
    // Function to handle the player losing the game
    update(locations[5]);
    // Calls the update function to change the location to "lose"
}

function winGame() {
    // Function to handle the player winning the game
    update(locations[6]);
    // Calls the update function to change the location to "win"
}

function restart() {
    // Function to restart the game with initial values
    xp = 0;
    // Resets the player's XP to 0
    health = 100;
    // Resets the player's health to 100
    gold = 50;
    // Resets the player's gold to 50
    currentWeapon = 0;
    // Resets the player's current weapon index to the first weapon
    inventory = ["stick"];
    // Resets the player's inventory to contain only the default "stick" weapon
    goldText.innerText = gold;
    // Updates the HTML element showing the player's gold
    healthText.innerText = health;
    // Updates the HTML element showing the player's health
    xpText.innerText = xp;
    // Updates the HTML element showing the player's XP
    goTown();
    // Calls the goTown function to return the player to the town location
}

function easterEgg() {
    // Function to start the Easter egg sequence
    update(locations[7]);
    // Calls the update function to change the location to "easter egg"
}

function pickTwo() {
    // Function to pick the number 2 in the Easter egg game
    pick(2);
    // Calls the pick function with a guess of 2
}

function pickEight() {
    // Function to pick the number 8 in the Easter egg game
    pick(8);
    // Calls the pick function with a guess of 8
}

function pick(guess) {
    // Function to handle the number guessing game logic
    const numbers = [];
    // Initializes an empty array to store random numbers
    while (numbers.length < 10) {
        // Continues adding numbers to the array until it contains 10 elements
        numbers.push(Math.floor(Math.random() * 11));
        // Generates a random number between 0 and 10 and adds it to the array
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    // Displays the player's guess and a heading for the random numbers
    for (let i = 0; i < 10; i++) {
        // Loops through the array of random numbers
        text.innerText += numbers[i] + "\n";
        // Displays each number in the array
    }
    if (numbers.includes(guess)) {
        // Checks if the player's guess is present in the array
        text.innerText += "Right! You win 20 gold!";
        // Displays a win message
        gold += 20;
        // Adds 20 gold to the player's total
        goldText.innerText = gold;
        // Updates the HTML element showing the player's gold
    } else {
        // Executes if the player's guess is not in the array
        text.innerText += "Wrong! You lose 10 health!";
        // Displays a lose message
        health -= 10;
        // Deducts 10 health from the player
        healthText.innerText = health;
        // Updates the HTML element showing the player's health
        if (health <= 0) {
            // Checks if the player's health has reached zero or below
            lose();
            // Calls the lose function, ending the game
        }
    }
}