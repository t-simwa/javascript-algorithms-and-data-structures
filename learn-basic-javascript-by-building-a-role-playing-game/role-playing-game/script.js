// SECTION: VARIABLE DECLARATIONS

let xp = 0;
/* Declaration of a variable 'xp' initialized to 0.
   - Represents the player's experience points in the game.
   - 'xp' will increase as the player gains experience through gameplay. */

let health = 100;
/* Declaration of a variable 'health' initialized to 100.
   - Represents the player's health or vitality.
   - 'health' decreases when the player takes damage and can be restored through certain actions. */

let gold = 50;
/* Declaration of a variable 'gold' initialized to 50.
   - Represents the player's starting gold, used for buying items or upgrades.
   - 'gold' will be spent or earned through various in-game transactions. */

let currentWeapon = 0;
/* Declaration of a variable 'currentWeapon' initialized to 0.
   - Represents the index of the current weapon in the player's inventory.
   - 'currentWeapon' changes as the player acquires new weapons. */

let fighting;
/* Declaration of a variable 'fighting' without initialization.
   - Will store the index of the monster currently being fought.
   - 'fighting' is set when the player engages in combat with a monster. */

let monsterHealth;
/* Declaration of a variable 'monsterHealth' without initialization.
   - Will store the health of the monster the player is currently fighting.
   - 'monsterHealth' decreases as the player attacks the monster. */

let inventory = ["stick"];
/* Declaration of a variable 'inventory' initialized as an array containing a single string "stick".
   - Represents the player's inventory, starting with one weapon.
   - 'inventory' expands as the player acquires new items. */

// SECTION: DOM ELEMENT SELECTION

const button1 = document.querySelector('#button1');
/* Declaration of a constant 'button1' assigned to the first button element selected by its ID.
   - 'button1' will be used to trigger specific game actions when clicked. */

const button2 = document.querySelector("#button2");
/* Declaration of a constant 'button2' assigned to the second button element selected by its ID.
   - 'button2' will be used to trigger specific game actions when clicked. */

const button3 = document.querySelector("#button3");
/* Declaration of a constant 'button3' assigned to the third button element selected by its ID.
   - 'button3' will be used to trigger specific game actions when clicked. */

const text = document.querySelector("#text");
/* Declaration of a constant 'text' assigned to the element where main game text is displayed.
   - 'text' will be updated to show narrative and instructions to the player. */

const xpText = document.querySelector("#xpText");
/* Declaration of a constant 'xpText' assigned to the HTML element displaying the player's experience points.
   - 'xpText' will be updated to reflect changes in the player's experience points. */

const healthText = document.querySelector("#healthText");
/* Declaration of a constant 'healthText' assigned to the element displaying the player's health.
   - 'healthText' will be updated to reflect changes in the player's health. */

const goldText = document.querySelector("#goldText");
/* Declaration of a constant 'goldText' assigned to the element displaying the player's gold amount.
   - 'goldText' will be updated to reflect changes in the player's gold. */

const monsterStats = document.querySelector("#monsterStats");
/* Declaration of a constant 'monsterStats' assigned to the container displaying the stats of the current monster.
   - 'monsterStats' will be shown or hidden depending on the game state. */

const monsterName = document.querySelector("#monsterName");
/* Declaration of a constant 'monsterName' assigned to the element showing the monster's name.
   - 'monsterName' will be updated to display the name of the monster being fought. */

const monsterHealthText = document.querySelector("#monsterHealth");
/* Declaration of a constant 'monsterHealthText' assigned to the element showing the monster's health.
   - 'monsterHealthText' will be updated to reflect changes in the monster's health. */

// SECTION: GAME DATA STRUCTURES

