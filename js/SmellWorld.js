var SmellWorld = {
	renderer: null,
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
		var type = "WebGL";
		if(!PIXI.utils.isWebGLSupported()){
			type = "canvas";
		}

		PIXI.utils.sayHello(type);
	},

	run: function() {
		window.requestAnimationFrame(SmellWorld.run);

		SmellWorld.updateGame();
		SmellWorld.updateStage();
		SmellWorld.renderer.render();
	},

	updateGame: function() {
	},

	updateStage: function() {
	},
};
