var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var HEALTH = 100;

var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE_LEFT = 0;
var ANIM_JUMP_LEFT = 1;
var ANIM_WALK_LEFT = 2;
var ANIM_SHOOT_LEFT = 3;
var ANIM_CLIMB = 4;
var ANIM_IDLE_RIGHT = 5;
var ANIM_JUMP_RIGHT = 6;
var ANIM_WALK_RIGHT = 7;
var ANIM_SHOOT_RIGHT = 8;
var ANIM_MAX = 6;

var direction = RIGHT;

//var player = {
//	image: document.createElement("img"),
//	x: SCREEN_WIDTH/2,
//	y: SCREEN_HEIGHT/2,
//	width: 93,
//	height: 80,
//	velocityX: 0,
//	velocityY: 0,
	//angularVelocity: 0,
	//rotation: 0
//};


var Player = function()
{
	this.sprite = new Sprite("ChuckNorris.png");
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[0, 1, 2, 3, 4, 5, 6, 7]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[8, 9, 10, 11, 12]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[52, 53, 54, 55, 56, 57, 58, 59]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[60, 61, 62, 63, 64]);
	this.sprite.buildAnimation(12, 8, 165, 126, 0.05,
		[65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78]);
		
	for(var i=0; i<ANIM_MAX; i++)
	{
		this.sprite.setAnimationOffset(i, -55, -87);
	}
	this.position = new Vector2();
	this.position.set( 9*TILE, 0*TILE );
	
	this.width = 159;
	this.height = 163;
	
	this.velocity = new Vector2();
	
	this.falling = true;
	this.jumping = false;
	
	this.direction = LEFT;
};
