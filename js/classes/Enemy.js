var Enemy = function() {
    Actor.call(this, 'images/enemy-bug.png', 0, 0);
    this.current_row = 0;
    this.speed = 10;
    this.reset();
};
Enemy.prototype = Object.create(Actor.prototype);

Enemy.prototype.update = function(dt) {
    //this.x += parseInt(10 * dt);
    this.x += this.speed * dt;
    if (this.x >= 505)
        this.reset();
};
Enemy.prototype.reset = function() {
    this.x = -101;
    var randSpeed = Math.floor((Math.random() * 3) + 1);
    var randRow = Math.floor((Math.random() * 3) + 1);

    if (randSpeed == 1) {
        this.speed = 75;
    } else if (randSpeed == 2) {
        this.speed = 120;
    } else {
        this.speed = 200;
    }

    this.speed += plusorminus(25);

    if (randRow == 1) {
        this.y = 83 * 0 + 50;
    } else if (randRow == 2) {
        this.y = 83 * 1 + 50;
    } else {
        this.y = 83 * 2 + 50;
    }
};