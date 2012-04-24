MegaMan.prototype.tick = function(){
	if(this.rightHeld){
		if(this.curMovementState == MovementState.STAND ||
			(this.curMovementState == MovementState.RUN &&
			this.direction == Direction.LEFT) ||
			(this.curMovementState == MovementState.JUMP &&
			!this.isJumping)){
			this.gotoAndPlay('startRunRight');
			this.curMovementState = MovementState.RUN;
			this.direction = Direction.RIGHT;
		}
		else{
			if(this.isJumping){
				this.dX = this.jumpDX;
			}
			else{
				this.dX = this.runDX;
			}
		}
	}
	else if(this.leftHeld){
		if(this.curMovementState == MovementState.STAND ||
			(this.curMovementState == MovementState.RUN &&
			this.direction == Direction.RIGHT) ||
			(this.curMovementState == MovementState.JUMP &&
			!this.isJumping)){
			this.gotoAndPlay('startRunLeft');
			this.curMovementState = MovementState.RUN;
			this.direction = Direction.LEFT;
		}
		else{
			if(this.isJumping){
				this.dX = -this.jumpDX;
			}
			else{
				this.dX = -this.runDX;
			}
		}
		
	}
	else{
		if(this.curMovementState != MovementState.STAND && !this.isJumping){
			if(this.direction == Direction.RIGHT){
				this.gotoAndPlay('standRight');
			}
			else{
				this.gotoAndPlay('standLeft');
			}
			this.curMovementState = MovementState.STAND;
		}	
	}
}