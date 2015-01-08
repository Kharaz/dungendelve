var Actor = function(sprite, x, y){
    this.x = x;
    this.y = y;
    //this.sprite = sprite;
}

Actor.prototype.update = function(dt){
    //this.x += dx;
    //this.y += dy;
}

Actor.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
