
var enemy = {
	image:document.createElement("img");
	x: SCREEN_WIDTH/2;
	y: SCREEN_HEIGHT/2;
	width: 50;
	height: 50;
	velocityX: 0;
	velocityY: 0;
	angularVelocity: 0;
	rotation: 0;
};
enemy.image.src = "enemy.png";