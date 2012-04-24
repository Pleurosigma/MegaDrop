(function(window){
	var GameMode = function(){
		throw 'Game Mode Cannot be instantiated'
	}
	
	GameMode.LEARNING = 'LEARNING';
	GameMode.DODGE = 'Dodge';
	
	window.GameMode = GameMode;
}(window));