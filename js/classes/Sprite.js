var Sprite = function(spritesheet, painter, behaviors) {
	if (name !== undefined) this.name = name;
	if (painter !== undefined) this.painter = painter;

	this.x = 200;
	this.y = 200;
	this.spritesheet = spritesheet;
	//this.width = 128;
	//this.height = 128;

	this.visible = true;
	this.behaviors = behaviors || [];

	return this;
};

Sprite.prototype = {
	paint: function(sprite, context) {
		if(this.painter !== undefined && this.visible){
			this.painter.paint(this, context);
		}
	},

	update:  function(context, dt) {
		for(var i = o; i < this.behaviors.length; i++){
			this.behaviors[i].execute(this, context, dt);
		}
	}
}

var SpritePainter = function(cells) {
	this.cells = cells || [];
	this.cellIndex = 0;
}

SpritePainter.prototype = {
	step: function() {
		if(this.cellIndex = this.cells.length-1){
			this.cellIndex = 0;
		} else {
			this.cellIndex++;
		}
	},

	paint: function(sprite, context) {
		var cell = this.cells[this.cellIndex];
		context.drawImage(Resources.get(sprite.spritesheet), cell.x, cell.y, cell.w, cell.h, sprite.x, sprite.y, cell.w, cell.h);
	}
}