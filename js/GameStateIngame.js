var MouseBehaviour = {
	iddle: function(currentTime){
		GameStateIngame.sprites.mouse.stop();

		var direction = null;
		if (Input.state['ArrowUp']) {
			direction = {x: 0, y: -1};
		}else if (Input.state['ArrowRight']) {
			direction = {x: 1, y: 0};
		}else if (Input.state['ArrowDown']) {
			direction = {x: 0, y: 1};
		}else if (Input.state['ArrowLeft']) {
			direction = {x: -1, y: 0};
		}

		if (direction !== null) {
			var new_position = {
				x: GameStateIngame.gameState.mousePosition.x + (direction.x * tileSize),
				y: GameStateIngame.gameState.mousePosition.y + (direction.y * tileSize),
			};
			GameStateIngame.gameState.mouseState = {name: 'moving', data: { startPosition: GameStateIngame.gameState.mousePosition, endPosition: new_position}}
		}
	},

	moving: function(currentTime){
		var startPos = GameStateIngame.gameState.mouseState.data.startPosition;
		var endPos =  GameStateIngame.gameState.mouseState.data.endPosition;
		var totalDuration = 500.;

		if (GameStateIngame.gameState.maze[endPos.y / tileSize][endPos.x / tileSize] == MAZE_WALL) {
			GameStateIngame.gameState.mouseState = {name: 'iddle', data:null};
			return;
		}
		if (!GameStateIngame.gameState.mouseState.data.startTime) {

			GameStateIngame.gameState.mouseState.data.startTime = currentTime;
			// Mouse orientation
			if(endPos.x > startPos.x ){
				//mouse is going down
				GameStateIngame.sprites.mouse.rotation = Math.PI / 2;
				GameStateIngame.gameState.mouseOrientation = 'right';
			}else if (endPos.y > startPos.y){
				//mouse is going down
				GameStateIngame.sprites.mouse.rotation = Math.PI;
				GameStateIngame.gameState.mouseOrientation = 'down';
			}else if (endPos.y < startPos.y){
				//mouse is going up
				GameStateIngame.sprites.mouse.rotation = 0;
				GameStateIngame.gameState.mouseOrientation = 'up';
			}else if (endPos.x < startPos.x){
				//mouse is going left
				GameStateIngame.sprites.mouse.rotation = (3 * Math.PI) / 2;
				GameStateIngame.gameState.mouseOrientation = 'left';
			}
		} else {
			GameStateIngame.sprites.mouse.play();
		}

		var currentDuration = currentTime - GameStateIngame.gameState.mouseState.data.startTime;

		if (currentDuration >= totalDuration) {
			GameStateIngame.gameState.mousePosition = endPos;
			GameStateIngame.gameState.mouseState = {name: 'iddle', data:null};
			return;
		}

		var progress = currentDuration / totalDuration;
		var newPosition = {
			x: startPos.x + progress * (endPos.x - startPos.x),
			y: startPos.y + progress * (endPos.y - startPos.y),
		};
		GameStateIngame.gameState.mousePosition = newPosition;
		if (GameStateIngame.gameState.maze[endPos.y / tileSize][endPos.x / tileSize] == MAZE_CHEESE) {
			SmellWorld.pixi.stage.removeChild(GameStateIngame.sprites.arrow);
		} else {
			var atanY = GameStateIngame.gameState.cheesePosition.y - GameStateIngame.gameState.mousePosition.y;
			var atanX = GameStateIngame.gameState.cheesePosition.x - GameStateIngame.gameState.mousePosition.x;
			GameStateIngame.sprites.arrow.rotation = (Math.PI/2) + Math.atan2(atanY, atanX);
		}

	},
};

