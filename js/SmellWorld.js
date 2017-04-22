var SmellWorld = {
	pixi: {
		renderer: null,
		stage: null,
		sprites: {
			mouse: null,
			tiles: [
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
				[null, null, null, null, null, null],
			]
		},
	},
	gameState: {
		mousePosition: {x: 1, y: 4},
		cheesePosition: {x: 1, y: 1},

		// Maze reporesentation
		//  maze[y][x] contains the tile at (x, y) position
		//  0: passable
		//  1: blocked
		//  2: mouse start position
		//  3: cheese position
		maze: [
			[1, 1, 1, 1, 1, 1],
			[1, 3, 0, 0, 0, 1],
			[1, 1, 1, 1, 0, 1],
			[1, 1, 1, 1, 0, 1],
			[1, 2, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1],
		]
	},

	init: function() {
		SmellWorld.pixi.stage = new PIXI.Container(),
		SmellWorld.pixi.renderer = PIXI. autoDetectRenderer(900, 900);
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
					case 0:

						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/floor.png'].texture
						);
						break;
					case 1:
						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/wall.png'].texture
						);
						break;
					case 2:
						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/mouse.png'].texture
						);
						break;
					case 3:
						SmellWorld.pixi.sprites.tiles[y][x] = new PIXI.Sprite(
							PIXI.loader.resources['imgs/cheese.png'].texture
						);
						break;
					default:

				}
				console.log(SmellWorld.pixi.sprites.tiles[y][x]);
				SmellWorld.pixi.stage.addChild(SmellWorld.pixi.sprites.tiles[y][x]);
				SmellWorld.pixi.sprites.tiles[y][x].y = y * 300;
				SmellWorld.pixi.sprites.tiles[y][x].x = x * 300;
			}
		}

	},

	setup: function() {
		SmellWorld.pixi.sprites.mouse = new PIXI.Sprite(PIXI.loader.resources["imgs/mouse.png"].texture);
		SmellWorld.pixi.stage.addChild(SmellWorld.pixi.sprites.mouse);
		SmellWorld.pixi.sprites.mouse.x = 900 / 2 - 300 / 2;
		SmellWorld.pixi.sprites.mouse.y = 900 / 2 - 300 / 2;
		SmellWorld.generateMazeSprite();
		
		Input.init({
			move: SmellWorld.commandMove,
		});

		SmellWorld.run();
	},

	run: function() {
		window.requestAnimationFrame(SmellWorld.run);
		SmellWorld.updateGame();
		SmellWorld.updateStage();
		SmellWorld.pixi.renderer.render(SmellWorld.pixi.stage);
	},

	updateGame: function() {
	},

	updateStage: function() {
	},

	commandMove: function(direction) {
		var new_position = {
			x: SmellWorld.gameState.mousePosition.x + direction.x,
			y: SmellWorld.gameState.mousePosition.y + direction.y,
		};
		if (SmellWorld.gameState.maze[new_position.y][new_position.x] != 1) {
			SmellWorld.gameState.mousePosition = new_position;
		}
	},
};
