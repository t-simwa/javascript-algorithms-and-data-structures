const startBtn = document.getElementById("start-btn");
// Retrieves the DOM element with the ID 'start-btn'. This is the button that starts the game.

const canvas = document.getElementById("canvas");
// Retrieves the DOM element with the ID 'canvas', which serves as the drawing surface for the game.

const startScreen = document.querySelector(".start-screen");
// Selects the first DOM element with the class 'start-screen', which displays the game's start screen.

const checkpointScreen = document.querySelector(".checkpoint-screen");
// Selects the first DOM element with the class 'checkpoint-screen', used to show checkpoint messages.

const checkpointMessage = document.querySelector(".checkpoint-screen > p");
// Selects the <p> (paragraph) element that is a direct child of the element with the class 'checkpoint-screen'. 
// This is where checkpoint-related messages are displayed.

const ctx = canvas.getContext("2d");
// Retrieves the 2D rendering context of the canvas element. This context is used to draw shapes, text, images, etc., on the canvas.

canvas.width = innerWidth;
// Sets the width of the canvas to the full width of the browser window (innerWidth).

canvas.height = innerHeight;
// Sets the height of the canvas to the full height of the browser window (innerHeight).

const gravity = 0.5;
// Defines the gravitational constant, which determines the downward acceleration applied to the player.

let isCheckpointCollisionDetectionActive = true;
// Boolean flag indicating whether checkpoint collision detection is enabled or disabled.

const proportionalSize = (size) => {
    // Declares a function named 'proportionalSize' that takes a single parameter 'size'.

    return innerHeight < 500
        ? Math.ceil((size / 500) * innerHeight) : size;
    // If the window's height is less than 500px, scales the 'size' proportionally based on the window's height.
    // Otherwise, returns the original size without modification.
};

class Player {
    // Defines a class named 'Player', representing the main character in the game.

    constructor() {
        // Constructor function to initialize the player's properties when a new Player instance is created.

        this.position = {
            // Object holding the player's x and y coordinates.
            x: proportionalSize(10),
            // Horizontal position of the player, initialized at a proportionally scaled value of 10.
            y: proportionalSize(400),
            // Vertical position of the player, initialized at a proportionally scaled value of 400.
        };

        this.velocity = {
            // Object holding the player's velocity (movement speed) in both x and y directions.
            x: 0,
            // Initial horizontal velocity set to 0 (no movement).
            y: 0,
            // Initial vertical velocity set to 0 (no movement).
        };

        this.width = proportionalSize(40);
        // Width of the player's rectangle, scaled proportionally.

        this.height = proportionalSize(40);
        // Height of the player's rectangle, scaled proportionally.
    }

    draw() {
        // Method to draw the player on the canvas.

        ctx.fillStyle = "#99c9ff";
        // Sets the fill color of the player's rectangle to a light blue (#99c9ff).

        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // Draws a filled rectangle at the player's current position (x, y) with the defined width and height.
    }

    update() {
        // Method to update the player's position and handle physics.

        this.draw();
        // Calls the draw method to render the player on the canvas.

        this.position.x += this.velocity.x;
        // Updates the player's horizontal position based on its current horizontal velocity.

        this.position.y += this.velocity.y;
        // Updates the player's vertical position based on its current vertical velocity.

        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            // Checks if the player is not falling below the bottom edge of the canvas.

            if (this.position.y < 0) {
                // Prevents the player from moving above the top edge of the canvas.

                this.position.y = 0;
                // Resets the player's vertical position to the top edge.

                this.velocity.y = gravity;
                // Applies gravity to the player's vertical velocity.
            }

            this.velocity.y += gravity;
            // Increases the player's vertical velocity due to gravity (downward pull).
        } else {
            // If the player is at or below the bottom edge of the canvas:

            this.velocity.y = 0;
            // Stops the player's vertical velocity to prevent further downward movement.
        }

        if (this.position.x < this.width) {
            // Checks if the player is moving beyond the left boundary of the canvas.

            this.position.x = this.width;
            // Resets the player's horizontal position to the left boundary.
        }

        if (this.position.x >= canvas.width - this.width * 2) {
            // Checks if the player is moving beyond the right boundary of the canvas.

            this.position.x = canvas.width - this.width * 2;
            // Resets the player's horizontal position to the right boundary.
        }
    }
}

class Platform {
    // Defines a class named 'Platform', representing a platform object in the game.

    constructor(x, y) {
        // Constructor to initialize a platform's properties. Takes two parameters: x (horizontal position) and y (vertical position).

        this.position = {
            // Object holding the platform's x and y coordinates.
            x,
            // Assigns the x parameter to the platform's horizontal position.
            y,
            // Assigns the y parameter to the platform's vertical position.
        };

        this.width = 200;
        // Sets the platform's width to 200 pixels.

        this.height = proportionalSize(40);
        // Sets the platform's height to a proportionally scaled value of 40 pixels.
    }

