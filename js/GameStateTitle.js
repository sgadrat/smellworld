var GameStateTitle = {
	sprites: {
		title: null,
	},

	setup: function() {
		SmellWorld.gameState = GameStateTitle;
		SmellWorld.pixi.stage.removeChildren();

		GameStateTitle.sprites.title = new PIXI.Sprite(PIXI.loader.resources["imgs/title.png"].texture);
		GameStateTitle.sprites.title.x = 0;
		GameStateTitle.sprites.title.y = 0;
		SmellWorld.pixi.stage.addChild(GameStateTitle.sprites.title);
	},

	updateGame: function(currentTime) {
	},

	updateStage: function(currentTime) {
	},

	commandMove: function(direction) {
		GameStateIngame.setup();
    },
};
