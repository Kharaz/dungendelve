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


// Enemies our player must avoid
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    Entity.call(this, 'images/char-boy.png', 202, 382);

    this.speedx = 400;
    this.speedy = 400;
    this.dy = 0;
    this.dx = 0;

    this.isColliding = false;
    this.lives = 3;
    this.score = 0;
}
Player.prototype = Object.create(Entity.prototype);

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
