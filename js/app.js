// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.x = x;
    this.y = y + 55;
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
        // Move forward
        // Increment x by speed * dt
        this.x += this.speed * dt;
    }
        
    else {
        // Reset pos to start
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// The Hero Class

class Hero {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55;
        this.sprite = 'images/char-boy.png';
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }
    
    // Draw hero sprite on current x and y coord position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } 

    reset() {
        this.x = this.startX;
        this.y = this.startY;
    }

    // Update position for collision and win
    update() {

        // Check for collision
        for(let enemy of allEnemies) {

            // Did player x and y collide with enemy?
            if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2) ) {
                this.reset();
            }
        }
        // Check for win?
            // Did player x and y reach final tile?

            if(this.y === 55) {
                this.victory = true;
            }
    }

    /**
    * Update hero's x and y property based on input
    *
    */

    handleInput(input) {
        switch(input) {
            case 'left':
                if(this.x > 0) {
                    this.x -= this.step;
                }
                break;
            case 'up':
                if(this.y > this.jump) {
                    this.y -= this.jump;
                }
                break;
            case 'right':
                if(this.x < this.step * 4) {
                    this.x += this.step;
                }
                break;
            case 'down':
                if(this.y < this.jump * 4) {
                    this.y += this.jump;
                }
                break;

        }
    } 
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// From the above Enemy and Hero class

const player = new Hero();
const enemy1 = new Enemy((-101/5), 0, 450);
const enemy2 = new Enemy(-101, 83, 300);
const enemy3 = new Enemy((-101*2.5), 83, 400);
const enemy4 = new Enemy(-101, 166, 250);
const enemy5 = new Enemy(-101, 0, 350);
const allEnemies = [];
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

