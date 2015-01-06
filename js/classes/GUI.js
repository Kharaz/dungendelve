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
