(function (window){
	var Line = function(p1, p2){
		this.initialize(p1, p2)
	}
	
	// Public Properties:
	Line.prototype.p1 = null;
	Line.prototype.p2 = null;
	
	Point.prototype.initialize = function(p1, p2){
		this.p1 = p1;
		this.p2 = p2
	}
}(window));