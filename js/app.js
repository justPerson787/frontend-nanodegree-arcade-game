
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    //initial position of an enemy
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //Any movement is multiplied by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <=505) {
        this.x += this.speed*dt;
    } else {
        this.x = 0;
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
class Hero {
    constructor() {
        // x & y steps (101 and 83) are based on canvas' .width and .height properties from engine.js file
      this.stepX = 101;
      this.stepY = 83;
      this.x = this.stepX*2;
      this.y = this.stepY*5 - 20;
      this.sprite = 'images/char-boy.png';
      this.collisionDist = 10;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                this.x -= this.stepX;
                }
                break;
            case 'right':
                if (this.x <=this.stepX*3) {
                this.x += this.stepX;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= this.stepY;
                }
                break;
            case 'down':
                if (this.y < this.stepY*5) {
                    this.y += this.stepY;
                }
                break;
        }
    }
    // reset Hero to starting position after collision
    reset() {
        this.x = this.stepX*2;
        this.y = this.stepY*5 - 20;
    }

    //this method  identifies collision
    update() {
        //this condition identifies collision
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x - this.x < this.collisionDist) && enemy.x > this.x-this.collisionDist) {
                this.reset();
            } 
        }                 
    }             
}

// New objects instantiated */
const player = new Hero();
const enemy1 = new Enemy(0, 63, 101);
const enemy2 = new Enemy(0, 146, 150);
const enemy3 = new Enemy(0, 229, 202);
const enemy4 = new Enemy(60, 146, 170);


// All enemy objects are placed in an array called allEnemies
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);

// This listens for key presses and sends the keys to 
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
