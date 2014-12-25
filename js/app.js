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