var GameStateIngame = {
	mouseBehaviours: {
		'iddle': MouseBehaviour.iddle,
		'moving': MouseBehaviour.moving,
	},
	gameState: {
		arrowState: {data: {radiant: null, distance: null}},
		mouseState: { name: 'iddle', data: null},
		mousePosition: null,
		cheesePosition: null,
		mouseOrientation: 'up',
		// Maze reporesentation
		//  maze[y][x] contains the tile at (x, y) position
		//  0: passable
		//  1: blocked
		//  2: mouse start position
		//  3: cheese position
		maze: null,
	},

	sprites: {
		cheese: null,
		mouse: null,
		arrow: null,
		tiles: null,
	},

	setup: function() {
		GameStateIngame.gameState = {
			arrowState: {data: {radiant: null, distance: null}},
			mouseState: { name: 'iddle', data: null},
			mousePosition: null,
			cheesePosition: null,
			mouseOrientation: 'up',
			maze: null,
		};
		SmellWorld.gameState = GameStateIngame;
		SmellWorld.pixi.stage.removeChildren();

		GameStateIngame.gameState.maze = MazeGenerator.generateMaze();
		GameStateIngame.sprites.tiles = [];
		for (var y = 0; y < GameStateIngame.gameState.maze.length; ++y) {
			GameStateIngame.sprites.tiles.push([]);
			for (var x = 0; x < GameStateIngame.gameState.maze[y].length; ++x) {
				GameStateIngame.sprites.tiles[y].push(null);
				if (GameStateIngame.gameState.maze[y][x] == MAZE_MOUSE) {
					GameStateIngame.gameState.mousePosition = {x: GameStateIngame.coordTileToPixel(x), y: GameStateIngame.coordTileToPixel(y)};
				}
				if (GameStateIngame.gameState.maze[y][x] == MAZE_CHEESE) {
					GameStateIngame.gameState.cheesePosition = {x: GameStateIngame.coordTileToPixel(x), y: GameStateIngame.coordTileToPixel(y)};
				}
			}
		}

		GameStateIngame.generateMazeSprite();

		GameStateIngame.sprites.cheese = new PIXI.Sprite(PIXI.loader.resources["imgs/cheese.png"].texture);
		SmellWorld.pixi.stage.addChild(GameStateIngame.sprites.cheese);

		var mouseTexture = [];
		for (var i=0; i <= 9; i++){
		     var texture = PIXI.loader.resources['imgs/Animation/Frames_mouse/mouse_animated000'+ i +'.png'].texture;
		     mouseTexture.push(texture);
		};
		GameStateIngame.sprites.mouse = new PIXI.extras.AnimatedSprite(mouseTexture);
		GameStateIngame.sprites.mouse.animationSpeed = 1;
		GameStateIngame.sprites.mouse.anchor.set(0.5, 0.5);
		GameStateIngame.sprites.mouse.x = viewPortWidth / 2 ;
		GameStateIngame.sprites.mouse.y = viewPortHeight / 2 ;
		SmellWorld.pixi.stage.addChild(GameStateIngame.sprites.mouse);

		var arrowTextures = [];
		for (var i=0; i <= 11; i++){
		     var texture = PIXI.loader.resources['imgs/Animation/Frames_arrow/arrow_animated00'+ (i < 10 ? '0' : '') + i +'.png'].texture;
		     arrowTextures.push(texture);
		};
		GameStateIngame.sprites.arrow = new PIXI.extras.AnimatedSprite(arrowTextures);
		GameStateIngame.sprites.arrow.animationSpeed = 0.3;
		GameStateIngame.sprites.arrow.anchor.set(0.5, 1.5);
		GameStateIngame.sprites.arrow.x = viewPortWidth / 2 ;
		GameStateIngame.sprites.arrow.y = viewPortHeight / 2 ;
		var atanY = GameStateIngame.gameState.cheesePosition.y - GameStateIngame.gameState.mousePosition.y;
		var atanX = GameStateIngame.gameState.cheesePosition.x - GameStateIngame.gameState.mousePosition.x;
		GameStateIngame.sprites.arrow.rotation = (Math.PI/2) + Math.atan2(atanY, atanX);
		GameStateIngame.sprites.arrow.play();
		SmellWorld.pixi.stage.addChild(GameStateIngame.sprites.arrow);
	},

	updateGame: function(currentTime) {
		// Update mouse
		GameStateIngame.mouseBehaviours[GameStateIngame.gameState.mouseState.name](currentTime);

		// End game condition
		var mouse = GameStateIngame.gameState.mousePosition;
		var cheese = GameStateIngame.gameState.cheesePosition;
		if (
			Math.abs(mouse.x - cheese.x) < 150 &&
			Math.abs(mouse.y - cheese.y) < 150
		)
		{
			GameStateGameover.setup();
		}
	},

	updateStage: function(currentTime) {
		GameStateIngame.repositionMaze();

		// Arrow size
		var maxY = GameStateIngame.gameState.maze.length * tileSize;
		var maxX = GameStateIngame.gameState.maze[0].length * tileSize;
		var maxDist = Math.sqrt(Math.pow(maxX, 2) + Math.pow(maxY, 2));
		var xDistance = Math.abs(GameStateIngame.gameState.cheesePosition.x - GameStateIngame.gameState.mousePosition.x);
		var yDistance = Math.abs(GameStateIngame.gameState.cheesePosition.y - GameStateIngame.gameState.mousePosition.y)
		var currentDist = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
		var scale = ((currentDist * 100) / maxDist) / 100;
		GameStateIngame.sprites.arrow.scale.x = 1 - scale;
		GameStateIngame.sprites.arrow.scale.y = 1 - scale;
	},

	repositionMaze: function(){
		for(var y = 0; y < GameStateIngame.sprites.tiles.length; y++){
			for(var x = 0; x < GameStateIngame.sprites.tiles[y].length; x++){
				GameStateIngame.sprites.tiles[y][x].x = GameStateIngame.coordTileToPixel(x) - GameStateIngame.viewPortPosition().x;
				GameStateIngame.sprites.tiles[y][x].y = GameStateIngame.coordTileToPixel(y) - GameStateIngame.viewPortPosition().y;
			}
		}
		GameStateIngame.sprites.cheese.x = GameStateIngame.gameState.cheesePosition.x - GameStateIngame.viewPortPosition().x;
		GameStateIngame.sprites.cheese.y = GameStateIngame.gameState.cheesePosition.y - GameStateIngame.viewPortPosition().y;
	},

	generateMazeSprite: function(){
		for(y = 0; y < GameStateIngame.gameState.maze.length; y ++){
			for(x = 0; x < GameStateIngame.gameState.maze[y].length; x++){
				switch (GameStateIngame.gameState.maze[y][x]) {
					case MAZE_FLOOR:

						GameStateIngame.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/floor.png'].texture
						);
						break;
					case MAZE_WALL:
						GameStateIngame.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/wall.png'].texture
						);
						break;
					case MAZE_MOUSE:
						GameStateIngame.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/floor.png'].texture
						);
						break;
					case MAZE_CHEESE:
						GameStateIngame.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/floor.png'].texture
						);
						break;
					default:

				}
				SmellWorld.pixi.stage.addChild(GameStateIngame.sprites.tiles[y][x]);
			}
		}
	},

	coordTileToPixel: function(component) {
		return component * tileSize;
	},

	viewPortPosition: function() {
		return {
			x: GameStateIngame.gameState.mousePosition.x - viewPortWidth / 2 + tileSize / 2,
			y: GameStateIngame.gameState.mousePosition.y - viewPortHeight / 2 + tileSize / 2,
		};
	},
};
