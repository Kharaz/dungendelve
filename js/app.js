var plusorminus = function(num) {
    return Math.floor(((Math.random() * num) - (0.5 * num)));
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// var hearts = [];
// var heartsprite = 'images/heart.png';
// hearts.push(new GuiElement(heartsprite,0,450));
// hearts.push(new GuiElement(heartsprite,50,450));
// hearts.push(new GuiElement(heartsprite,100,450));

var gemsprite = 'images/Gem_Blue.png';
var gem = new GuiElement(gemsprite, 400, 400);

var player = new Player();
var room = new Room();
room.init(7, 5);
room.doors.push(new Door(3, 0));
room.doors.push(new Door(3, 4));
room.doors.push(new Door(0, 2));
room.doors.push(new Door(6, 2));
//room.doors.push(new Door(3, 1));

var room2 = new Room();
room2.init(5, 4);
room2.doors.push(new Door(2,3));
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player.lives >= 0) {
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
    if (player.lives >= 0) {
        player.handleInputUp(allowedKeys[e.keyCode]);
    }
});
