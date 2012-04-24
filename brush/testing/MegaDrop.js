(function(window){
	var MegaDrop = function(stage){
		this.init(stage);
	}
	
	var proto = MegaDrop.prototype;
	var megaDrop;
	
	// Dynamic Properties
	proto.lh = new LetterHandler();
	proto.stage;	
	proto.resourcesLoaded = 0;
	proto.allResourcesLoaded = false;
	proto.totalResources = 2;
	proto.letterPicker;
	proto.hero;
	proto.nextQuestion = 'Spell Love.';
	proto.nextAnswer = 'LOVE';
	proto.nextFrequency = .25;
	proto.difficulty;
	proto.nextDifficulty = 'easy';
	proto.victoryMessage;
	proto.defeatMessage;
	proto.letterdiv;
	proto.nextRate = 15;
	// Images
	proto.megaManImage = new Image();
	proto.bomb = new Image();
	proto.bg = new Image();
	
	proto.init = function(stage){
		megaDrop = this;
		BrushEvent.attachToDOM();
		this.victoryMessage = new Text('Victory!', '70px Arial', '#000');
		this.victoryMessage.x = 100;
		this.victoryMessage.y = 150;
		this.defeatMessage = new Text('Defeat!', '70px Arial', '#000');
		this.defeatMessage.x = 100;
		this.defeatMessage.y = 150;
		
		this.stage = stage;
		this.loadResources();
		this.waitAndStart();
	}
	
	proto.loadResources = function(){
		//Images
		this.megaManImage.src = 'imgs/sprites/megaman_default_lrg_bidirectional.png';
		this.megaManImage.onload = this.handleResourceLoad;	
		this.bomb.src = 'imgs/apple.png';
		this.bomb.onload = this.handleResourceLoad;
		this.bg.src = 'imgs/appletree.jpg';
		this.bg.onload = this.setBG;
	}
	proto.handleResourceLoad = function(){
		megaDrop.resourcesLoaded++;
		if(megaDrop.resourcesLoaded == megaDrop.totalResources){
			megaDrop.allResourcesLoaded = true;
		}
	}
	
	proto.setBG = function(){
		var bg = new Bitmap(this);
		bg.y = -36;
		megaDrop.stage.addChild(bg);
		megaDrop.stage.update();
	}
	
	proto.waitAndStart = function(){
		if(megaDrop.allResourcesLoaded){
		}
		else{
			setTimeout(megaDrop.waitAndStart, 50);
		}
	}
	
	proto.start = function(){
		this.difficulty = this.nextDifficulty;
		speak(this.nextQuestion, {amplitude: 100, pitch: 50, speed: 175, wordgap: 0});
		this.hero = new DropMan();
		this.hero.setImage(this.megaManImage);
		this.hero.setStage(this.stage);
		this.hero.move(0, 350);
		new Boundary(this.stage, Boundary.side.BOTTOM);
		new Boundary(this.stage, Boundary.side.LEFT);
		new Boundary(this.stage, Boundary.side.RIGHT);
		this.lh.setStage(this.stage);
		this.lh.setImage(this.bomb);
		this.lh.setLetterPicker(new LetterPicker(this.nextAnswer, this.nextFrequency));
		this.hero.lh = this.lh;
		this.lh.waitTicks = this.nextRate;
		this.lh.letterdiv = this.letterdiv;
		Ticker.addListener(this);
		Ticker.addListener(this.lh);
		Ticker.setPaused(true);
		setTimeout(
		function(){
			Ticker.setPaused(false);
		}, 3000
		);
	}
	
	proto.pause = function(){
		Ticker.setPaused(!Ticker.getPaused());
	}
	
	proto.restart = function(){
		this.tearDown();
		this.start();
	}
	
	proto.tearDown = function(){
		PhysicalGameObject.detachAll();
		Ticker.removeAllListeners();
		this.letterdiv.html('');
		this.stage.removeChild(this.victoryMessage);
		this.stage.removeChild(this.defeatMessage);
		this.stage.update();
	}
	
	proto.displayVictory = function(){
		this.stage.addChild(this.victoryMessage);
		new Audio('sounds/app.mp3').play();
		this.stage.update();
	}
	
	proto.displayDefeat = function(){
		this.stage.addChild(this.defeatMessage);
		new Audio('sounds/aww.mp3').play();
		this.stage.update();
	}
	
	proto.tick = function(){
		if(this.lh.done()){
			this.tearDown();
			this.displayVictory();
			return;
		}
		if(this.hero.hitBad && this.difficulty == 'hard'){
			this.tearDown();
			this.displayDefeat();
			return;
		}
		var l = PhysicalGameObject.tickObjects.length;
		for(var i = 0; i < l; i++){
			if(PhysicalGameObject.tickObjects[i] != undefined)
				PhysicalGameObject.tickObjects[i].tick();
		}
		this.stage.update();
	}	
	
	window.MegaDrop = MegaDrop;
}(window));