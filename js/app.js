// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.x = x;
    this.y = y + 70;
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


    // If enemy has not passed boundary
    if(this.x < this.boundary) {
        // Move forward and increment x by speed * dt
        this.x += this.speed * dt;
    }
        
    else {
        // Reset position to the initial start pos
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// For showing the start modal on the screen

const startModal = document.querySelector('.start-modal'),
      play = document.querySelector('.start-button');

// listening for the DOMContentLoaded event then displaying the startModal
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        startModal.classList.toggle('hide');
    }, 500);
});

// Listening for click on the start button and removing the startModal to show game board
play.addEventListener('click', function() {
    startModal.classList.toggle('hide');
})

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// The Player Class
function Player() {
    // Player's properties
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 70;
    this.sprite = 'images/char-boy.png'; 
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
}

// Draw the player using the render function on current x and y position
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// reset function for game win
Player.prototype.reset = function() {
    this.x = this.startX;
    this.y = this.startY;
};

// Using the update function to check for collision and win and updates player's position
Player.prototype.update = function() {
    // Checking for collision of player and enemies
    for(let enemy of allEnemies) {
        // if the player and enemies' positions match
        if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
            // Reset game on satisfied conditions
            this.reset();
        }
    }
    // Checking for victory
    if(this.y < 0) {
        // changing the victory to true to be used for the gameover modal in engine.js
        this.victory = true;
    }
}

// Updating player's position (x and y properties) based on keyboard inputs
Player.prototype.handleInput = function(input) {
    if(input === 'left' && this.x > 0) {
        this.x -= this.step;
    } else if(input === 'right' && this.x < this.step * 4) {
        this.x += this.step;
    } else if(input === 'up' && this.y > 0) {
        this.y -= this.jump;
    } else if(input === 'down' && this.y < this.jump * 4) {
        this.x += this.jump;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// Instantiating my objects. 
const player = new Player();
const enemy1 = new Enemy((-101/5), 0, 450);
const enemy2 = new Enemy(-101, 83, 300);
const enemy3 = new Enemy((-101*2.5), 83, 400);
const enemy4 = new Enemy(-101, 166, 250);
const enemy5 = new Enemy(-101, 0, 350);
const allEnemies = [];
// Playing all enemies into the allEnemies array using the push method
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

