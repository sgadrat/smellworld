
var viewPortWidth = 900;
var viewPortHeight = 900;
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
	},
	gameState: null,

	init: function() {
		SmellWorld.pixi.stage = new PIXI.Container(),
		SmellWorld.pixi.renderer = PIXI. autoDetectRenderer(viewPortWidth, viewPortHeight );
		document.body.appendChild(SmellWorld.pixi.renderer.view);
		PIXI.loader.add([
			'imgs/cheese.png',
			'imgs/floor.png',
			'imgs/mouse.png',
			'imgs/wall.png',
			'imgs/arrow.png',
			'imgs/title.png',
			'imgs/gameover.png',
		])
		.load(SmellWorld.setup);
	},

	setup: function() {
		GameStateTitle.setup();

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
		SmellWorld.gameState.updateGame(currentTime);
	},

	updateStage: function(currentTime) {
		SmellWorld.gameState.updateStage(currentTime);
	},

	commandMove: function(direction) {
		SmellWorld.gameState.commandMove(direction);
	},
};