    draw() {
        // Method to draw the platform on the canvas.

        ctx.fillStyle = "#acd157";
        // Sets the fill color of the platform to green (#acd157).

        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // Draws a filled rectangle at the platform's position (x, y) with the defined width and height.
    }
}

class CheckPoint {
    // Defines a class named 'CheckPoint', representing a checkpoint object in the game.

    constructor(x, y, z) {
        // Constructor to initialize a checkpoint's properties. Takes three parameters: x, y, and z.

        this.position = {
            // Object holding the checkpoint's x and y coordinates.
            x,
            // Assigns the x parameter to the checkpoint's horizontal position.
            y,
            // Assigns the y parameter to the checkpoint's vertical position.
        };

        this.width = proportionalSize(40);
        // Sets the checkpoint's width to a proportionally scaled value of 40 pixels.

        this.height = proportionalSize(70);
        // Sets the checkpoint's height to a proportionally scaled value of 70 pixels.

        this.claimed = false;
        // Boolean property indicating whether the checkpoint has been claimed. Defaults to false.
    }

    draw() {
        // Method to draw the checkpoint on the canvas.

        ctx.fillStyle = "#f1be32";
        // Sets the fill color of the checkpoint to yellow (#f1be32).

        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // Draws a filled rectangle at the checkpoint's position (x, y) with the defined width and height.
    }

    claim() {
        // Method to claim the checkpoint, marking it as collected.

        this.width = 0;
        // Sets the checkpoint's width to 0, effectively making it invisible.

        this.height = 0;
        // Sets the checkpoint's height to 0, effectively making it invisible.

        this.position.y = Infinity;
        // Moves the checkpoint off the visible canvas area.

        this.claimed = true;
        // Marks the checkpoint as claimed.
    }
}

const player = new Player();
// Creates an instance of the Player class, representing the game's main character.

const platformPositions = [
    // Array of objects defining the positions of all platforms in the game.
    { x: 500, y: proportionalSize(450) },
    // Platform at position (500, proportional height of 450).
    { x: 700, y: proportionalSize(400) },
    // Platform at position (700, proportional height of 400).
    { x: 850, y: proportionalSize(350) },
    // Platform at position (850, proportional height of 350).
    { x: 900, y: proportionalSize(350) },
    // Platform at position (900, proportional height of 350).
    { x: 1050, y: proportionalSize(150) },
    // Platform at position (1050, proportional height of 150).
    { x: 2500, y: proportionalSize(450) },
    // Platform at position (2500, proportional height of 450).
    { x: 2900, y: proportionalSize(400) },
    // Platform at position (2900, proportional height of 400).
    { x: 3150, y: proportionalSize(350) },
    // Platform at position (3150, proportional height of 350).
    { x: 3900, y: proportionalSize(450) },
    // Platform at position (3900, proportional height of 450).
    { x: 4200, y: proportionalSize(400) },
    // Platform at position (4200, proportional height of 400).
    { x: 4400, y: proportionalSize(200) },
    // Platform at position (4400, proportional height of 200).
    { x: 4700, y: proportionalSize(150) },
    // Platform at position (4700, proportional height of 150).
];

const platforms = platformPositions.map(
    (platform) => new Platform(platform.x, platform.y)
    // Maps each platform position to a new Platform instance with the specified x and y coordinates.
);

const checkpointPositions = [
    // Array of objects defining the positions and identifiers of checkpoints in the game.
    { x: 1170, y: proportionalSize(80), z: 1 },
    // Checkpoint at position (1170, proportional height of 80) with an ID of 1.
    { x: 2900, y: proportionalSize(330), z: 2 },
    // Checkpoint at position (2900, proportional height of 330) with an ID of 2.
    { x: 4800, y: proportionalSize(80), z: 3 },
    // Checkpoint at position (4800, proportional height of 80) with an ID of 3.
];

const checkpoints = checkpointPositions.map(
    (checkpoint) => new CheckPoint(checkpoint.x, checkpoint.y, checkpoint.z)
    // Maps each checkpoint position to a new CheckPoint instance with the specified x, y, and z values.
);

