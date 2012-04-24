(function (window){
	var Point = function(x, y){
		this.initialize(x, y);
	}
	
	// Public Properties:
	Point.prototype.x = 0;
	Point.prototype.y = 0;
	
	Point.prototype.initialize = function(x, y){
		this.x = x;
		this.y = y;
	}
}(window));