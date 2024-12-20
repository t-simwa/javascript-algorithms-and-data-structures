// Get the HTML elements by their ID for the playlist, control buttons, and shuffle button.
const playlistSongs = document.getElementById("playlist-songs"); // Element displaying the playlist of songs.
const playButton = document.getElementById("play"); // Element for the play button.
const pauseButton = document.getElementById("pause"); // Element for the pause button.
const nextButton = document.getElementById("next"); // Element for the next button.
const previousButton = document.getElementById("previous"); // Element for the previous button.
const shuffleButton = document.getElementById("shuffle"); // Element for the shuffle button.

// Array containing all the song data (e.g., title, artist, duration, and audio source).
const allSongs = [
    { id: 0, title: "Scratching The Surface", artist: "Quincy Larson", duration: "4:25", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/scratching-the-surface.mp3" },
    { id: 1, title: "Can't Stay Down", artist: "Quincy Larson", duration: "4:15", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/can't-stay-down.mp3" },
    { id: 2, title: "Still Learning", artist: "Quincy Larson", duration: "3:51", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/still-learning.mp3" },
    { id: 3, title: "Cruising for a Musing", artist: "Quincy Larson", duration: "3:34", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cruising-for-a-musing.mp3" },
    { id: 4, title: "Never Not Favored", artist: "Quincy Larson", duration: "3:35", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/never-not-favored.mp3" },
    { id: 5, title: "From the Ground Up", artist: "Quincy Larson", duration: "3:12", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/from-the-ground-up.mp3" },
    { id: 6, title: "Walking on Air", artist: "Quincy Larson", duration: "3:25", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/walking-on-air.mp3" },
    { id: 7, title: "Can't Stop Me. Can't Even Slow Me Down.", artist: "Quincy Larson", duration: "3:52", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/cant-stop-me-cant-even-slow-me-down.mp3" },
    { id: 8, title: "The Surest Way Out is Through", artist: "Quincy Larson", duration: "3:10", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/the-surest-way-out-is-through.mp3" },
    { id: 9, title: "Chasing That Feeling", artist: "Quincy Larson", duration: "2:43", src: "https://cdn.freecodecamp.org/curriculum/js-music-player/chasing-that-feeling.mp3" }
];

// Create a new audio object to manage the playback of the songs.
const audio = new Audio();

// Create an object to store user data, including the song list, the current song, and the current time of the song.
let userData = {
    songs: [...allSongs], // Copy of the song list.
    currentSong: null, // Initially, no song is playing.
    songCurrentTime: 0 // The initial time of the song is set to 0.
};

// Function to play a specific song by its ID.
const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id); // Find the song with the given ID.
    audio.src = song.src; // Set the audio source to the song's source URL.
    audio.title = song.title; // Set the audio title for accessibility.

    // If the song to play is different from the current song, reset the current time to 0.
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0; // Start the song from the beginning.
    } else {
        audio.currentTime = userData?.songCurrentTime; // Continue from where it left off.
    }

    userData.currentSong = song; // Set the current song to the one being played.
    playButton.classList.add("playing"); // Add the "playing" class to the play button for visual indication.

    highlightCurrentSong(); // Highlight the song in the playlist.
    setPlayerDisplay(); // Update the player UI to reflect the current song.
    setPlayButtonAccessibleText(); // Update the accessible text for the play button.
    audio.play(); // Start playing the audio.
};

// Function to pause the song.
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime; // Save the current time of the song when it is paused.

    playButton.classList.remove("playing"); // Remove the "playing" class from the play button.
    audio.pause(); // Pause the audio.
};

// Function to play the next song in the playlist.
const playNextSong = () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id); // If no song is playing, play the first song.
    } else {
        const currentSongIndex = getCurrentSongIndex(); // Get the index of the current song.
        const nextSong = userData?.songs[currentSongIndex + 1]; // Get the next song in the playlist.

        playSong(nextSong.id); // Play the next song.
    }
};

// Function to play the previous song in the playlist.
const playPreviousSong = () => {
    if (userData?.currentSong === null) return; // If no song is playing, do nothing.
    else {
        const currentSongIndex = getCurrentSongIndex(); // Get the index of the current song.
        const previousSong = userData?.songs[currentSongIndex - 1]; // Get the previous song in the playlist.

        playSong(previousSong.id); // Play the previous song.
    }
};

// Function to shuffle the playlist.
const shuffle = () => {
    userData?.songs.sort(() => Math.random() - 0.5); // Randomly reorder the songs in the playlist.
    userData.currentSong = null; // Reset the current song to null.
    userData.songCurrentTime = 0; // Reset the song's current time.

    renderSongs(userData?.songs); // Render the shuffled playlist.
    pauseSong(); // Pause the song (if playing).
    setPlayerDisplay(); // Update the UI to reflect the new playlist.
    setPlayButtonAccessibleText(); // Update the accessible text for the play button.
};

// Function to delete a song from the playlist.
const deleteSong = (id) => {
    // If the song being deleted is the current song, reset the current song and time.
    if (userData?.currentSong?.id === id) {
        userData.currentSong = null; // Reset the current song.
        userData.songCurrentTime = 0; // Reset the song's current time.

        pauseSong(); // Pause the audio.
        setPlayerDisplay(); // Update the UI.
    }

    // Remove the song from the playlist.
    userData.songs = userData?.songs.filter((song) => song.id !== id);
    renderSongs(userData?.songs); // Re-render the playlist without the deleted song.
    highlightCurrentSong(); // Highlight the current song in the playlist.
    setPlayButtonAccessibleText(); // Update the play button's accessible text.

    // If the playlist is empty, display a reset button.
    if (userData?.songs.length === 0) {
        const resetButton = document.createElement("button"); // Create a reset button.
        const resetText = document.createTextNode("Reset Playlist"); // Set the button text.

        resetButton.id = "reset"; // Set the reset button's ID.
        resetButton.ariaLabel = "Reset playlist"; // Set the reset button's ARIA label for accessibility.
        resetButton.appendChild(resetText); // Add the text to the reset button.
        playlistSongs.appendChild(resetButton); // Add the reset button to the playlist section.

        // Add an event listener to reset the playlist when the reset button is clicked.
        resetButton.addEventListener("click", () => {
            userData.songs = [...allSongs]; // Restore the original song list.

            renderSongs(sortSongs()); // Re-render the songs and sort them.
            setPlayButtonAccessibleText(); // Update the play button's accessible text.
            resetButton.remove(); // Remove the reset button from the UI.
        });
    }
};

// Function to update the UI with the current song details.
const setPlayerDisplay = () => {
    const playingSong = document.getElementById("player-song-title"); // Element showing the song title.
    const songArtist = document.getElementById("player-song-artist"); // Element showing the artist's name.
    const currentTitle = userData?.currentSong?.title; // Get the current song's title.
    const currentArtist = userData?.currentSong?.artist; // Get the current song's artist.

    playingSong.textContent = currentTitle ? currentTitle : ""; // Set the song title in the UI.
    songArtist.textContent = currentArtist ? currentArtist : ""; // Set the artist's name in the UI.
};

// Function to highlight the currently playing song in the playlist.
const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll(".playlist-song"); // Get all playlist song elements.
    const songToHighlight = document.getElementById(`song-${userData?.currentSong?.id}`); // Get the current song element by its ID.

    playlistSongElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current"); // Remove the aria-current attribute from all songs.
    });

    if (songToHighlight) songToHighlight.setAttribute("aria-current", "true"); // Set the aria-current attribute to highlight the current song.
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
      `;
        })
        .join(""); // Join the array of HTML strings into a single string.

    playlistSongs.innerHTML = songsHTML; // Set the innerHTML of the playlist container to the generated songs HTML.
};

// Function to update the accessible text for the play button.
const setPlayButtonAccessibleText = () => {
    const song = userData?.currentSong || userData?.songs[0]; // Get the current song or the first song if none is playing.

    // Set the accessible label for the play button, depending on whether there's a current song or not.
    playButton.setAttribute("aria-label", song?.title ? `Play ${song.title}` : "Play");
};

// Function to get the index of the current song in the playlist.
const getCurrentSongIndex = () => userData?.songs.indexOf(userData?.currentSong);

// Event listener for the play button to play the current or first song.
playButton.addEventListener("click", () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id); // If no song is playing, play the first song.
    } else {
        playSong(userData?.currentSong.id); // Play the current song.
    }
});

// Event listener for the pause button to pause the song.
pauseButton.addEventListener("click", pauseSong);

// Event listener for the next button to play the next song.
nextButton.addEventListener("click", playNextSong);

// Event listener for the previous button to play the previous song.
previousButton.addEventListener("click", playPreviousSong);

// Event listener for the shuffle button to shuffle the playlist.
shuffleButton.addEventListener("click", shuffle);

// Event listener for when the audio finishes playing to play the next song.
audio.addEventListener("ended", () => {
    const currentSongIndex = getCurrentSongIndex(); // Get the index of the current song.
    const nextSongExists = userData?.songs[currentSongIndex + 1] !== undefined; // Check if a next song exists.

    if (nextSongExists) {
        playNextSong(); // If a next song exists, play it.
    } else {
        userData.currentSong = null; // If no next song exists, reset the current song.
        userData.songCurrentTime = 0; // Reset the song's current time.
        pauseSong(); // Pause the audio.
        setPlayerDisplay(); // Update the UI to reflect no current song.
        highlightCurrentSong(); // Remove any song highlighting.
        setPlayButtonAccessibleText(); // Update the play button's accessible text.
    }
});

// Function to sort the songs alphabetically by their title.
const sortSongs = () => {
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
            return -1; // If song A comes before song B, return -1.
        }

        if (a.title > b.title) {
            return 1; // If song A comes after song B, return 1.
        }

        return 0; // If both songs have the same title, return 0.
    });

    return userData?.songs; // Return the sorted list of songs.
};

// Call the renderSongs and setPlayButtonAccessibleText functions to render the playlist and update the UI.
renderSongs(sortSongs());
setPlayButtonAccessibleText(); // Update the play button's accessible text for the initial song.
