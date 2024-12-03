let xp = 0; // Initializes experience points to 0
let health = 100; // Sets the player's health to 100
let gold = 50; // Sets the player's starting gold to 50
let currentWeapon = 0; // Index of the current weapon in the inventory
let fighting; // Variable to track the index of the monster being fought
let monsterHealth; // Variable to store the health of the current monster
let inventory = ["stick"]; // Initializes the player's inventory with a stick

const button1 = document.querySelector('#button1'); // Selects the first button element by its ID
const button2 = document.querySelector("#button2"); // Selects the second button element by its ID
const button3 = document.querySelector("#button3"); // Selects the third button element by its ID
const text = document.querySelector("#text"); // Selects the text element by its ID
const xpText = document.querySelector("#xpText"); // Selects the XP display element by its ID
const healthText = document.querySelector("#healthText"); // Selects the health display element by its ID
const goldText = document.querySelector("#goldText"); // Selects the gold display element by its ID
const monsterStats = document.querySelector("#monsterStats"); // Selects the monster stats container by its ID
const monsterName = document.querySelector("#monsterName"); // Selects the monster's name display by its ID
const monsterHealthText = document.querySelector("#monsterHealth"); // Selects the monster's health display by its ID
const weapons = [ // Array containing weapon objects with names and power levels
    { name: 'stick', power: 5 }, // Stick weapon with power 5
    { name: 'dagger', power: 30 }, // Dagger weapon with power 30
    { name: 'claw hammer', power: 50 }, // Claw hammer weapon with power 50
    { name: 'sword', power: 100 } // Sword weapon with power 100
];
const monsters = [ // Array containing monster objects with name, level, and health
    {
        name: "slime", // Monster name: Slime
        level: 2, // Monster level: 2
        health: 15 // Monster health: 15
    },
    {
        name: "fanged beast", // Monster name: Fanged Beast
        level: 8, // Monster level: 8
        health: 60 // Monster health: 60
    },
    {
        name: "dragon", // Monster name: Dragon
        level: 20, // Monster level: 20
        health: 300 // Monster health: 300
    }
];
const locations = [ // Array containing different game locations
    {
        name: "town square", // Location name: Town Square
        "button text": ["Go to store", "Go to cave", "Fight dragon"], // Text for location buttons
        "button functions": [goStore, goCave, fightDragon], // Functions triggered by buttons
        text: "You are in the town square. You see a sign that says \"Store\"." // Description of the location
    },
    {
        name: "store", // Location name: Store
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"], // Store options
        "button functions": [buyHealth, buyWeapon, goTown], // Functions for store actions
        text: "You enter the store." // Description of the store
    },
    {
        name: "cave", // Location name: Cave
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"], // Cave options
        "button functions": [fightSlime, fightBeast, goTown], // Functions for cave actions
        text: "You enter the cave. You see some monsters." // Description of the cave
    },
    {
        name: "fight", // Location name: Fight
        "button text": ["Attack", "Dodge", "Run"], // Combat options
        "button functions": [attack, dodge, goTown], // Functions for combat actions
        text: "You are fighting a monster." // Description of the combat scenario
    },
    {
        name: "kill monster", // Location for after defeating a monster
        "button text": ["Go to town square", "Go to town square", "Go to town square"], // Post-combat options
        "button functions": [goTown, goTown, easterEgg], // Functions for post-combat actions
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.' // Description after killing a monster
    },
    {
        name: "lose", // Location for when the player loses
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], // Replay options
        "button functions": [restart, restart, restart], // Functions for restarting the game
        text: "You die. &#x2620;" // Text displayed on losing
    },
    {
        name: "win", // Location for when the player wins
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], // Replay options after winning
        "button functions": [restart, restart, restart], // Functions for restarting after winning
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" // Text displayed on winning
    },
    {
        name: "easter egg", // Easter egg location
        "button text": ["2", "8", "Go to town square?"], // Options in the easter egg location
        "button functions": [pickTwo, pickEight, goTown], // Functions for easter egg options
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!" // Description of the easter egg
    }
];

// initialize buttons
button1.onclick = goStore; // Sets the function goStore to be triggered when button1 is clicked
button2.onclick = goCave; // Sets the function goCave to be triggered when button2 is clicked
button3.onclick = fightDragon; // Sets the function fightDragon to be triggered when button3 is clicked