const weapons = [
    /* Declaration of a constant 'weapons' initialized as an array of weapon objects.
       - Each object represents a weapon available in the game with its name and power level. */
    { name: 'stick', power: 5 },
    /* First weapon object in the array.
       - 'name': "stick", the name of the weapon.
       - 'power': 5, the power level of the weapon. */
    { name: 'dagger', power: 30 },
    /* Second weapon object in the array.
       - 'name': "dagger", the name of the weapon.
       - 'power': 30, the power level of the weapon. */
    { name: 'claw hammer', power: 50 },
    /* Third weapon object in the array.
       - 'name': "claw hammer", the name of the weapon.
       - 'power': 50, the power level of the weapon. */
    { name: 'sword', power: 100 }
    /* Fourth weapon object in the array.
       - 'name': "sword", the name of the weapon.
       - 'power': 100, the power level of the weapon. */
];

const monsters = [
    /* Declaration of a constant 'monsters' initialized as an array of monster objects.
       - Each object represents a type of enemy in the game with specific attributes. */
    {
        name: "slime",
        /* The first monster object in the array.
           - 'name': "slime", the name of the monster. */
        level: 2,
        /* 'level': 2, the level of the "slime" monster, indicating its difficulty. */
        health: 15
        /* 'health': 15, the health points of the "slime" monster. */
    },
    {
        name: "fanged beast",
        /* The second monster object in the array.
           - 'name': "fanged beast", the name of the monster. */
        level: 8,
        /* 'level': 8, the level of the "fanged beast" monster, indicating it's stronger than the "slime". */
        health: 60
        /* 'health': 60, the health points of the "fanged beast" monster. */
    },
    {
        name: "dragon",
        /* The third monster object in the array.
           - 'name': "dragon", the name of the monster. */
        level: 20,
        /* 'level': 20, the level of the "dragon" monster, indicating it is a formidable foe. */
        health: 300
        /* 'health': 300, the health points of the "dragon" monster, making it the most difficult to defeat. */
    }
];

const locations = [
    /* Declaration of a constant 'locations' initialized as an array of location objects.
       - Each object represents a game location with specific properties and actions. */
    {
        name: "town square",
        /* The first location object in the array.
           - 'name': "town square", the name of the location. */
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        /* 'button text': An array of strings representing button labels for actions in the town square. */
        "button functions": [goStore, goCave, fightDragon],
        /* 'button functions': An array of functions corresponding to each button's action. */
        text: "You are in the town square. You see a sign that says \"Store\"."
        /* 'text': A string describing the town square setting. */
    },
    {
        name: "store",
        /* The second location object in the array.
           - 'name': "store", the name of the location. */
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        /* 'button text': An array of strings representing options for actions in the store. */
        "button functions": [buyHealth, buyWeapon, goTown],
        /* 'button functions': An array of functions to execute when each button is clicked. */
        text: "You enter the store."
        /* 'text': A string description displayed when the player enters the store. */
    },
    {
        name: "cave",
        /* The third location object in the array.
           - 'name': "cave", the name of the location. */
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        /* 'button text': An array of strings representing button labels for actions in the cave. */
        "button functions": [fightSlime, fightBeast, goTown],
        /* 'button functions': An array of functions to execute for each cave action. */
        text: "You enter the cave. You see some monsters."
        /* 'text': A string description of the cave location. */
    },
    {
        name: "fight",
        /* The fourth location object in the array.
           - 'name': "fight", the name of the location. */
        "button text": ["Attack", "Dodge", "Run"],
        /* 'button text': An array of strings representing options for combat actions. */
        "button functions": [attack, dodge, goTown],
        /* 'button functions': An array of functions for each combat option. */
        text: "You are fighting a monster."
        /* 'text': A string description displayed during a fight. */
    },
    {
        name: "kill monster",
        /* The fifth location object in the array.
           - 'name': "kill monster", the location name after successfully killing a monster. */
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        /* 'button text': An array of strings representing options to proceed after killing a monster. */
        "button functions": [goTown, goTown, easterEgg],
        /* 'button functions': An array of functions for the buttons, including an easter egg option. */
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
        /* 'text': A string description of the outcome after defeating a monster. */
    },
    {
        name: "lose",
        /* The sixth location object in the array.
           - 'name': "lose", the location displayed when the player loses the game. */
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        /* 'button text': An array of strings representing options to restart the game. */
        "button functions": [restart, restart, restart],
        /* 'button functions': An array of functions for restarting the game after losing. */
        text: "You die. &#x2620;"
        /* 'text': A string message displayed upon losing, with a skull and crossbones symbol. */
    },
    {
        name: "win",
        /* The seventh location object in the array.
           - 'name': "win", the location displayed when the player wins the game. */
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        /* 'button text': An array of strings representing options to replay the game after winning. */
        "button functions": [restart, restart, restart],
        /* 'button functions': An array of functions for restarting the game after winning. */
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
        /* 'text': A string message displayed upon winning, with a party popper emoji. */
    },
    {
        name: "easter egg",
        /* The eighth location object in the array.
           - 'name': "easter egg", a secret game location for the easter egg. */
        "button text": ["2", "8", "Go to town square?"],
        /* 'button text': An array of strings representing options for the easter egg. */
        "button functions": [pickTwo, pickEight, goTown],
        /* 'button functions': An array of functions corresponding to each button in the easter egg. */
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
        /* 'text': A string description of the easter egg gameplay. */
    }
];

