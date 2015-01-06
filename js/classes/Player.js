// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var playerChecks = function() {
    var xOffset = 30;
    var yOffset = 10;

    var maxX = ctx.canvas.currRoom.map[0].length *128;
    var maxY = ctx.canvas.currRoom.map.length * 128;

    if(player.x < 0+128-xOffset){
        player.x = 0+128-xOffset;
    }
    if(player.x > maxX-120-128+xOffset){
        player.x = maxX-120-128+xOffset;
    }
    if(player.y < yOffset){
        player.y = yOffset;
    }
    if(player.y > maxY-128-64-128 + yOffset){
        player.y = maxY-128-64-128 + yOffset;
    }
}

var Player = function() {
    this.sprite = 'assets/guy.png';

    this.x = 100;
    this.y = (83*4)+50;

//    this.speedx = 400;
//    this.speedy = 400;
    this.dy = 0;
    this.dx = 0;

    this.acc = 5;
    this.velX = 0;
    this.velY = 0;

    this.maxVel = 10;

    this.isColliding = false;
    this.lives = 3;
    this.score = 0;
}

Player.prototype.update = function(dt) {
    if(this.isColliding){
        this.die();
    }

    if(this.dx == 0){
        //continue;
        this.velX = 0;
    } else {
        this.velX += this.acc * this.dx;    
    }

    if(this.dy == 0){
        //continue;
        this.velY = 0;
    } else {
        this.velY += this.acc * this.dy;
    }
    
    if(Math.abs(this.velY) >= this.maxVel){
        this.velY = this.maxVel*this.dy;
    }
    if(Math.abs(this.velX) >= this.maxVel){
        this.velX = this.maxVel*this.dx;
    }

    //var newX = this.dx * this.speedx * dt;
    //var newY = this.dy * this.speedy * dt;
    

    // this.x += parseInt(newX);
    // this.y += parseInt(newY);
    this.x += parseInt(this.velX);
    this.y += parseInt(this.velY);
    
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
