
var Vector2 = function(){this.x= 0; this.y = 0;};

this.x = 0;
this.y = 0;

function normalize()
{
var length = Math.sqrt( x*x, + y*y);

var normalX = x / length;
var normalY = y / length;
}

Vector2.prototype.Set = function(x, y){	

	this.x = x;
	this.y = y;
}
Vector2.prototype.runGame
{
	this.x = canvas.width/2;
	this.y = canvas.height/2;
					normalize();
	this.x.v2 += canvas.width/2;
	this.y.v2 += canvas.height/2;
	this.x.v2 -= canvas.width/2;
	this.y.v2 -= canvas.height/2;
	//this.x = this x * num;
	//this.y = this.y * num;	
}