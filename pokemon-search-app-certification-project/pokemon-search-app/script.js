// Selects the HTML element with the ID 'pokemon-id' and assigns it to the constant 'pokemonID'.
// This will be used to display the Pokémon's ID dynamically.
const pokemonID = document.getElementById('pokemon-id');

// Selects the HTML element with the ID 'pokemon-name' and assigns it to the constant 'pokemonName'.
// This will be used to display the Pokémon's name dynamically.
const pokemonName = document.getElementById('pokemon-name');

// Selects the HTML element with the ID 'sprite-container' and assigns it to the constant 'spriteContainer'.
// This is where the Pokémon's sprite (image) will be displayed dynamically.
const spriteContainer = document.getElementById('sprite-container');

// Selects the HTML element with the ID 'types' and assigns it to the constant 'types'.
// This will be used to display the Pokémon's types dynamically.
const types = document.getElementById('types');

// Selects the HTML element with the ID 'height' and assigns it to the constant 'height'.
// This will be used to display the Pokémon's height dynamically.
const height = document.getElementById('height');

// Selects the HTML element with the ID 'weight' and assigns it to the constant 'weight'.
// This will be used to display the Pokémon's weight dynamically.
const weight = document.getElementById('weight');

// Selects the HTML element with the ID 'hp' and assigns it to the constant 'hp'.
// This will be used to display the Pokémon's HP (Hit Points) dynamically.
const hp = document.getElementById('hp');

// Selects the HTML element with the ID 'attack' and assigns it to the constant 'attack'.
// This will be used to display the Pokémon's attack stat dynamically.
const attack = document.getElementById('attack');

// Selects the HTML element with the ID 'defense' and assigns it to the constant 'defense'.
// This will be used to display the Pokémon's defense stat dynamically.
const defense = document.getElementById('defense');

// Selects the HTML element with the ID 'special-attack' and assigns it to the constant 'specialAttack'.
// This will be used to display the Pokémon's special attack stat dynamically.
const specialAttack = document.getElementById('special-attack');

// Selects the HTML element with the ID 'special-defense' and assigns it to the constant 'specialDefense'.
// This will be used to display the Pokémon's special defense stat dynamically.
const specialDefense = document.getElementById('special-defense');

// Selects the HTML element with the ID 'speed' and assigns it to the constant 'speed'.
// This will be used to display the Pokémon's speed stat dynamically.
const speed = document.getElementById('speed');

// Selects the HTML element with the ID 'search-form' and assigns it to the constant 'searchForm'.
// This form will handle the Pokémon search functionality.
const searchForm = document.getElementById('search-form');

// Selects the HTML element with the ID 'search-input' and assigns it to the constant 'searchInput'.
// This input field will be used to enter the Pokémon's name or ID for searching.
const searchInput = document.getElementById('search-input');

// Defines an asynchronous function named 'getPokemon'.
// This function fetches data about a Pokémon from an external API and updates the UI.
const getPokemon = async () => {
    try {
        // Retrieves the value entered in the search input, converts it to lowercase, and assigns it to 'pokemonNameOrId'.
        const pokemonNameOrId = searchInput.value.toLowerCase();

        // Fetches data from the Pokémon API using the entered name or ID.
        const response = await fetch(
            `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`
        );

        // Parses the JSON response from the API and assigns it to 'data'.
        const data = await response.json();

        // Updates the text content of 'pokemonName' with the Pokémon's name in uppercase.
        pokemonName.textContent = `${data.name.toUpperCase()}`;

        // Updates the text content of 'pokemonID' with the Pokémon's ID, prefixed by a '#'.
        pokemonID.textContent = `#${data.id}`;

        // Updates the text content of 'weight' with the Pokémon's weight.
        weight.textContent = `Weight: ${data.weight}`;

        // Updates the text content of 'height' with the Pokémon's height.
        height.textContent = `Height: ${data.height}`;

        // Updates the inner HTML of 'spriteContainer' with an image element displaying the Pokémon's front sprite.
        spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;

        // Updates the text content of 'hp' with the Pokémon's HP stat.
        hp.textContent = data.stats[0].base_stat;

        // Updates the text content of 'attack' with the Pokémon's attack stat.
        attack.textContent = data.stats[1].base_stat;

        // Updates the text content of 'defense' with the Pokémon's defense stat.
        defense.textContent = data.stats[2].base_stat;

        // Updates the text content of 'specialAttack' with the Pokémon's special attack stat.
        specialAttack.textContent = data.stats[3].base_stat;

        // Updates the text content of 'specialDefense' with the Pokémon's special defense stat.
        specialDefense.textContent = data.stats[4].base_stat;

        // Updates the text content of 'speed' with the Pokémon's speed stat.
        speed.textContent = data.stats[5].base_stat;

        // Updates the inner HTML of 'types' with spans for each type the Pokémon has.
        // Each span has a class based on the type name for styling purposes.
        types.innerHTML = data.types
            .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
            .join('');
    } catch (err) {
        // Calls the 'resetDisplay' function to clear all displayed Pokémon data.
        resetDisplay();

        // Alerts the user that the Pokémon was not found.
        alert('Pokémon not found');

        // Logs an error message to the console with details about the error.
        console.log(`Pokémon not found: ${err}`);
    }
};

// Defines a function named 'resetDisplay' to clear all displayed Pokémon data.
const resetDisplay = () => {
    // Selects the sprite element by ID and assigns it to 'sprite'.
    const sprite = document.getElementById('sprite');

    // Removes the sprite element if it exists in the DOM.
    if (sprite) sprite.remove();

    // Clears the text content of 'pokemonName'.
    pokemonName.textContent = '';

    // Clears the text content of 'pokemonID'.
    pokemonID.textContent = '';

    // Clears the inner HTML of 'types'.
    types.innerHTML = '';

    // Clears the text content of 'height'.
    height.textContent = '';

    // Clears the text content of 'weight'.
    weight.textContent = '';

    // Clears the text content of 'hp'.
    hp.textContent = '';

    // Clears the text content of 'attack'.
    attack.textContent = '';

    // Clears the text content of 'defense'.
    defense.textContent = '';

    // Clears the text content of 'specialAttack'.
    specialAttack.textContent = '';

    // Clears the text content of 'specialDefense'.
    specialDefense.textContent = '';

    // Clears the text content of 'speed'.
    speed.textContent = '';
};

// Adds an event listener to 'searchForm' for the 'submit' event.
// Prevents the default form submission behavior and calls 'getPokemon'.
searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getPokemon();
});
