// SECTION: HTML ELEMENT SELECTION
// Get the HTML elements by their ID for the playlist, control buttons, and shuffle button.
const playlistSongs = document.getElementById("playlist-songs"); // Selects the HTML element with the ID "playlist-songs" and assigns it to the variable playlistSongs. This element displays the list of songs in the playlist.
const playButton = document.getElementById("play"); // Selects the HTML element with the ID "play" and assigns it to the variable playButton. This element represents the play button in the music player.
const pauseButton = document.getElementById("pause"); // Selects the HTML element with the ID "pause" and assigns it to the variable pauseButton. This element represents the pause button in the music player.
const nextButton = document.getElementById("next"); // Selects the HTML element with the ID "next" and assigns it to the variable nextButton. This element represents the next button in the music player.
const previousButton = document.getElementById("previous"); // Selects the HTML element with the ID "previous" and assigns it to the variable previousButton. This element represents the previous button in the music player.
const shuffleButton = document.getElementById("shuffle"); // Selects the HTML element with the ID "shuffle" and assigns it to the variable shuffleButton. This element represents the shuffle button in the music player.

// SECTION: SONG DATA
// Array containing all the song data (e.g., title, artist, duration, and audio source).
const allSongs = [
    { id: 0, title: "Scratching The Surface", artist: "Quincy Larson", duration: "4:25", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3" }, // An object representing a song with an ID of 0, title "Scratching The Surface", artist "Quincy Larson", duration "4:25", and a source URL for the audio file.
    { id: 1, title: "Can't Stay Down", artist: "Quincy Larson", duration: "4:15", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3" }, // An object representing a song with an ID of 1, title "Can't Stay Down", artist "Quincy Larson", duration "4:15", and a source URL for the audio file.
    { id: 2, title: "Still Learning", artist: "Quincy Larson", duration: "3:51", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3" }, // An object representing a song with an ID of 2, title "Still Learning", artist "Quincy Larson", duration "3:51", and a source URL for the audio file.
    { id: 3, title: "Cruising for a Musing", artist: "Quincy Larson", duration: "3:34", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3" }, // An object representing a song with an ID of 3, title "Cruising for a Musing", artist "Quincy Larson", duration "3:34", and a source URL for the audio file.
    { id: 4, title: "Never Not Favored", artist: "Quincy Larson", duration: "3:35", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3" }, // An object representing a song with an ID of 4, title "Never Not Favored", artist "Quincy Larson", duration "3:35", and a source URL for the audio file.
    { id: 5, title: "From the Ground Up", artist: "Quincy Larson", duration: "3:12", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3" }, // An object representing a song with an ID of 5, title "From the Ground Up", artist "Quincy Larson", duration "3:12", and a source URL for the audio file.
    { id: 6, title: "Walking on Air", artist: "Quincy Larson", duration: "3:25", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3" }, // An object representing a song with an ID of 6, title "Walking on Air", artist "Quincy Larson", duration "3:25", and a source URL for the audio file.
    { id: 7, title: "Can't Stop Me. Can't Even Slow Me Down.", artist: "Quincy Larson", duration: "3:52", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3" }, // An object representing a song with an ID of 7, title "Can't Stop Me. Can't Even Slow Me Down.", artist "Quincy Larson", duration "3:52", and a source URL for the audio file.
    { id: 8, title: "The Surest Way Out is Through", artist: "Quincy Larson", duration: "3:10", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3" }, // An object representing a song with an ID of 8, title "The Surest Way Out is Through", artist "Quincy Larson", duration "3:10", and a source URL for the audio file.
    { id: 9, title: "Chasing That Feeling", artist: "Quincy Larson", duration: "2:43", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3" } // An object representing a song with an ID of 9, title "Chasing That Feeling", artist "Quincy Larson", duration "2:43", and a source URL for the audio file.
];

// SECTION: AUDIO OBJECT
// Create a new audio object to manage the playback of the songs.
const audio = new Audio(); // Creates a new instance of the Audio object, which is used to play audio files in the browser.

// SECTION: USER DATA
// Create an object to store user data, including the song list, the current song, and the current time of the song.
let userData = {
    songs: [...allSongs], // Creates a copy of the allSongs array and assigns it to the songs property of the userData object. This represents the list of songs available to the user.
    currentSong: null, // Initializes the currentSong property to null, indicating that no song is currently playing.
    songCurrentTime: 0 // Initializes the songCurrentTime property to 0, representing the starting time of the song when it begins playing.
};

// SECTION: MAIN FUNCTIONS
// Function to play a specific song by its ID.
const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id); // Searches the songs array in userData for a song with the specified ID and assigns it to the variable song.
    audio.src = song.src; // Sets the source of the audio object to the URL of the selected song's audio file.
    audio.title = song.title; // Sets the title of the audio object for accessibility purposes, using the title of the selected song.

    // If the song to play is different from the current song, reset the current time to 0.
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0; // Resets the current time of the audio to 0, starting the song from the beginning.
    } else {
        audio.currentTime = userData?.songCurrentTime; // Sets the current time of the audio to the saved current time, continuing the song from where it left off.
    }

    userData.currentSong = song; // Updates the currentSong property in userData to the song that is being played.
    playButton.classList.add("playing"); // Adds the "playing" class to the play button element, visually indicating that a song is playing.

    highlightCurrentSong(); // Calls the function to highlight the currently playing song in the playlist.
    setPlayerDisplay(); // Calls the function to update the player UI with the current song details.
    setPlayButtonAccessibleText(); // Calls the function to update the accessible text for the play button.
    audio.play(); // Starts playing the audio.
};

// Function to pause the song.
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime; // Saves the current time of the audio to the songCurrentTime property in userData when the song is paused.

    playButton.classList.remove("playing"); // Removes the "playing" class from the play button element, visually indicating that the song is paused.
    audio.pause(); // Pauses the audio playback.
};

// Function to play the next song in the playlist.
const playNextSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id); // If no song is currently playing, plays the first song in the playlist.
    } else {
        const currentSongIndex = getCurrentSongIndex(); // Calls the function to get the index of the current song in the playlist.
        const nextSong = userData?.songs[currentSongIndex + 1]; // Retrieves the next song in the playlist based on the current song's index.

        playSong(nextSong.id); // Calls the playSong function to play the next song.
    }
};

// Function to play the previous song in the playlist.
const playPreviousSong = () => {
    if (userData?.currentSong === null) return; // If no song is currently playing, exits the function without doing anything.
    else {
        const currentSongIndex = getCurrentSongIndex(); // Calls the function to get the index of the current song in the playlist.
        const previousSong = userData?.songs[currentSongIndex - 1]; // Retrieves the previous song in the playlist based on the current song's index.

        playSong(previousSong.id); // Calls the playSong function to play the previous song.
    }
};

// Function to shuffle the playlist.
const shuffle = () => {
    userData?.songs.sort(() => Math.random() - 0.5); // Randomly reorders the songs in the playlist using the sort method with a random comparison function.
    userData.currentSong = null; // Resets the currentSong property in userData to null, indicating that no song is currently playing.
    userData.songCurrentTime = 0; // Resets the songCurrentTime property in userData to 0, indicating the starting time of the song.

    renderSongs(userData?.songs); // Calls the function to render the shuffled playlist.
    pauseSong(); // Calls the function to pause the song, if one is playing.
    setPlayerDisplay(); // Calls the function to update the player UI with the current song details.
    setPlayButtonAccessibleText(); // Calls the function to update the accessible text for the play button.
};

// Function to delete a song from the playlist.
const deleteSong = (id) => {
    // If the song being deleted is the current song, reset the current song and time.
    if (userData?.currentSong?.id === id) {
        userData.currentSong = null; // Resets the currentSong property in userData to null, indicating that no song is currently playing.
        userData.songCurrentTime = 0; // Resets the songCurrentTime property in userData to 0, indicating the starting time of the song.

        pauseSong(); // Calls the function to pause the audio playback.
        setPlayerDisplay(); // Calls the function to update the player UI with the current song details.
    }

    // Remove the song from the playlist.
    userData.songs = userData?.songs.filter((song) => song.id !== id); // Filters the songs array in userData to remove the song with the specified ID.
    renderSongs(userData?.songs); // Calls the function to re-render the playlist without the deleted song.
    highlightCurrentSong(); // Calls the function to highlight the currently playing song in the playlist.
    setPlayButtonAccessibleText(); // Calls the function to update the accessible text for the play button.

    // If the playlist is empty, display a reset button.
    if (userData?.songs.length === 0) {
        const resetButton = document.createElement("button"); // Creates a new button element and assigns it to the variable resetButton.
        const resetText = document.createTextNode("Reset Playlist"); // Creates a new text node with the text "Reset Playlist" and assigns it to the variable resetText.

        resetButton.id = "reset"; // Sets the ID of the resetButton element to "reset".
        resetButton.ariaLabel = "Reset playlist"; // Sets the ARIA label of the resetButton element to "Reset playlist" for accessibility.
        resetButton.appendChild(resetText); // Appends the resetText node as a child of the resetButton element.
        playlistSongs.appendChild(resetButton); // Appends the resetButton element as a child of the playlistSongs element.

        // Add an event listener to reset the playlist when the reset button is clicked.
        resetButton.addEventListener("click", () => {
            userData.songs = [...allSongs]; // Restores the original song list by creating a copy of the allSongs array and assigning it to the songs property in userData.

            renderSongs(sortSongs()); // Calls the function to re-render the songs and sort them alphabetically.
            setPlayButtonAccessibleText(); // Calls the function to update the accessible text for the play button.
            resetButton.remove(); // Removes the resetButton element from the UI.
        });
    }
};

// SECTION: UI UPDATES
// Function to update the UI with the current song details.
const setPlayerDisplay = () => {
    const playingSong = document.getElementById("player-song-title"); // Selects the HTML element with the ID "player-song-title" and assigns it to the variable playingSong. This element displays the title of the currently playing song.
    const songArtist = document.getElementById("player-song-artist"); // Selects the HTML element with the ID "player-song-artist" and assigns it to the variable songArtist. This element displays the artist of the currently playing song.
    const currentTitle = userData?.currentSong?.title; // Retrieves the title of the current song from the userData object and assigns it to the variable currentTitle.
    const currentArtist = userData?.currentSong?.artist; // Retrieves the artist of the current song from the userData object and assigns it to the variable currentArtist.

    playingSong.textContent = currentTitle ? currentTitle : ""; // Sets the text content of the playingSong element to the current song's title, or an empty string if no song is playing.
    songArtist.textContent = currentArtist ? currentArtist : ""; // Sets the text content of the songArtist element to the current song's artist, or an empty string if no song is playing.
};

// Function to highlight the currently playing song in the playlist.
const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll(".playlist-song"); // Selects all HTML elements with the class "playlist-song" and assigns them to the variable playlistSongElements. These elements represent the songs in the playlist.
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`); // Selects the HTML element with the ID corresponding to the current song's ID and assigns it to the variable songToHighlight.

    playlistSongElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current"); // Removes the "aria-current" attribute from each song element, indicating that it is not the currently playing song.
    });

    if (songToHighlight) songToHighlight.setAttribute("aria-current", "true"); // If the songToHighlight element exists, sets its "aria-current" attribute to "true", indicating that it is the currently playing song.
};

// Function to render the songs in the playlist.
const renderSongs = (array) => {
    // Create the HTML structure for each song in the playlist.
    const songsHTML = array
        .map((song) => {
            return `
      <li id="song-${song.id}" class="playlist-song">
        <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
        </button>
        <button onclick="deleteSong(${song.id})" class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
      `; // Returns a string of HTML representing a list item for each song, including buttons for playing and deleting the song, and displaying the song's title, artist, and duration.
        })
        .join(""); // Joins the array of HTML strings into a single string, separating each song's HTML with no additional characters.

    playlistSongs.innerHTML = songsHTML; // Sets the innerHTML of the playlistSongs element to the generated songsHTML, rendering the playlist in the UI.
};

// Function to update the accessible text for the play button.
const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0]; // Retrieves the current song from userData, or the first song in the playlist if no song is playing.

    // Set the accessible label for the play button, depending on whether there's a current song or not.
    playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play"); // Sets the "aria-label" attribute of the playButton element to "Play" followed by the current song's title, or just "Play" if no song is playing.
};

// Function to get the index of the current song in the playlist.
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong); // Returns the index of the current song in the songs array of userData, or -1 if no song is playing.

// SECTION: EVENT LISTENERS
// Event listener for the play button to play the current or first song.
playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id); // If no song is currently playing, calls the playSong function to play the first song in the playlist.
    } else {
        playSong(userData?.currentSong.id); // Calls the playSong function to play the current song.
    }
});

// Event listener for the pause button to pause the song.
pauseButton.addEventListener("click", pauseSong); // Adds a click event listener to the pauseButton element, calling the pauseSong function when the button is clicked.

// Event listener for the next button to play the next song.
nextButton.addEventListener("click", playNextSong); // Adds a click event listener to the nextButton element, calling the playNextSong function when the button is clicked.

// Event listener for the previous button to play the previous song.
previousButton.addEventListener("click", playPreviousSong); // Adds a click event listener to the previousButton element, calling the playPreviousSong function when the button is clicked.

// Event listener for the shuffle button to shuffle the playlist.
shuffleButton.addEventListener("click", shuffle); // Adds a click event listener to the shuffleButton element, calling the shuffle function when the button is clicked.

// Event listener for when the audio finishes playing to play the next song.
audio.addEventListener("ended", () => {
    const currentSongIndex = getCurrentSongIndex(); // Calls the function to get the index of the current song in the playlist.
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined; // Checks if a next song exists in the playlist by verifying that the song at the next index is not undefined.

    if (nextSongExists) {
        playNextSong(); // If a next song exists, calls the playNextSong function to play it.
    } else {
        userData.currentSong = null; // If no next song exists, resets the currentSong property in userData to null, indicating that no song is currently playing.
        userData.songCurrentTime = 0; // Resets the songCurrentTime property in userData to 0, indicating the starting time of the song.
        pauseSong(); // Calls the function to pause the audio playback.
        setPlayerDisplay(); // Calls the function to update the player UI with the current song details.
        highlightCurrentSong(); // Calls the function to remove any song highlighting in the playlist.
        setPlayButtonAccessibleText(); // Calls the function to update the accessible text for the play button.
    }
});

// SECTION: SONG SORTING
// Function to sort the songs alphabetically by their title.
const sortSongs = () => {
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
            return -1; // If the title of song A comes before the title of song B alphabetically, returns -1 to place song A before song B.
        }

        if (a.title > b.title) {
            return 1; // If the title of song A comes after the title of song B alphabetically, returns 1 to place song A after song B.
        }

        return 0; // If both songs have the same title, returns 0 to leave their order unchanged.
    });

    return userData?.songs; // Returns the sorted list of songs.
};

// SECTION: INITIAL RENDERING
// Call the renderSongs and setPlayButtonAccessibleText functions to render the playlist and update the UI.
renderSongs(sortSongs()); // Calls the renderSongs function with the sorted list of songs to render the playlist in the UI.
setPlayButtonAccessibleText(); // Calls the setPlayButtonAccessibleText function to update the accessible text for the play button with the initial song.