const animate = () => {
    // Declares the animation loop function, which is recursively called to update the game state and render graphics.

    requestAnimationFrame(animate);
    // Requests the next animation frame, ensuring the animate function is called repeatedly.

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Clears the entire canvas, removing all previously drawn graphics.

    platforms.forEach((platform) => {
        // Iterates through the array of platforms.

        platform.draw();
        // Calls the draw method to render each platform.
    });

    checkpoints.forEach((checkpoint) => {
        // Iterates through the array of checkpoints.

        checkpoint.draw();
        // Calls the draw method to render each checkpoint.
    });

    player.update();
    // Calls the player's update method to apply physics, handle movement, and draw the player.


    if (keys.rightKey.pressed && player.position.x < proportionalSize(400)) {
        // Checks if the right key is pressed and the player’s x-position is less than 400 (proportional to screen height).

        player.velocity.x = 5;
        // Sets the player's horizontal velocity to 5, moving them to the right.
    } else if (keys.leftKey.pressed && player.position.x > proportionalSize(100)) {
        // Checks if the left key is pressed and the player’s x-position is greater than 100 (proportional to screen height).

        player.velocity.x = -5;
        // Sets the player's horizontal velocity to -5, moving them to the left.
    } else {
        // Executes if neither of the above conditions is true.

        player.velocity.x = 0;
        // Sets the player's horizontal velocity to 0, stopping horizontal movement.

        if (keys.rightKey.pressed && isCheckpointCollisionDetectionActive) {
            // Checks if the right key is pressed and checkpoint collision detection is active.

            platforms.forEach((platform) => {
                // Iterates through all platforms.

                platform.position.x -= 5;
                // Moves all platforms 5 pixels to the left to simulate player movement.
            });

            checkpoints.forEach((checkpoint) => {
                // Iterates through all checkpoints.

                checkpoint.position.x -= 5;
                // Moves all checkpoints 5 pixels to the left to simulate player movement.
            });
        } else if (keys.leftKey.pressed && isCheckpointCollisionDetectionActive) {
            // Checks if the left key is pressed and checkpoint collision detection is active.

            platforms.forEach((platform) => {
                // Iterates through all platforms.

                platform.position.x += 5;
                // Moves all platforms 5 pixels to the right to simulate player movement.
            });

            checkpoints.forEach((checkpoint) => {
                // Iterates through all checkpoints.

                checkpoint.position.x += 5;
                // Moves all checkpoints 5 pixels to the right to simulate player movement.
            });
        }
    }

    platforms.forEach((platform) => {
        // Iterates through all platforms to check for collisions with the player.

        const collisionDetectionRules = [
            // Defines an array of rules for detecting collisions between the player and a platform.
            player.position.y + player.height <= platform.position.y,
            // Ensures the player's bottom edge is above the platform's top edge.
            player.position.y + player.height + player.velocity.y >= platform.position.y,
            // Ensures the player's next frame will bring their bottom edge to the platform's top edge.
            player.position.x >= platform.position.x - player.width / 2,
            // Ensures the player's horizontal position overlaps with the platform's left edge.
            player.position.x <= platform.position.x + platform.width - player.width / 3,
            // Ensures the player's horizontal position overlaps with the platform's right edge.
        ];

        if (collisionDetectionRules.every((rule) => rule)) {
            // Checks if all collision rules are satisfied.

            player.velocity.y = 0;
            // Stops the player's vertical movement, simulating them landing on the platform.
            return;
            // Exits the current iteration as a collision has occurred.
        }

        const platformDetectionRules = [
            // Defines rules for detecting whether the player is directly on the platform.
            player.position.x >= platform.position.x - player.width / 2,
            // Ensures the player's x-position overlaps with the platform's left edge.
            player.position.x <= platform.position.x + platform.width - player.width / 3,
            // Ensures the player's x-position overlaps with the platform's right edge.
            player.position.y + player.height >= platform.position.y,
            // Ensures the player's bottom edge is below the platform's top edge.
            player.position.y <= platform.position.y + platform.height,
            // Ensures the player's top edge is above the platform's bottom edge.
        ];

        if (platformDetectionRules.every((rule) => rule)) {
            // Checks if all platform detection rules are satisfied.

            player.position.y = platform.position.y + player.height;
            // Adjusts the player's y-position to stay on the platform.
            player.velocity.y = gravity;
            // Applies gravity to simulate the player sliding off.
        }
    });

    checkpoints.forEach((checkpoint, index, checkpoints) => {
        // Iterates through all checkpoints to check for collisions with the player.

        const checkpointDetectionRules = [
            // Defines rules for detecting collisions between the player and a checkpoint.
            player.position.x >= checkpoint.position.x,
            // Ensures the player's x-position is past the checkpoint's left edge.
            player.position.y >= checkpoint.position.y,
            // Ensures the player's y-position is below the checkpoint's top edge.
            player.position.y + player.height <= checkpoint.position.y + checkpoint.height,
            // Ensures the player's bottom edge is above the checkpoint's bottom edge.
            isCheckpointCollisionDetectionActive,
            // Ensures checkpoint collision detection is active.
            player.position.x - player.width <= checkpoint.position.x - checkpoint.width + player.width * 0.9,
            // Ensures the player is within a valid x-range relative to the checkpoint.
            index === 0 || checkpoints[index - 1].claimed === true,
            // Ensures that the checkpoint is either the first in the sequence or the previous checkpoint has been claimed.
        ];

        if (checkpointDetectionRules.every((rule) => rule)) {
            // Checks if all checkpoint detection rules are satisfied.

            checkpoint.claim();
            // Claims the checkpoint by marking it as collected.

            if (index === checkpoints.length - 1) {
                // Checks if this is the last checkpoint.

                isCheckpointCollisionDetectionActive = false;
                // Disables checkpoint collision detection as the final checkpoint is reached.

                showCheckpointScreen("You reached the final checkpoint!");
                // Displays a message for reaching the final checkpoint.

                movePlayer("ArrowRight", 0, false);
                // Stops player movement after reaching the last checkpoint.
            } else if (player.position.x >= checkpoint.position.x && player.position.x <= checkpoint.position.x + 40) {
                // Checks if the player is within a small range of the checkpoint's x-position.

                showCheckpointScreen("You reached a checkpoint!");
                // Displays a message for reaching a checkpoint.
            }
        }
    });
}

    const keys = {
        // Object to track the state of directional keys.

        rightKey: {
            // Represents the state of the right arrow key.
            pressed: false,
            // Initially, the right arrow key is not pressed.
        },
        leftKey: {
            // Represents the state of the left arrow key.
            pressed: false,
            // Initially, the left arrow key is not pressed.
        },
    };

    const movePlayer = (key, xVelocity, isPressed) => {
        // Function to handle player movement based on key input.
        // `key` represents the pressed key (e.g., "ArrowLeft").
        // `xVelocity` is the velocity applied to the player horizontally.
        // `isPressed` determines whether the key is being pressed (true) or released (false).

        if (!isCheckpointCollisionDetectionActive) {
            // If checkpoint collision detection is inactive (e.g., after reaching the last checkpoint):
            player.velocity.x = 0;
            // Stop horizontal movement.
            player.velocity.y = 0;
            // Stop vertical movement.
            return;
            // Exit the function early since no movement is allowed.
        }

        switch (key) {
            // Determine behavior based on the key pressed.
            case "ArrowLeft":
                // Handles the left arrow key.
                keys.leftKey.pressed = isPressed;
                // Update the left key's pressed state.
                if (xVelocity === 0) player.velocity.x = xVelocity;
                // If no velocity is provided (xVelocity = 0), stop movement.
                player.velocity.x -= xVelocity;
                // Apply negative velocity to move the player left.
                break;
            // Exit the switch case.

            case "ArrowUp":
            case " ":
            case "Spacebar":
                // Handles the up arrow key or spacebar for jumping.
                player.velocity.y -= 8;
                // Decrease the player's vertical velocity to make them jump upwards.
                break;
            // Exit the switch case.

            case "ArrowRight":
                // Handles the right arrow key.
                keys.rightKey.pressed = isPressed;
                // Update the right key's pressed state.
                if (xVelocity === 0) player.velocity.x = xVelocity;
                // If no velocity is provided (xVelocity = 0), stop movement.
                player.velocity.x += xVelocity;
                // Apply positive velocity to move the player right.
                break;
            // Exit the switch case.
        }
    };

    const startGame = () => {
        // Function to start the game.

        canvas.style.display = "block";
        // Make the canvas visible to display the game area.

        startScreen.style.display = "none";
        // Hide the start screen to focus on the game.

        animate();
        // Begin the game's animation loop.
    };

    const showCheckpointScreen = (msg) => {
        // Function to display a checkpoint message to the player.
        // `msg` is the text to show (e.g., "You reached a checkpoint!").

        checkpointScreen.style.display = "block";
        // Make the checkpoint screen visible.

        checkpointMessage.textContent = msg;
        // Set the checkpoint message to the provided text.

        if (isCheckpointCollisionDetectionActive) {
            // If checkpoint collision detection is still active:
            setTimeout(() => (checkpointScreen.style.display = "none"), 2000);
            // Automatically hide the checkpoint screen after 2 seconds.
        }
    };

    startBtn.addEventListener("click", startGame);
    // Add a click event listener to the start button to begin the game when clicked.

    window.addEventListener("keydown", ({ key }) => movePlayer(key, 8, true));
    // Add an event listener for when a key is pressed. Pass the key, velocity, and pressed state to movePlayer.

    window.addEventListener("keyup", ({ key }) => movePlayer(key, 0, false));
// Add an event listener for when a key is released. Pass the key, zero velocity, and pressed state to movePlayer.

