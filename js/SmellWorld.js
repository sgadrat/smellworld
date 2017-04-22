
var viewPortWidth = 900 ;
var viewPortHeight = 900 ;
var tileSize = 300;

var tileSize = 300; ///< Size of a tile in pixels

var MAZE_FLOOR = 0;
var MAZE_WALL = 1;
var MAZE_MOUSE = 2;
var MAZE_CHEESE = 3;

var SmellWorld = {
	lastTime: null,
	pixi: {
		renderer: null,
		stage: null,
		sprites: {
			cheese: null,
			mouse: null,
			tiles: [
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null],
				[null,null,null,null,null,null,null,null,null]
			]
		},
	},
	gameState: {
		mousePosition: {x: 1 * tileSize, y: 1 * tileSize},
		cheesePosition: {x: 6 * tileSize, y: 6 * tileSize},

		// Maze reporesentation
		//  maze[y][x] contains the tile at (x, y) position
		//  0: passable
		//  1: blocked
		//  2: mouse start position
		//  3: cheese position
		maze: [
			[MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL],
			[MAZE_WALL,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_WALL],
			[MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_FLOOR,MAZE_WALL,MAZE_WALL,MAZE_FLOOR,MAZE_WALL,MAZE_WALL],
			[MAZE_WALL,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_WALL,MAZE_FLOOR,MAZE_WALL,MAZE_WALL],
			[MAZE_WALL,MAZE_FLOOR,MAZE_FLOOR,MAZE_WALL,MAZE_FLOOR,MAZE_WALL,MAZE_FLOOR,MAZE_WALL,MAZE_WALL],
			[MAZE_WALL,MAZE_FLOOR,MAZE_WALL,MAZE_WALL,MAZE_FLOOR,MAZE_WALL,MAZE_WALL,MAZE_FLOOR,MAZE_WALL],
			[MAZE_WALL,MAZE_FLOOR,MAZE_FLOOR,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_FLOOR,MAZE_FLOOR,MAZE_WALL],
			[MAZE_WALL,MAZE_WALL,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_FLOOR,MAZE_WALL],
			[MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL,MAZE_WALL]
		]
	},

	init: function() {
		SmellWorld.pixi.stage = new PIXI.Container(),
		SmellWorld.pixi.renderer = PIXI. autoDetectRenderer(viewPortWidth, viewPortHeight );
		document.body.appendChild(SmellWorld.pixi.renderer.view);
		PIXI.loader.add([
			'imgs/cheese.png',
			'imgs/floor.png',
			'imgs/mouse.png',
			'imgs/wall.png',
		])
		.load(SmellWorld.setup);
	},

	generateMazeSprite: function(){
		for(y = 0; y < SmellWorld.gameState.maze.length; y ++){
			for(x = 0; x < SmellWorld.gameState.maze[y].length; x++){
				switch (SmellWorld.gameState.maze[y][x]) {
					case MAZE_FLOOR:

						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/floor.png'].texture
						);
						break;
					case MAZE_WALL:
						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/wall.png'].texture
						);
						break;
					case MAZE_MOUSE:
						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/floor.png'].texture
						);
						break;
					case MAZE_CHEESE:
						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/floor.png'].texture
						);
						break;
					default:

				}
				SmellWorld.pixi.stage.addChild(SmellWorld.pixi.sprites.tiles[y][x]);
			}
		}

	},
	repositionMaze: function(){
		for(var y = 0; y < SmellWorld.pixi.sprites.tiles.length; y++){
			for(var x = 0; x < SmellWorld.pixi.sprites.tiles[y].length; x++){
				SmellWorld.pixi.sprites.tiles[y][x].x = SmellWorld.coordTileToPixel(x) - SmellWorld.viewPortPosition().x;
				SmellWorld.pixi.sprites.tiles[y][x].y = SmellWorld.coordTileToPixel(y) - SmellWorld.viewPortPosition().y;
			}
		}
		SmellWorld.pixi.sprites.cheese.x = SmellWorld.gameState.cheesePosition.x - SmellWorld.viewPortPosition().x;
		SmellWorld.pixi.sprites.cheese.y = SmellWorld.gameState.cheesePosition.y - SmellWorld.viewPortPosition().y;
	},

	setup: function() {
		SmellWorld.pixi.sprites.mouse = new PIXI.Sprite(PIXI.loader.resources["imgs/mouse.png"].texture);
		SmellWorld.generateMazeSprite();
		SmellWorld.pixi.sprites.cheese = new PIXI.Sprite(PIXI.loader.resources["imgs/cheese.png"].texture);
		SmellWorld.pixi.stage.addChild(SmellWorld.pixi.sprites.cheese);
		SmellWorld.pixi.stage.addChild(SmellWorld.pixi.sprites.mouse);
		SmellWorld.pixi.sprites.mouse.x = viewPortWidth / 2 - tileSize / 2;
		SmellWorld.pixi.sprites.mouse.y = viewPortHeight / 2 - tileSize / 2;


		Input.init({
			move: SmellWorld.commandMove,
		});
		SmellWorld.lastTime = Date.now();
		SmellWorld.run();
	},

	run: function() {
		window.requestAnimationFrame(SmellWorld.run);
		var currentTime = Date.now();
		if(SmellWorld.lastTime == null){
			SmellWorld.lastTime = currentTime - 16;
		}
		SmellWorld.updateGame(currentTime);
		SmellWorld.updateStage(currentTime);
		SmellWorld.pixi.renderer.render(SmellWorld.pixi.stage);
		SmellWorld.lastTime = currentTime;
	},

	updateGame: function(currentTime) {
	},

	updateStage: function(currenTime) {
		SmellWorld.repositionMaze();
	},

	commandMove: function(direction) {
		var new_position = {
			x: SmellWorld.gameState.mousePosition.x + (direction.x * tileSize),
			y: SmellWorld.gameState.mousePosition.y + (direction.y * tileSize),
		};
		if (SmellWorld.gameState.maze[new_position.y / tileSize][new_position.x / tileSize] != MAZE_WALL) {
			SmellWorld.gameState.mousePosition = new_position;
		}
	},

	coordTileToPixel: function(component) {
		return component * tileSize;
	},

	viewPortPosition: function() {
		return {
			x: SmellWorld.gameState.mousePosition.x - viewPortWidth / 2 + tileSize / 2,
			y: SmellWorld.gameState.mousePosition.y - viewPortHeight / 2 + tileSize / 2,
		};
	},
};

var Utils = {
	coordTileToPixel: function(component) {
		return component * tileSize;
	},

	viewPortPosition: function() {
		return {
			x: SmellWorld.gameState.mousePosition.x - viewPortWidth / 2 + tileSize / 2,
			y: SmellWorld.gameState.mousePosition.y - viewPortHeight / 2 + tileSize / 2,
		};
	}
}
