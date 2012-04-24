(function(window){
	var HeroTest = function(stage){
		this.initialize(stage);
	}
	
	var proto = HeroTest.prototype;
	proto.stage;
	proto.megaManImage = new Image();
	var imagesLoaded = 0;
	var resourcesLoaded = false;
	
	proto.initialize = function(stage){
		this.stage = stage;
		HeroGame = this;
		BrushEvent.attachToDOM();
		this.megaManImage.src = 'imgs/sprites/megaman_default_lrg_bidirectional.png';
		this.megaManImage.onload = this.handleImageLoad;
	}
	
	proto.handleImageLoad = function(){
		imagesLoaded++;
		if(imagesLoaded == 1){
			resourcesLoaded = true;
		}
	}
	
	proto.waitAndStart = function(){
		if(!resourcesLoaded){
			setTimeout(HeroGame.waitAndStart, 50);
			return;
		}
		HeroGame.startGame();
	}
	
	proto.startGame = function(){
		this.hero = new MegaManClassic();
		this.hero.attach();
		this.hero.setImage(this.megaManImage);
		var topBoundary = new Boundary(this.stage, Boundary.side.TOP);
		var rightBoundary = new Boundary(this.stage, Boundary.side.RIGHT);
		var bottomBoundary = new Boundary(this.stage, Boundary.side.BOTTOM);
		var leftBoundary = new Boundary(this.stage, Boundary.side.LEFT);
		var platform1 = new MovingPlatform();
		platform1.setStructureRectangle(new Rectangle(200, 360, 50, 10));
		var platform2 = new MovingPlatform();
		platform2.setStructureRectangle(new Rectangle(350, 300, 50, 10));
		var platform3 = new MovingPlatform();
		platform3.setStructureRectangle(new Rectangle(200, 240, 50, 10));
		var platform4 = new MovingPlatform();
		platform4.setStructureRectangle(new Rectangle(350, 150, 50, 10));
		this.stage.addChild(this.hero.displayObject);
		this.stage.addChild(platform1.displayObject);
		this.stage.addChild(platform2.displayObject);
		this.stage.addChild(platform3.displayObject);
		this.stage.addChild(platform4.displayObject);
		this.stage.addChild(new Text('font'));
		Ticker.addListener(this);
	}
	
	var count = 0;
	proto.tick = function(){
		var l = PhysicalGameObject.tickObjects.length;
		for(var i = 0; i < l; i++){
			PhysicalGameObject.tickObjects[i].tick();
		}
		this.stage.update();
	}
	
	window.HeroTest = HeroTest;
}(window));