function update(location) { // Function to update the game state when changing locations
    monsterStats.style.display = "none"; // Hides the monster stats section
    button1.innerText = location["button text"][0]; // Sets the text of button1 based on the location
    button2.innerText = location["button text"][1]; // Sets the text of button2 based on the location
    button3.innerText = location["button text"][2]; // Sets the text of button3 based on the location
    button1.onclick = location["button functions"][0]; // Sets the function for button1 based on the location
    button2.onclick = location["button functions"][1]; // Sets the function for button2 based on the location
    button3.onclick = location["button functions"][2]; // Sets the function for button3 based on the location
    text.innerHTML = location.text; // Updates the text content to describe the current location
}

function goTown() { // Function to go to the town square
    update(locations[0]); // Updates the game state to the town square location
}

function goStore() { // Function to go to the store
    update(locations[1]); // Updates the game state to the store location
}

function goCave() { // Function to go to the cave
    update(locations[2]); // Updates the game state to the cave location
}

function buyHealth() { // Function to buy health at the store
    if (gold >= 10) { // Checks if the player has enough gold to buy health
        gold -= 10; // Deducts 10 gold
        health += 10; // Adds 10 health
        goldText.innerText = gold; // Updates the gold display
        healthText.innerText = health; // Updates the health display
    } else {
        text.innerText = "You do not have enough gold to buy health."; // Displays a message if not enough gold
    }
}

function buyWeapon() { // Function to buy a weapon at the store
    if (currentWeapon < weapons.length - 1) { // Checks if the player can buy a stronger weapon
        if (gold >= 30) { // Checks if the player has enough gold to buy the weapon
            gold -= 30; // Deducts 30 gold
            currentWeapon++; // Increments the weapon index to the next weapon
            goldText.innerText = gold; // Updates the gold display
            let newWeapon = weapons[currentWeapon].name; // Gets the name of the newly purchased weapon
            text.innerText = "You now have a " + newWeapon + "."; // Displays the new weapon message
            inventory.push(newWeapon); // Adds the new weapon to the inventory
            text.innerText += " In your inventory you have: " + inventory; // Displays the updated inventory
        } else {
            text.innerText = "You do not have enough gold to buy a weapon."; // Displays a message if not enough gold
        }
    } else {
        text.innerText = "You already have the most powerful weapon!"; // Displays a message if the player already has the most powerful weapon
        button2.innerText = "Sell weapon for 15 gold"; // Changes the text of button2 to allow selling the weapon
        button2.onclick = sellWeapon; // Sets the function for selling the weapon when button2 is clicked
    }
}

function sellWeapon() { // Function to sell a weapon
    if (inventory.length > 1) { // Checks if the player has more than one weapon
        gold += 15; // Adds 15 gold from selling the weapon
        goldText.innerText = gold; // Updates the gold display
        let currentWeapon = inventory.shift(); // Removes the first weapon in the inventory
        text.innerText = "You sold a " + currentWeapon + "."; // Displays the weapon sold message
        text.innerText += " In your inventory you have: " + inventory; // Displays the updated inventory
    } else {
        text.innerText = "Don't sell your only weapon!"; // Displays a message if the player tries to sell their only weapon
    }
}

function fightSlime() { // Function to fight the slime
    fighting = 0; // Sets the fighting variable to the slime's index
    goFight(); // Calls the goFight function to start the fight
}

function fightBeast() { // Function to fight the fanged beast
    fighting = 1; // Sets the fighting variable to the fanged beast's index
    goFight(); // Calls the goFight function to start the fight
}

function fightDragon() { // Function to fight the dragon
    fighting = 2; // Sets the fighting variable to the dragon's index
    goFight(); // Calls the goFight function to start the fight
}

function goFight() { // Function to start a fight with the selected monster
    update(locations[3]); // Updates the game state to the fight location
    monsterHealth = monsters[fighting].health; // Sets the monster's health based on the selected monster
    monsterStats.style.display = "block"; // Displays the monster stats section
    monsterName.innerText = monsters[fighting].name; // Updates the displayed monster name
    monsterHealthText.innerText = monsterHealth; // Updates the displayed monster health
}

