var Collider = function(parent) {
	this.x = parent.x;
	this.y = parent.y;

	this.w = parent.sprite.w || parent.w;
	this.h = parent.sprite.h || parent.h;

	this.centerX = this.x + this.w/2;
	this.centerY = this.y + this.h/2;

	this.radius = parent.sprite.radius || parent.radius;
}

Collider.prototype = {
	distanceTo: function(other){
		return Math.sqrt(Math.pow(other.centerX - this.centerX, 2) + Math.pow(other.centerY - this.centerY, 2));
	},

	isColliding: function(other){
		return distanceTo(other.collider) < this.radius;
	}
}