(function (window){
	var Vector = function(x, y){
		this.initialize(x, y);
	}
	
	// Public Properties:
	Vector.prototype.x;
	Vector.prototype.y;
	Vector.prototype.length;
	
	Vector.prototype.initialize(x, y){
		this.x = x;
		this.y = y;
		this.length = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
	}
	
	Vector.prototype.add(v){
		return new Vector(this.x + v.x, this.y + v.y);
	}
	
	Vector.prototype.subtract(v){
		return new Vector(this.x - v.x, this.y - v.y);
	}
	
	Vector.prototype.dotProduct(v){
		return this.x * v.x + this.y * v.y;
	}
	
	Vector.prototype.projection(v){
		var dp = this.dotProduct(v);
		var x = (dp / (Math.pow(v.length, 2))) * v.x;
		var y = (dp / (Math.pow(v.length, 2))) * v.y;
		return new Vector(x, y);
	}
	
	window.Vector = Vector;
}(window));