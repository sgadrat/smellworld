
var viewPortWidth = 900;
var viewPortHeight = 900;

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
		SmellWorld.pixi.renderer = PIXI.autoDetectRenderer({
			width: viewPortWidth,
			height: viewPortHeight,
			view: document.getElementById('viewport')
		});
		document.body.appendChild(SmellWorld.pixi.renderer.view);
		var images = [
			'imgs/cheese.png',
			'imgs/floor.png',
			'imgs/mouse.png',
			'imgs/wall.png',
			'imgs/arrow.png',
			'imgs/title.png',
			'imgs/gameover.png',
		];
		for (var i = 0; i <= 9; ++i) {
			images.push('imgs/Animation/Frames_mouse/mouse_animated000'+ i +'.png');
		}
		for (var i = 0; i <= 11; ++i) {
			images.push('imgs/Animation/Frames_arrow/arrow_animated00'+ (i < 10 ? '0' : '') + i +'.png');
		}
		PIXI.loader.add(images)
		.load(SmellWorld.setup);
	},

	setup: function() {
		GameStateTitle.setup();

		Input.init();
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
};
