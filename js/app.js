
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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
    // You should multiply any movement by the dt parameter
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
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
    constructor() {
        // x & y steps (101 and 83) are based on canvas' .width and .height properties from engine.js file
      this.x = 101*2;
      this.y = 83*5-20;
      this.sprite = 'images/char-boy.png';
      this.collisionDist = 15;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(input) {
        switch(input) {
            case 'left':
                if (this.x > 0) {
                this.x -= 101;
                }
                break;
            case 'right':
                if (this.x <=303) {
                this.x += 101;
                }
                break;
            case 'up':
                if (this.y > 0) {
                    this.y -= 83;
                }
                break;
            case 'down':
                if (this.y < 415) {
                    this.y += 83;
                }
                break;
        }
    }

    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y && (enemy.x - this.x < this.collisionDist) && enemy.x > this.x-this.collisionDist) {
                alert('Collision');
            } 
        }            
    }
             
     /*   //to hide back unmatched cards
function unmatched() {
    //openCards[1].style.backgroundColor = "pink";
    block = true;
    setTimeout(function(){
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.remove('open', 'show');
        openCards = [];
        block = false;
    }, 700);
    moveCounter();*/
    
    
}


// New objects instantiated */
const player = new Hero();
const enemy1 = new Enemy(0, 83-20, 101);
const enemy2 = new Enemy(0, 166-20, 150);
const enemy3 = new Enemy(0, 249-20, 202);
const enemy4 = new Enemy(60, 166-20, 170);


// Place all enemy objects in an array called allEnemies
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4);
console.log(allEnemies);
// Place the player object in a variable called player



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
