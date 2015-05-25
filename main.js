var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}
//-------------------- Don't modify anything above here

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var STATE_SPLASH = 0;
var STATE_MENU = 1;
var STATE_GAME = 2;
var STATE_GAMEOVER = 3;

var gameState = STATE_SPLASH;

var score = 0;
var Lives = 4;

var LAYER_COUNT = 3;
//The number of layers in your map. In the sample from this week’s lesson we’re using
//a background layer, a layer for the platforms, and a layer for the ladders. (We’ll add
//more layers in a later lesson)
var MAP = { tw: 60, th: 15 };
//Specifies how big your level is, in tiles. The sample level from the lesson is 60 tiles
//wide by 15 tiles high.
var TILE = 35;
//The width/height of a tile (in pixels). Your tiles should be square. These dimensions
//r/efer to the map grid tiles. Our tileset tiles (the images) can be different dimensions.
var TILESET_TILE = TILE * 2;
//The width/height of a tile in the tileset. Because the images are twice as big as the
//grid in our map we need to be careful (but it allows us a bit more flexibility when
//designing the level)
var TILESET_PADDING = 2;
//How many pixels are between the image border and the tile images in the tilemap
var TILESET_SPACING = 2;
//how many pixels are between tile images in the tilemap
var TILESET_COUNT_X = 14;
//How many columns of tile images are in the tileset
var TILESET_COUNT_Y = 14;
//How many rows of tile images are in the tileset 

var METRE = TILE;
var GRAVITY = METRE * 9.8 * 6;
var MAXDX = METRE * 10;
var MAXDY = METRE * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;
var JUMP = METRE * 1500;
// some variables to calculate the Frames Per Second (FPS - this tells us
// how fast our game is running, and allows us to make the game run at a 
// constant speed)
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var LAYER_COUNT = 3;
var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_LADDER = 2;

// load an image to draw
var chuckNorris = document.createElement("img");
chuckNorris.src = "GOD.png";

var tileset = document.createElement("img");
tileset.src = "tiles/tileset.png";

var heartImage = document.createElement("img");
heartImage.src = "health.png";

var cells = []; // the array that holds our simplified collision data
function initialize() {
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++) { // initialize the collision map
		cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0; y < level3.layers[layerIdx].height; y++) {
			cells[layerIdx][y] = [];
			for(var x = 0; x < level3.layers[layerIdx].width; x++) {
				if(level3.layers[layerIdx].data[idx] != 0) {
 // for each tile we find in the layer data, we need to create 4 collisions
 // (because our collision squares are 35x35 but the tile in the
// level are 70x70)
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1) {
// if we haven't set this cell's value, then set it to 0 now
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
}

function cellAtPixelCoord(layer, x,y)
	{
		if(x<0 || x>SCREEN_WIDTH || y<0)
		return 1;
// let the player drop of the bottom of the screen (this means death)
		if(y>SCREEN_HEIGHT)
		return 0;
		return cellAtTileCoord(layer, p2t(x), p2t(y));
	};
function cellAtTileCoord(layer, tx, ty)
{
	if(tx<0 || tx>=MAP.tw || ty<0)
	return 1;
// let the player drop of the bottom of the screen (this means death)
	if(ty>=MAP.th)
	return 0;
	return cells[layer][ty][tx];
};
function tileToPixel(tile)
{
	return tile * TILE;
};
function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};
function bound(value, min, max)
{
	if(value < min)
	return min;
	if(value > max)
	return max;
	return value;
}
function drawMap()
{
	for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
	{
		var idx = 0;
		for( var y = 0; y < level3.layers[layerIdx].height; y++ )
		{
			for( var x = 0; x < level3.layers[layerIdx].width; x++ )
			{
				if( level3.layers[layerIdx].data[idx] != 0 )
				{
					// the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one from the tileset id to get the
					// correct tile
					var tileIndex = level3.layers[layerIdx].data[idx] - 1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
	}
}
function runSplash(deltaTime)
{
	
}
function runMenu(deltaTime)
{
	
}
function runGame(deltaTime)
{
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	drawMap();

	
	context.font = "24px Verdana";
	context.fillStyle = "#FF0";
	context.fillText("Chuck Points: " + score, 230, 20);
	
	// life counter
	for(var i=0; i<Lives; i++)
	{
		context.drawImage(heartImage, 20 + ((heartImage.width+2)*i), 20);
	}
	
var deltaTime = getDeltaTime();

context.drawImage(chuckNorris, SCREEN_WIDTH/2 - chuckNorris.width/2, SCREEN_HEIGHT/2 - chuckNorris.height/2);

// update the frame counter

	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}
// draw the FPS
context.fillStyle = "#f00";
context.font="14px Arial";
context.fillText("FPS: " + fps, 5, 20, 100);

}
initialize();
function runGameOver(deltaTime)
{
	
}
//-------------------- Don't modify anything below here

// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.


(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(runGame);