function attack() { // Function to handle the player's attack action
    text.innerText = "The " + monsters[fighting].name + " attacks."; // Displays the message that the monster attacks
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; // Displays the player's attack message
    health -= getMonsterAttackValue(monsters[fighting].level); // Reduces the player's health based on the monster's attack value
    if (isMonsterHit()) { // Checks if the attack hits the monster
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1; // Reduces the monster's health based on the weapon power and random XP factor
    } else {
        text.innerText += " You miss."; // Displays a message if the attack misses
    }
    healthText.innerText = health; // Updates the health display
    monsterHealthText.innerText = monsterHealth; // Updates the monster's health display
    if (health <= 0) { // Checks if the player has lost all health
        lose(); // Calls the lose function if the player dies
    } else if (monsterHealth <= 0) { // Checks if the monster's health is reduced to 0
        if (fighting === 2) { // Checks if the player is fighting the dragon
            winGame(); // Calls the winGame function if the dragon is defeated
        } else {
            defeatMonster(); // Calls the defeatMonster function if a non-dragon monster is defeated
        }
    }
    if (Math.random() <= .1 && inventory.length !== 1) { // 10% chance to break the weapon if the player has more than one weapon
        text.innerText += " Your " + inventory.pop() + " breaks."; // Displays the weapon break message
        currentWeapon--; // Decreases the currentWeapon index after the weapon breaks
    }
}

function getMonsterAttackValue(level) { // Function to calculate the monster's attack value
    const hit = (level * 5) - (Math.floor(Math.random() * xp)); // Calculates the hit value based on monster level and a random XP factor
    console.log(hit); // Logs the hit value to the console for debugging
    return hit > 0 ? hit : 0; // Ensures the hit value is non-negative and returns it
}

function isMonsterHit() { // Function to determine if the player's attack hits the monster
    return Math.random() > .2 || health < 20; // Returns true if the random chance is greater than 20% or player's health is below 20
}

function dodge() { // Function to handle the player's dodge action
    text.innerText = "You dodge the attack from the " + monsters[fighting].name; // Displays a message indicating the player dodged the monster's attack
}

function defeatMonster() { // Function to handle defeating a monster
    gold += Math.floor(monsters[fighting].level * 6.7); // Adds gold based on the monster's level
    xp += monsters[fighting].level; // Increases XP by the monster's level
    goldText.innerText = gold; // Updates the gold display
    xpText.innerText = xp; // Updates the XP display
    update(locations[4]); // Updates the game state to the "kill monster" location
}

function lose() { // Function to handle the player losing the game
    update(locations[5]); // Updates the game state to the "lose" location
}

function winGame() { // Function to handle the player winning the game
    update(locations[6]); // Updates the game state to the "win" location
}

function restart() { // Function to restart the game
    xp = 0; // Resets XP to 0
    health = 100; // Resets health to 100
    gold = 50; // Resets gold to 50
    currentWeapon = 0; // Resets current weapon to the first weapon
    inventory = ["stick"]; // Resets the inventory to only include the stick
    goldText.innerText = gold; // Updates the gold display
    healthText.innerText = health; // Updates the health display
    xpText.innerText = xp; // Updates the XP display
    goTown(); // Calls the goTown function to return to the town square
}

function easterEgg() { // Function to start the Easter egg game
    update(locations[7]); // Updates the game state to the "easter egg" location
}

function pickTwo() { // Function to pick the number 2 in the Easter egg game
    pick(2); // Calls the pick function with the guess of 2
}

function pickEight() { // Function to pick the number 8 in the Easter egg game
    pick(8); // Calls the pick function with the guess of 8
}

function pick(guess) { // Function to handle the number guessing in the Easter egg game
    const numbers = []; // Initializes an empty array for the random numbers
    while (numbers.length < 10) { // Loops until the array contains 10 numbers
        numbers.push(Math.floor(Math.random() * 11)); // Adds a random number between 0 and 10 to the array
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n"; // Displays the player's guess
    for (let i = 0; i < 10; i++) { // Loops through the random numbers array
        text.innerText += numbers[i] + "\n"; // Displays each random number
    }
    if (numbers.includes(guess)) { // Checks if the player's guess is in the random numbers array
        text.innerText += "Right! You win 20 gold!"; // Displays a win message
        gold += 20; // Adds 20 gold to the player's total
        goldText.innerText = gold; // Updates the gold display
    } else {
        text.innerText += "Wrong! You lose 10 health!"; // Displays a lose message
        health -= 10; // Deducts 10 health from the player
        healthText.innerText = health; // Updates the health display
        if (health <= 0) { // Checks if the player's health is 0 or below
            lose(); // Calls the lose function if the player dies
        }
    }
}

