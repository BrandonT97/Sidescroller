var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var Keyboard = function() {
	var self = this;
	
	window.addEventListener('keydown', function(evt) { self.onKeyDown(evt);}, false);
	window.addEventListener('keyup', function(evt){ self.onKeyUp(evt); }, false);
	
	this.keyListeners = new Array();
	this.keys = new Array();
	
	//a link with these key numbers should be in your notes somewhere
	this.KEY_SPACE = 32;
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_DOWN = 39;
	this.KEY_RIGHT = 40;
	
	this.KEY_A = 65;
	this.KEY_D = 68;
	this.KEY_S = 83;
	this.KEY_W = 87;
	this.KEY_SHIFT = 16;
};
Keyboard.prototype.onKeyDown = function(evt)
{
	this.keys[evt.keyCode] = true;
};
Keyboard.prototype.onKeyUp = function(evt)
{
	this.keys[evt.keyCode] = false;
};
Keyboard.prototype.onKeyDown = function(keyCode)
{
return this.keys[keyCode];
};
var Player = function(){
	this.image = document.createElement("img");
	this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.width = 159;
	this.height = 163;
	
	this.image.src = "GOD.png";
}
Player.prototype.update = function(deltaTime)
{
	if( typeof(this.rotation) == "undefined" )
		this.rotation = 0;
	
	if (Keyboard.isKeyDown(Keyboard.KEY_SPACE) == true)
	{
		this.rotation -= deltaTime;
	}
	else
	{
		this.rotation += deltaTime;
	}
Player.prototype.update = function(deltaTime)
{
	this.sprite.update(deltaTime);
	var left = false;
	var right = false;
	var jump = false;
 // check keypress events
	if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) {
	left = true;
	this.direction = LEFT;
	if(this.sprite.currentAnimation != ANIM_WALK_LEFT)
		this.sprite.setAnimation(ANIM_WALK_LEFT);
	}
	else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) {
	right = true;
	this.direction = RIGHT;
	if(this.sprite.currentAnimation != ANIM_WALK_RIGHT)
		this.sprite.setAnimation(ANIM_WALK_RIGHT);
	}
	else {
			if(this.jumping == false && this.falling == false)
			{
				if(this.direction == LEFT)
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_LEFT)
				this.sprite.setAnimation(ANIM_IDLE_LEFT);
			}
			else
			{
				if(this.sprite.currentAnimation != ANIM_IDLE_RIGHT)
				this.sprite.setAnimation(ANIM_IDLE_RIGHT);
			}
		}
	}
	if(keyboard.isKeyDown(keyboard.KEY_SPACE) == true) {
	jump = true;
	if (jump && !this.jumping && !falling)
	{
// apply an instantaneous (large) vertical impulse
		
			ddy = ddy - JUMP;
			this.jumping = true;
			if(this.direction == LEFT)
			this.sprite.setAnimation(ANIM_JUMP_LEFT)
		else
			this.sprite.setAnimation(ANIM_JUMP_RIGHT)
			if (this.jumping == true);
			this.sprite.setAnimation.setLoop(loop)
			if (this.jumping = isFinished() == true);
			this.sprite.setAnimation(ANIM_IDLE_RIGHT)
	}

	}

	var wasleft = this.velocity.x < 0;
	var wasright = this.velocity.x > 0;
	var falling = this.falling;
	var ddx = 0; // acceleration
	var ddy = GRAVITY;

	if (left)
	ddx = ddx - ACCEL; // player wants to go left
	else if (wasleft)
	ddx = ddx + FRICTION; // player was going left, but not any more
	if (right)
	ddx = ddx + ACCEL; // player wants to go right
	else if (wasright)
	ddx = ddx - FRICTION; // player was going right, but not any more
	if (jump && !this.jumping && !falling)
	{
	ddy = ddy - JUMP; // apply an instantaneous (large) vertical impulse
	this.jumping = true;
	}
	// calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	
	// calculate the new position and velocity:
	this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
	this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
	this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
	this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);
	if ((wasleft && (this.velocity.x > 0)) ||
		(wasright && (this.velocity.x < 0)))
	{
 // clamp at zero to prevent friction from making us jiggle side to side
		this.velocity.x = 0;
	}
// we’ll insert code here later
// collision detection
// Our collision detection logic is greatly simplified by the fact that the
// player is a rectangle and is exactly the same size as a single tile.
 // So we know that the player can only ever occupy 1, 2 or 4 cells.

// This means we can short-circuit and avoid building a general purpose
// collision detection engine by simply looking at the 1 to 4 cells that
// the player occupies:
	var tx = pixelToTile(this.position.x);
	var ty = pixelToTile(this.position.y);
	var nx = (this.position.x)%TILE; // true if player overlaps right
	var ny = (this.position.y)%TILE; // true if player overlaps below
	var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
	var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
	var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
	var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
	
	// If the player has vertical velocity, then check to see if they have hit a platform
 // below or above, in which case, stop their vertical velocity, and clamp their
 // y position:
 if (this.velocity.y > 0) {
	if ((celldown && !cell) || (celldiag && !cellright && nx)) {
 // clamp the y position to avoid falling into platform below
		this.position.y = tileToPixel(ty);
		this.velocity.y = 0; // stop downward velocity
		this.falling = false; // no longer falling
		this.jumping = false; // (or jumping)
		ny = 0; // no longer overlaps the cells below
	}
 }
	else if (this.velocity.y < 0) {
		if ((cell && !celldown) || (cellright && !celldiag && nx)) {
 // clamp the y position to avoid jumping into platform above
		this.position.y = tileToPixel(ty + 1);
		this.velocity.y = 0; // stop upward velocity
 // player is no longer really in that cell, we clamped them to the cell below
		cell = celldown;
		cellright = celldiag; // (ditto)
		ny = 0; // player no longer overlaps the cells below
			}
	}
	if (this.velocity.x > 0) {
		if ((cellright && !cell) || (celldiag && !celldown && ny)) {
 // clamp the x position to avoid moving into the platform we just hit
			this.position.x = tileToPixel(tx);
			this.velocity.x = 0; // stop horizontal velocity
		}
	}
	else if (this.velocity.x < 0) {
		if ((cell && !cellright) || (celldown && !celldiag && ny)) {
// clamp the x position to avoid moving into the platform we just hit
		this.position.x = tileToPixel(tx + 1);
		this.velocity.x = 0; // stop horizontal velocity
			}
		}	
}
	Player.prototype.draw = function()
	{
		this.sprite.draw(context, this.position.x, this.position.y);
	}
}
