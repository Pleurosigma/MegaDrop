(function(window){
	var LetterHandler = function(){
		this.init();
	}
	
	LetterHandler.prototype.stage;
	LetterHandler.prototype.image;
	LetterHandler.prototype.lp
	LetterHandler.prototype.waitTicks = 0;
	LetterHandler.prototype.ticks = 0;
	LetterHandler.prototype.letterdiv;
	
	LetterHandler.prototype.init = function(){}
	
	LetterHandler.prototype.setLetterPicker = function(lp){
		this.lp = lp;
	}
	
	LetterHandler.prototype.setStage = function(stage){
		this.stage = stage;
	}
	
	LetterHandler.prototype.setImage = function(image){
		this.image = image;
	}
	
	LetterHandler.prototype.spawnDropLetter = function(){
		var letter = this.lp.getLetter();
		var dropLetter = new DropLetter();
		dropLetter.setData(letter, this.stage, this.image);
		if(letter == this.lp.getNextLetter()){
			dropLetter.type = 'good_letter';
		}
		else{
			dropLetter.type = 'bad_letter';
		}
		dropLetter.lh = this;
		dropLetter.attach();
		dropLetter.spawn();
	}
	
	LetterHandler.prototype.check = function(letter){
		if(letter == this.lp.getNextLetter()){
			this.inc();
			this.letterdiv.html(this.letterdiv.html() + letter);
			return true;
		}
			return false;
	}
	
	LetterHandler.prototype.inc = function(){
		this.lp.curLetter++;
	}
	
	LetterHandler.prototype.tick = function(){
		this.ticks++;
		if(this.waitTicks <= this.ticks){
			this.ticks = 0;
			this.spawnDropLetter();
		}
	}
	
	LetterHandler.prototype.done = function(){
		return this.lp.curLetter >= this.lp.answer.length
	}

	window.LetterHandler = LetterHandler;
}(window));