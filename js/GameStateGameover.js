var GameStateGameover = {
	sprites: {
		screen: null,
	},
	controllerReady: false,

	setup: function() {
		SmellWorld.gameState = GameStateGameover;
		SmellWorld.pixi.stage.removeChildren();

		GameStateGameover.controllerReady = false;

		GameStateGameover.sprites.screen = new PIXI.Sprite(PIXI.loader.resources["imgs/gameover.png"].texture);
		GameStateGameover.sprites.screen.x = 0;
		GameStateGameover.sprites.screen.y = 0;
		SmellWorld.pixi.stage.addChild(GameStateGameover.sprites.screen);
	},

	updateGame: function(currentTime) {
		if (Input.state['ArrowUp'] || Input.state['ArrowRight'] || Input.state['ArrowDown'] || Input.state['ArrowLeft']) {
			if (GameStateGameover.controllerReady) {
				GameStateIngame.setup();
			}
		}else if (!Input.state['ArrowUp'] && !Input.state['ArrowRight'] && !Input.state['ArrowDown'] && !Input.state['ArrowLeft']) {
			GameStateGameover.controllerReady = true;
		}
	},

	updateStage: function(currentTime) {
	},
};