// SECTION: INITIALIZE BUTTONS

// Initialize buttons with their respective functions for click events
button1.onclick = goStore;
/* Assigns the function 'goStore' to be triggered when 'button1' is clicked.
   - Navigates the player to the store location. */

button2.onclick = goCave;
/* Assigns the function 'goCave' to be triggered when 'button2' is clicked.
   - Navigates the player to the cave location. */

button3.onclick = fightDragon;
/* Assigns the function 'fightDragon' to be triggered when 'button3' is clicked.
   - Initiates a fight with the dragon monster. */

// SECTION: MAIN FUNCTIONS

function update(location) {
    /* Declaration of a function 'update' that takes a parameter 'location'.
       - Updates the game state and UI elements based on the current location. */
    monsterStats.style.display = "none";
    /* Sets the display style of 'monsterStats' to "none".
       - Hides the monster stats section, as it's not relevant for most locations. */
    button1.innerText = location["button text"][0];
    /* Updates the inner text of 'button1' based on the first element of the location's button text array. */
    button2.innerText = location["button text"][1];
    /* Updates the inner text of 'button2' based on the second element of the location's button text array. */
    button3.innerText = location["button text"][2];
    /* Updates the inner text of 'button3' based on the third element of the location's button text array. */
    button1.onclick = location["button functions"][0];
    /* Assigns the first function in the location's button functions array to 'button1'. */
    button2.onclick = location["button functions"][1];
    /* Assigns the second function in the location's button functions array to 'button2'. */
    button3.onclick = location["button functions"][2];
    /* Assigns the third function in the location's button functions array to 'button3'. */
    text.innerHTML = location.text;
    /* Updates the inner HTML of 'text' to the location's description. */
}

function goTown() {
    /* Declaration of a function 'goTown'.
       - Navigates the player to the town square location. */
    update(locations[0]);
    /* Calls the 'update' function with the first location (town square) in the locations array. */
}

function goStore() {
    /* Declaration of a function 'goStore'.
       - Navigates the player to the store location. */
    update(locations[1]);
    /* Calls the 'update' function with the second location (store) in the locations array. */
}

function goCave() {
    /* Declaration of a function 'goCave'.
       - Navigates the player to the cave location. */
    update(locations[2]);
    /* Calls the 'update' function with the third location (cave) in the locations array. */
}

