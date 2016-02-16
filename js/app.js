var MOVEMENT = 100;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 20;
    this.width = 55;
    this.height = 80;
    this.speed = Math.random() * 5;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.collisions = function(object) {
    return (this.x < object.x + object.width  && this.x + this.width  > object.x &&
        this.y < object.y + object.height && this.y + this.height > object.y);    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (this.speed * dt * MOVEMENT);
    
    if(this.x > 480){
        var locations = [55, 140, 225];
        this.speed = Math.random() * 5;
        this.x = 0;
        this.y = locations[Math.floor(Math.random() * 3)];
    }
    
    if(this.collisions(player)){
        player.x = 200;
        player.y = 400;
    }
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    Enemy.call(this);
    this.x = 200;
    this.y = 400;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    if(this.y < 20){
        this.x = 200;
        this.y = 400;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction){
    switch(direction){
        case 'up':
            this.y = this.y - MOVEMENT;
            break;
        case 'right':
            if(this.x < 404){
                this.x = this.x + MOVEMENT;
            }
            break;
        case 'down':
            if(this.y < 424){
                this.y = this.y + MOVEMENT;
            }
            break;
        case 'left':
            if(this.x > 0){
                this.x = this.x - MOVEMENT;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for(var i = 0; i < 3; i++){
    var enemy = new Enemy();
    enemy.x = i * MOVEMENT;
    enemy.y = i * MOVEMENT;
    allEnemies.push(enemy);
}

var player = new Player();



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
