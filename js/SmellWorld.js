var SmellWorld = {
	pixi: {
		renderer: null,
		stage: null,
		sprites: {
			mouse: null,
		},
	},
	gameState: {
		mousePosition: {x: 0, y: 0},
		cheesePosition: {x: 0, y: 0},

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

	setup: function() {
		SmellWorld.pixi.sprites.mouse = new PIXI.Sprite(PIXI.loader.resources["imgs/mouse.png"].texture);
		SmellWorld.pixi.stage.addChild(SmellWorld.pixi.sprites.mouse);
		SmellWorld.pixi.sprites.mouse.x = 900 / 2 - 300 / 2;
		SmellWorld.pixi.sprites.mouse.y = 900 / 2 - 300 / 2;
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
};