function buyHealth() {
    /* Declaration of a function 'buyHealth'.
       - Allows the player to purchase health at the store. */
    if (gold >= 10) {
        /* Checks if the player has at least 10 gold to purchase health. */
        gold -= 10;
        /* Deducts 10 gold from the player's total. */
        health += 10;
        /* Adds 10 health points to the player's total health. */
        goldText.innerText = gold;
        /* Updates the inner text of 'goldText' to show the new total gold. */
        healthText.innerText = health;
        /* Updates the inner text of 'healthText' to show the new total health. */
    } else {
        text.innerText = "You do not have enough gold to buy health.";
        /* Updates the inner text of 'text' to display a message indicating insufficient gold. */
    }
}

function buyWeapon() {
    /* Declaration of a function 'buyWeapon'.
       - Allows the player to purchase a weapon at the store. */
    if (currentWeapon < weapons.length - 1) {
        /* Checks if there are more powerful weapons available to purchase. */
        if (gold >= 30) {
            /* Checks if the player has at least 30 gold to purchase a weapon. */
            gold -= 30;
            /* Deducts 30 gold from the player's total. */
            currentWeapon++;
            /* Increments the 'currentWeapon' index to select the next weapon in the array. */
            goldText.innerText = gold;
            /* Updates the inner text of 'goldText' to show the new total gold. */
            let newWeapon = weapons[currentWeapon].name;
            /* Retrieves the name of the newly purchased weapon. */
            text.innerText = "You now have a " + newWeapon + ".";
            /* Updates the inner text of 'text' to display a message showing the new weapon acquired. */
            inventory.push(newWeapon);
            /* Adds the new weapon to the player's inventory. */
            text.innerText += " In your inventory you have: " + inventory;
            /* Updates the inner text of 'text' to show the updated inventory. */
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
            /* Updates the inner text of 'text' to display a message indicating insufficient gold. */
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        /* Updates the inner text of 'text' to display a message if the player owns the strongest weapon. */
        button2.innerText = "Sell weapon for 15 gold";
        /* Changes the inner text of 'button2' to indicate selling the weapon for gold. */
        button2.onclick = sellWeapon;
        /* Assigns the 'sellWeapon' function to 'button2' for selling the weapon. */
    }
}

function sellWeapon() {
    /* Declaration of a function 'sellWeapon'.
       - Allows the player to sell a weapon for gold. */
    if (inventory.length > 1) {
        /* Checks if the player has more than one weapon in their inventory. */
        gold += 15;
        /* Adds 15 gold to the player's total from selling the weapon. */
        goldText.innerText = gold;
        /* Updates the inner text of 'goldText' to show the new total gold. */
        let currentWeapon = inventory.shift();
        /* Removes the first weapon from the inventory and stores it in 'currentWeapon'. */
        text.innerText = "You sold a " + currentWeapon + ".";
        /* Updates the inner text of 'text' to display a message showing the weapon sold. */
        text.innerText += " In your inventory you have: " + inventory;
        /* Updates the inner text of 'text' to show the updated inventory. */
    } else {
        text.innerText = "Don't sell your only weapon!";
        /* Updates the inner text of 'text' to display a message if the player tries to sell their only weapon. */
    }
}

function fightSlime() {
    /* Declaration of a function 'fightSlime'.
       - Initiates a fight with the slime monster. */
    fighting = 0;
    /* Sets the 'fighting' variable to 0, corresponding to the slime monster's index. */
    goFight();
    /* Calls the 'goFight' function to start the combat sequence. */
}

function fightBeast() {
    /* Declaration of a function 'fightBeast'.
       - Initiates a fight with the fanged beast monster. */
    fighting = 1;
    /* Sets the 'fighting' variable to 1, corresponding to the fanged beast monster's index. */
    goFight();
    /* Calls the 'goFight' function to start the combat sequence. */
}

function fightDragon() {
    /* Declaration of a function 'fightDragon'.
       - Initiates a fight with the dragon monster. */
    fighting = 2;
    /* Sets the 'fighting' variable to 2, corresponding to the dragon monster's index. */
    goFight();
    /* Calls the 'goFight' function to start the combat sequence. */
}

function goFight() {
    /* Declaration of a function 'goFight'.
       - Transitions to the fight location and sets up combat with the selected monster. */
    update(locations[3]);
    /* Calls the 'update' function with the fight location, which is the fourth entry in the locations array. */
    monsterHealth = monsters[fighting].health;
    /* Sets the 'monsterHealth' variable to the health of the selected monster. */
    monsterStats.style.display = "block";
    /* Sets the display style of 'monsterStats' to "block", showing monster details during combat. */
    monsterName.innerText = monsters[fighting].name;
    /* Updates the inner text of 'monsterName' to show the selected monster's name. */
    monsterHealthText.innerText = monsterHealth;
    /* Updates the inner text of 'monsterHealthText' to show the monster's current health. */
}

function attack() {
    /* Declaration of a function 'attack'.
       - Handles the player's attack action during combat. */
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    /* Updates the inner text of 'text' to indicate the monster is attacking. */
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    /* Appends to the inner text of 'text' to indicate the player is attacking the monster with their current weapon. */
    health -= getMonsterAttackValue(monsters[fighting].level);
    /* Reduces the player's health by the attack value calculated based on the monster's level. */
    if (isMonsterHit()) {
        /* Checks if the player's attack successfully hits the monster. */
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
        /* Reduces the monster's health by the weapon's power, a random XP factor, and a base value of 1. */
    } else {
        /* Executes if the player's attack misses. */
        text.innerText += " You miss.";
        /* Appends to the inner text of 'text' indicating the player's attack missed. */
    }
    healthText.innerText = health;
    /* Updates the inner text of 'healthText' to show the player's current health. */
    monsterHealthText.innerText = monsterHealth;
    /* Updates the inner text of 'monsterHealthText' to show the monster's current health. */
    if (health <= 0) {
        /* Checks if the player's health has reached zero or below. */
        lose();
        /* Calls the 'lose' function, ending the game for the player. */
    } else if (monsterHealth <= 0) {
        /* Checks if the monster's health has reached zero or below. */
        if (fighting === 2) {
            /* Checks if the player was fighting the dragon (index 2 in the monsters array). */
            winGame();
            /* Calls the 'winGame' function if the dragon is defeated. */
        } else {
            /* Executes if the player defeated a non-dragon monster. */
            defeatMonster();
            /* Calls the 'defeatMonster' function to handle the monster's defeat. */
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) {
        /* Has a 10% chance of executing if the player has more than one weapon in the inventory. */
        text.innerText += " Your " + inventory.pop() + " breaks.";
        /* Removes the last weapon from the inventory and appends a message indicating the weapon broke. */
        currentWeapon--;
        /* Reduces the 'currentWeapon' index by 1, switching to the previous weapon. */
    }
}

function getMonsterAttackValue(level) {
    /* Declaration of a function 'getMonsterAttackValue' that takes a parameter 'level'.
       - Calculates the monster's attack value based on its level. */
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    /* Declaration of a constant 'hit' calculated as the monster's level multiplied by 5, reduced by a random XP-based value. */
    console.log(hit);
    /* Logs the calculated 'hit' value to the console for debugging purposes. */
    return hit > 0 ? hit : 0;
    /* Returns the 'hit' value if it's positive; otherwise, returns 0 to ensure no negative attack values. */
}

function isMonsterHit() {
    /* Declaration of a function 'isMonsterHit'.
       - Determines if the player's attack hits the monster. */
    return Math.random() > .2 || health < 20;
    /* Returns true if a random value is greater than 0.2 or if the player's health is below 20. */
}

function dodge() {
    /* Declaration of a function 'dodge'.
       - Handles the player's dodge action during combat. */
    text.innerText = "You dodge the attack from the " + monsters[fighting].name;
    /* Updates the inner text of 'text' to indicate the player successfully dodged the monster's attack. */
}

function defeatMonster() {
    /* Declaration of a function 'defeatMonster'.
       - Handles the player defeating a monster. */
    gold += Math.floor(monsters[fighting].level * 6.7);
    /* Increases the player's gold by a value based on the monster's level multiplied by 6.7. */
    xp += monsters[fighting].level;
    /* Increases the player's XP by the monster's level. */
    goldText.innerText = gold;
    /* Updates the inner text of 'goldText' to show the player's current gold. */
    xpText.innerText = xp;
    /* Updates the inner text of 'xpText' to show the player's current XP. */
    update(locations[4]);
    /* Calls the 'update' function to change the location to "kill monster". */
}

function lose() {
    /* Declaration of a function 'lose'.
       - Handles the player losing the game. */
    update(locations[5]);
    /* Calls the 'update' function to change the location to "lose". */
}

function winGame() {
    /* Declaration of a function 'winGame'.
       - Handles the player winning the game. */
    update(locations[6]);
    /* Calls the 'update' function to change the location to "win". */
}

function restart() {
    /* Declaration of a function 'restart'.
       - Restarts the game with initial values. */
    xp = 0;
    /* Resets the player's XP to 0. */
    health = 100;
    /* Resets the player's health to 100. */
    gold = 50;
    /* Resets the player's gold to 50. */
    currentWeapon = 0;
    /* Resets the player's current weapon index to the first weapon. */
    inventory = ["stick"];
    /* Resets the player's inventory to contain only the default "stick" weapon. */
    goldText.innerText = gold;
    /* Updates the inner text of 'goldText' to show the player's current gold. */
    healthText.innerText = health;
    /* Updates the inner text of 'healthText' to show the player's current health. */
    xpText.innerText = xp;
    /* Updates the inner text of 'xpText' to show the player's current XP. */
    goTown();
    /* Calls the 'goTown' function to return the player to the town location. */
}

function easterEgg() {
    /* Declaration of a function 'easterEgg'.
       - Starts the Easter egg sequence. */
    update(locations[7]);
    /* Calls the 'update' function to change the location to "easter egg". */
}

function pickTwo() {
    /* Declaration of a function 'pickTwo'.
       - Picks the number 2 in the Easter egg game. */
    pick(2);
    /* Calls the 'pick' function with a guess of 2. */
}

function pickEight() {
    /* Declaration of a function 'pickEight'.
       - Picks the number 8 in the Easter egg game. */
    pick(8);
    /* Calls the 'pick' function with a guess of 8. */
}

function pick(guess) {
    /* Declaration of a function 'pick' that takes a parameter 'guess'.
       - Handles the number guessing game logic. */
    const numbers = [];
    /* Declaration of a constant 'numbers' initialized as an empty array to store random numbers. */
    while (numbers.length < 10) {
        /* Continues adding numbers to the array until it contains 10 elements. */
        numbers.push(Math.floor(Math.random() * 11));
        /* Generates a random number between 0 and 10 and adds it to the array. */
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    /* Updates the inner text of 'text' to display the player's guess and a heading for the random numbers. */
    for (let i = 0; i < 10; i++) {
        /* Loops through the array of random numbers. */
        text.innerText += numbers[i] + "\n";
        /* Appends each number in the array to the inner text of 'text'. */
    }
    if (numbers.includes(guess)) {
        /* Checks if the player's guess is present in the array. */
        text.innerText += "Right! You win 20 gold!";
        /* Appends to the inner text of 'text' to display a win message. */
        gold += 20;
        /* Adds 20 gold to the player's total. */
        goldText.innerText = gold;
        /* Updates the inner text of 'goldText' to show the player's current gold. */
    } else {
        /* Executes if the player's guess is not in the array. */
        text.innerText += "Wrong! You lose 10 health!";
        /* Appends to the inner text of 'text' to display a lose message. */
        health -= 10;
        /* Deducts 10 health from the player. */
        healthText.innerText = health;
        /* Updates the inner text of 'healthText' to show the player's current health. */
        if (health <= 0) {
            /* Checks if the player's health has reached zero or below. */
            lose();
            /* Calls the 'lose' function, ending the game. */
        }
    }
}