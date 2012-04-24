(function(window){
	var DropLetterGame = function(stage){
		this.initialize(stage);
	}
	var proto = DropLetterGame.prototype;
	
	proto.stage;
	proto.dropLetter = null;
	var curGame;
	var imagesLoaded = 0;
	var maxImage = 0;
	var resourcesLoaded = false;
	proto.initialize = function(stage){
		this.stage = stage;
		curGame = this;
		BrushEvent.attachToDOM();
	}
	
	proto.waitAndStart = function(){
		curGame.startGame();
	}
	
	proto.startGame = function(){
		Ticker.addListener(this);
		new Boundary(this.stage, Boundary.side.BOTTOM);
		new Boundary(this.stage, Boundary.side.LEFT);
		new Boundary(this.stage, Boundary.side.TOP);
		new Boundary(this.stage, Boundary.side.RIGHT);
	}
	
	proto.tick = function(){
		if(this.dropLetter == null){
			this.dropLetter = new DropLetter();
			this.dropLetter.setData('A', this.stage, null);
			if(this.dropLetter.spawn()){
				this.stage.addChild(this.dropLetter.displayObject);
				Ticker.addListener(this.dropLetter);
			}
			else{
				this.dropLetter = null;
			}
		}
		if(!this.dropLetter.stillAlive){
			this.dropLetter.die();
			this.dropLetter = null;
		}
		this.stage.update();
	}
	
	window.DropLetterGame = DropLetterGame;
}(window));