var ball = function(){
	this.img = 'assets/ball.png';

    var animcells = [
    {x:'0',y:'0',w:'20',h:'20'}
    ];

    this.sprite = new Sprite(this.img, new SpritePainter(animcells));

	this.x = parseInt(Math.random()*200);
	this.y = parseInt(Math.random()*200);
	this.width = 20;
	this.height = 20;

    this.radius = 20;

    this.yVel = 300;
    this.xVel = 300;
    this.acc = 5;

	this.centerX = this.x+(this.width/2);
	this.centerY = this.y+(this.height/2);
}

ball.prototype = {
    update: function(dt) {
        if(this.x > 180) {this.x = 180; this.xVel = -this.xVel;}
        if(this.y > 180) {this.y = 180; this.yVel = -this.yVel;}
        if(this.x < 0) {this.x = 0; this.xVel = -this.xVel;}
        if(this.y < 0) {this.y = 0; this.yVel = -this.yVel;}

        this.x += parseInt(this.xVel * dt);
        this.y += parseInt(this.yVel * dt);

    },

    render: function() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.paint(this.img, ctx);
    },

    distanceTo: function(other) {
        return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
    }
}

var Engine = (function(global){
	var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime,
        dt;

    canvas.width = 200;
    canvas.height = 200;
    doc.body.appendChild(canvas);

    var balls = [];

    var counter = 0;

    function main(){
        counter++;
        if(counter % 60 == 0){
            balls.push(new ball());
            counter = 0;
        }


    	var now = Date.now();
    	dt = (now-lastTime)/1000.0;

    	update(dt);
        collide(dt);
    	render()

    	lastTime = now;

    	win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    function update(dt) {
        ctx.rect(0,0,200,200);
        ctx.fill();
        for(var i = 0; i < balls.length; i++){
            balls[i].update(dt);
        }
    }

    function collide(dt) {
        for(var i = 0; i < balls.length; i++){
            for(var j = 0; j < balls.length; j++){
                if(i != j){
                    if(balls[i].distanceTo(balls[j]) < balls[i].radius){
                        balls[i].xVel = -balls[i].xVel + (Math.random()*100 - 50);
                        balls[i].yVel = -balls[i].yVel + (Math.random()*100 - 50);

                        //balls[j].xVel = -balls[j].xVel;
                        //balls[j].yVel = -balls[j].yVel;
                    }
                }
            }
        }
    }

    function render() {
        for(var i = 0; i < balls.length; i++){
            balls[i].render();
        }
    }

    function reset() {
        return; //implement later i guess
    }

    Resources.load([
        'assets/ball.png'
    ]);
    Resources.onReady(init);

    global.ctx = ctx;

})(this)