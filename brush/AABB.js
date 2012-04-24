(function (window){
	// Axis-Aligned Bounding Box
	var AABB = function(p, x, y){
		y = typeof a != 'undefined ? a : 0;
		this.initialize(p, x, y)
	}
	
	// Public Properties:
	AABB.prototype.p = null;
	AABB.prototype.x = 0;
	AABB.prototype.y = 0;
	
	AABB.prototype.initialize = function(p, x, y){
		this.p = p;
		this.x = x;
		this.y = y;
	}
	
	AABB.prototype.collidesWith(aabb){
		
	}
}(window));