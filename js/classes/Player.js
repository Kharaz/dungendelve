// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// var playerChecks = function() {
//     var xOffset = 30;
//     var yOffset = 10;

//     var maxX = ctx.canvas.currRoom.map[0].length *128;
//     var maxY = ctx.canvas.currRoom.map.length * 128;

//     if(player.x < 0+128-xOffset){
//         player.x = 0+128-xOffset;
//     }
//     if(player.x > maxX-120-128+xOffset){
//         player.x = maxX-120-128+xOffset;
//     }
//     if(player.y < yOffset){
//         player.y = yOffset;
//     }
//     if(player.y > maxY-128-64-128 + yOffset){
//         player.y = maxY-128-64-128 + yOffset;
//     }
// }

function sign(x) {
    return typeof x === 'number' ? x ? x < 0 ? -1 : 1 : x === x ? 0 : NaN : NaN;
}

directions = {
    "up": -1,
    "down": 1,
    "right": 1,
    "left": -1
};

var Player = function() {
    this.img = 'assets/guy4.png';
    this.name = "player";
    Actor.call(this, 200, 200);
    var animCells = [{
        x: 0,
        y: 0,
        w: 128,
        h: 192
    }];
    this.sprite = new Sprite(this.img, new SpritePainter(animCells));

    this.x = 200;
    this.y = 200;

    this.dy = 0;
    this.dx = 0;

    this.acc = 30;
    this.velX = 0;
    this.velY = 0;

    this.maxVel = 300;

    this.lives = 3;
    this.score = 0;

    //this.collider = new Collider(this);
};

Player.prototype = Object.create(Actor.prototype);

Player.prototype.checkBounds = function() {
    var xOffset = 30;
    var yOffset = 10;

    var maxX = ctx.canvas.currRoom.map[0].length * 128;
    var maxY = ctx.canvas.currRoom.map.length * 128;

    if (player.x < 0 + 128 - xOffset) {
        player.x = 0 + 128 - xOffset;
    }
    if (player.x > maxX - 120 - 128 + xOffset) {
        player.x = maxX - 120 - 128 + xOffset;
    }
    if (player.y < yOffset) {
        player.y = yOffset;
    }
    if (player.y > maxY - 128 - 64 - 128 + yOffset) {
        player.y = maxY - 128 - 64 - 128 + yOffset;
    }
};


Player.prototype.update = function(dt) {
    if (this.isColliding) {
        this.die();
    }

    // increase velocity by acceleration
    var xSign = sign(this.velX);
    var ySign = sign(this.velY);

    if(this.dx == 0){
        this.velX -= (this.acc) * xSign;
    } else {
        this.velX += this.acc * this.dx;
    }

    if(this.dy == 0){
        this.velY -= (this.acc) * ySign;
    } else {
        this.velY += this.acc * this.dy;
    }

    // cap velocity at max
    if (Math.abs(this.velY) >= this.maxVel) {
        this.velY = this.maxVel * this.dy;
    }
    if (Math.abs(this.velX) >= this.maxVel) {
        this.velX = this.maxVel * this.dx;
    }

    // change position
    this.x += parseInt(this.velX * dt);
    this.y += parseInt(this.velY * dt);

    this.checkBounds();
};

Player.prototype.render = function() {
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.paint(this.img, ctx);
};

Player.prototype.die = function() {
    hearts.pop();

    this.lives -= 1;
    console.log("Died! Now have: " + this.lives + " lives.");
    this.x = (101 * 2);
    this.y = (83 * 4) + 50;
};

Player.prototype.addscore = function() {
    this.score += 1;
    this.x = (101 * 2);
    this.y = (83 * 4) + 50;

    if (this.score > 5) {
        this.score = 0;
        allEnemies.push(new Enemy());
    }

};


Player.prototype.handleInput = function(key) {
    if ((key == "left") || (key == "right")) {
        this.dx = directions[key];
    } else if ((key == "up") || (key == "down")) {
        this.dy = directions[key];
    }
};
Player.prototype.handleInputUp = function(key) {
    if ((key == "left") || (key == "right")) {
        this.dx = 0;
        this.velX = 0;
    }
    if ((key == "up") || (key == "down")) {
        this.dy = 0;
        this.velY = 0;
    }
};

/*
Player.prototype.collideAction = function(){
    return;
}
=======
        if (this.dx === directions[key]) {
            this.dx = 0;
            this.velX = 0;
        }
    } else if ((key == "up") || (key == "down")) {
        if (this.dy === directions[key]) {
            this.dy = 0;
            this.velY = 0;
        }
    }
};
*/
