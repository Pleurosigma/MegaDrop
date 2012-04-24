/*
	Baddie by Logan Wilkerson
*/
(function(window){
	/**
		Used for bad guys
	*/
	var Baddie = function(){
		this.initialize();
	}
	Baddie.prototype = new Actor();
	
	// Public Properties:
	Baddie.prototype.type = 'baddie';
	
	Baddie.prototype.Actor_initialize = Baddie.prototype.initialize;
	
	Baddie.prototype.initialize = function(){};
	
	window.Baddie = Baddie;
}(window));