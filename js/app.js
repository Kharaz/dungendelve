var GuiElement = function(sprite,x,y) {
    this.sprite = sprite;
    //this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

GuiElement.prototype.render = function(){
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

GuiElement.prototype.update = function(){

}

var Entity = function(sprite, x, y){
    this.x = x;
    this.y = y;
    this.sprite = sprite;
}

Entity.prototype.update = function(dt){
    //this.x += dx;
    //this.y += dy;
}

Entity.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


var Enemy = function(){
    Entity.call(this, 'images/enemy-bug.png', 0,0);
    this.current_row = 0;
    this.speed = 10;
    this.reset();
}
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function(dt){
    //this.x += parseInt(10 * dt);
    this.x += this.speed*dt;
    if(this.x >= 505)
        this.reset()
}
Enemy.prototype.reset = function(){
    this.x = -101;
    var randSpeed = Math.floor((Math.random() * 3)+1);
    var randRow = Math.floor((Math.random() * 3)+1);

    if(randSpeed == 1){
        this.speed = 75;
    } else if(randSpeed == 2) {
        this.speed = 120;
    } else {
        this.speed = 200;
    }

    this.speed += plusorminus(25);

    if(randRow == 1){
        this.y = 83 * 0 + 50;
    } else if(randRow == 2){
        this.y = 83 * 1 + 50;
    } else {
        this.y = 83 * 2 + 50;
    }
}

var plusorminus = function(num){
    return Math.floor(((Math.random()*num) - (.5 * num)));
}

/*
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
*/


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //this.sprite = 'images/char-boy.png';
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = (83*4)+50;
    //this.speedx = 101;
    //this.speedy = 83;
    this.speedx = 400;
    this.speedy = 400;
    this.dy = 0;
    this.dx = 0;

    this.isColliding = false;
    this.lives = 3;
    this.score = 0;
}

Player.prototype.update = function(dt) {
    if(this.isColliding){
        this.die();
    }

    var newX = this.dx * this.speedx * dt;
    var newY = this.dy * this.speedy * dt;
    
    this.x += parseInt(newX);
    this.y += parseInt(newY);
    
    playerChecks();
}

Player.prototype.render = function (){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.die = function(){
    hearts.pop();

    this.lives -= 1;
    console.log("Died! Now have: " + this.lives + " lives.");
    this.x = (101*2);
    this.y = (83*4)+50; 
}

Player.prototype.addscore = function(){
    this.score += 1;
    this.x = (101*2);
    this.y = (83*4)+50;

    if(this.score > 5){
        this.score = 0;
        allEnemies.push(new Enemy());
    }

}



var playerChecks = function() {
    if(player.x < 0){
        player.x = 0;
    }
    if(player.x > 404){
        player.x = 404;
    }
    if(player.y < 50){
        player.y = 50;
        player.addscore();
    }
    if(player.y > 400){
        player.y = 400;
    }
}

// Player.prototype.handleInput = function(key) {
//     if(key == "left"){
//         if(this.x != 0){
//             // this.dx -= this.speedx;
//             this.dx = -1;  
//         }
//     }
//     if(key == "up"){
//         if(this.y > 50){
//             this.dy = 1;
//             // this.dy -= this.speedy;
//         }
//         else
//             this.addscore();
//     }
//     if(key == "down"){
//         if(this.y < (382)){
//             // this.dy += this.speedy;
//             this.dy = -1;
//         }
//     }
//     if(key == "right"){
//         if(this.x != (505-this.speedx)){
//             // this.dx+= this.speedx;
//             this.dx = 1;    
//         }
//     }
//     //this.dx = 0;
//     //this.dy = 0;
// }

Player.prototype.handleInput = function(key) {
    if(key == "left"){
        this.dx = -1;
    }
    if(key == "up"){
        this.dy = -1;
    }
    if(key == "down"){
        this.dy = 1;
    }
    if(key == "right"){
        this.dx = 1;
    }
}
Player.prototype.handleInputUp = function(key){
    
    if((key == "left") || (key == "right")){
        this.dx = 0;
    }
    if((key == "up") || (key == "down")){
        this.dy = 0;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
//allEnemies.push(new EnemyEntity());

var hearts = [];
var heartsprite = 'images/heart.png';
hearts.push(new GuiElement(heartsprite,0,450));
hearts.push(new GuiElement(heartsprite,50,450));
hearts.push(new GuiElement(heartsprite,100,450));

var gemsprite = 'images/Gem_Blue.png';
var gem = new GuiElement(gemsprite, 400, 400);

var player = new Player();
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(player.lives >= 0){
        player.handleInput(allowedKeys[e.keyCode]);    
    }
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(player.lives >= 0){
        player.handleInputUp(allowedKeys[e.keyCode]);    
    }
});