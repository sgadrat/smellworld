var GameStateGameover = {
	sprites: {
		screen: null,
	},

	setup: function() {
		SmellWorld.gameState = GameStateGameover;
		SmellWorld.pixi.stage.removeChildren();

		GameStateGameover.sprites.screen = new PIXI.Sprite(PIXI.loader.resources["imgs/gameover.png"].texture);
		GameStateGameover.sprites.screen.x = 0;
		GameStateGameover.sprites.screen.y = 0;
		SmellWorld.pixi.stage.addChild(GameStateGameover.sprites.screen);
	},

	updateGame: function(currentTime) {
	},

	updateStage: function(currentTime) {
	},

	commandMove: function(direction) {
		GameStateTitle.setup();
    },
};
