(function(window){
	var LetterPicker = function(answer, frequency){
		this.init(answer, frequency);
	}
	
	// Public Properties:
	LetterPicker.prototype.answer;
	LetterPicker.prototype.curLetter = 0;
	LetterPicker.prototype.frequency;
	
	// Static Properties:
	LetterPicker.prototype.letters = ['A', 'B', 'C', 'D',
		'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
		'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
		'W', 'X', 'Y', 'Z'];
		
	LetterPicker.prototype.init = function(answer, frequency){
		this.answer = answer.toUpperCase().split('');
		this.frequency = typeof frequency !== 'undefined' ? frequency : .5;
	}
	
	LetterPicker.prototype.getLetter = function(){
		if(this.curLetter >= this.answer.length)
			return 'done';
		if(Math.random() <= this.frequency){
			return this.getNextLetter();
		}
		else{
			var letter = this.getNextLetter();
			while(letter == this.getNextLetter()){
				var index = Math.round(Math.random() * 25);
				var letter = this.letters[index];
			}
			return letter			
		}
	}
	
	LetterPicker.prototype.getNextLetter = function(){
		return this.answer[this.curLetter];
	}
	
	window.LetterPicker = LetterPicker
}(window));