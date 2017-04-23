var GameStateTitle = {
	sprites: {
		title: null,
	},
	controllerReady: false,

	setup: function() {
		SmellWorld.gameState = GameStateTitle;
		SmellWorld.pixi.stage.removeChildren();

		controllerReady = true;

		GameStateTitle.sprites.title = new PIXI.Sprite(PIXI.loader.resources["imgs/title.png"].texture);
		GameStateTitle.sprites.title.x = 0;
		GameStateTitle.sprites.title.y = 0;
		SmellWorld.pixi.stage.addChild(GameStateTitle.sprites.title);

		document.getElementById('music').play();
	},

	updateGame: function(currentTime) {
		if (Input.state['ArrowUp'] || Input.state['ArrowRight'] || Input.state['ArrowDown'] || Input.state['ArrowLeft']) {
			if (GameStateTitle.controllerReady) {
				GameStateIngame.setup();
			}
		}else if (!Input.state['ArrowUp'] && !Input.state['ArrowRight'] && !Input.state['ArrowDown'] && !Input.state['ArrowLeft']) {
			GameStateTitle.controllerReady = true;
		}
	},

	updateStage: function(currentTime) {
	},
};
