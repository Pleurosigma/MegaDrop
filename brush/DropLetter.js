(function(window){
	var DropLetter = function(){
		this.initialize();
	}
	DropLetter.prototype = new Actor();
	
	// Public Properties:
	DropLetter.prototype.stage;
	DropLetter.prototype.letter;
	DropLetter.prototype.stillAlive = true;
	DropLetter.prototype.index;
	DropLetter.prototype.lh;
	DropLetter.prototype.explode = new Audio('sounds/bomb.wav');
	DropLetter.prototype.powerUp = new Audio('sounds/power_up.wav');
	
	// Static Properties:
	DropLetter.font = '36px Arial';
	DropLetter.color = '#16F2F2';
	
	DropLetter.areaWidth = 40;
	DropLetter.imageWidth = 40;
	DropLetter.imageHeight = 52;
	
	DropLetter.spots = [];
	
	DropLetter.prototype.Actor_initialize = DropLetter.prototype.initialize;
	DropLetter.prototype.initialize = function(){
		this.Actor_initialize();
		this.displayObject = new Container();
		this.letter = new Text('', DropLetter.font, DropLetter.color);
		this.letter.maxwidth = 100;
		this.letter.x = 8;
		this.letter.y = 40;
		var g = new Graphics();
		g.beginStroke(Graphics.getRGB(0,0,0));
		g.drawRect(0, 0, DropLetter.imageWidth, DropLetter.imageHeight);
		var s = new Shape(g);
		this.displayObject.addChild(this.letter);
		this.explode.load();
		this.powerUp.load();
	}
	
	DropLetter.prototype.attach = function(){
		this.addToPhyObjects();
		this.addToTickObjects();
	}
	
	DropLetter.prototype.PhysicalGameObject_detach = DropLetter.prototype.detach;
	DropLetter.prototype.detach = function(){
		this.stage.removeChild(this.displayObject);
		this.die();
		this.PhysicalGameObject_detach();
	}
	
	DropLetter.prototype.setData = function(letter, stage, image){
		this.setLetter(letter);
		this.setStage(stage);
		this.setImage(image);
	}
	
	DropLetter.prototype.setStage = function(stage){
		this.stage = stage;
		if(DropLetter.spots.length == 0){
			var totalSpots = this.stage.canvas.width / DropLetter.areaWidth;
			for(var i = 0; i < totalSpots; i++){
				DropLetter.spots.push(1);
			}
		}
	}
	
	DropLetter.prototype.setLetter = function(letter){
		this.letter.text = letter;
		if(letter == 'W')
			this.letter.x -= 6;
		if(letter == 'I')
			this.letter.x += 8;
	}
	
	DropLetter.prototype.setImage = function(image){
		this.displayObject.addChildAt(new Bitmap(image),0);
	}
	
	DropLetter.prototype.spawn = function(){
		var l = DropLetter.spots.length;
		var openSpots = [];
		for(var i = 0; i < l; i++){
			openSpots.push(i);
			
		}
		if(openSpots.length == 0){
			return false;
		}
		this.index = Math.round(Math.random() * openSpots.length);
		DropLetter.spots[this.index] = 0;
		var x = this.index * DropLetter.areaWidth + (DropLetter.areaWidth - DropLetter.imageWidth)/2;
		this.displayObject.x = x;
		this.displayObject.y = 0;
		this.aabb = new AABoundingBox(x + DropLetter.imageWidth/2, DropLetter.imageHeight/2, DropLetter.imageWidth/2, DropLetter.imageHeight/2);
		this.stage.addChild(this.displayObject);
		return true;
	}
	
	DropLetter.prototype.die = function(){
		DropLetter.spots[this.index] = 1;
		this.stillAlive = false;
	}
	
	DropLetter.prototype.tick = function(){
		this.move(0, 5);
		this.checkCollisions();
	}
	
	DropLetter.prototype.collide = function(phyObject, rVector){
		switch(phyObject.type){
			case 'boundary':
				if(rVector[1] < 0){
					if(phyObject.side == Boundary.side.BOTTOM){
						this.detach();
					}
				}
			break;
			case 'hero':
				if(this.lh.check(this.letter.text))
					this.powerUp.play();
				else{
					phyObject.hitBad = true;
					this.explode.play();
				}
				this.stillAlive = false;
				this.detach();
			break;
		}
	}
	
	
	
	window.DropLetter = DropLetter;
}(window));