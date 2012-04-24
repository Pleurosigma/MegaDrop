(function(window){
	var DropMan = function(){
		this.initialize();
	}
	
	DropMan.prototype = new MegaManClassic();
	DropMan.prototype.lh;
	DropMan.prototype.stage;
	DropMan.prototype.hitBad = false;
	
	DropMan.prototype.MegaManClassic_initialize = DropMan.prototype.initialize;
	DropMan.prototype.initialize = function(){
		this.MegaManClassic_initialize();
		this.attach();
	}
	
	DropMan.prototype.MegaManClassic_collide = DropMan.prototype.collide;
	DropMan.prototype.collide = function(phyObject, rVector){
		this.MegaManClassic_collide(phyObject, rVector);
		switch(phyObject.type){
		}
	}
	
	DropMan.prototype.setStage = function(stage){
		this.stage = stage;
		this.stage.addChild(this.displayObject);
	}
	
	DropMan.prototype.MegaManClassic_detach = DropMan.prototype.detach;
	DropMan.prototype.detach = function(){
		console.log('hi');
		console.log(this.displayObject);
		console.log(this.stage.removeChild(this.displayObject));
		this.MegaManClassic_detach();
	}
	
	
	window.DropMan = DropMan;
}(window));