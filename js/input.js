var Input = {
	callbacks: {},

	init: function(callbacks) {
		Input.callbacks = callbacks;
		window.addEventListener('keydown', Input.keydown);
	},

	keydown: function(event) {
		 if (event.defaultPrevented) {
		 	return;
		 }

		 switch (event.key) {
		 	case 'ArrowDown':
				Input.callbacks.move({x: 0, y: 1});
				break;
		 	case 'ArrowLeft':
				Input.callbacks.move({x: -1, y: 0});
				break;
		 	case 'ArrowUp':
				Input.callbacks.move({x: 0, y: -1});
				break;
		 	case 'ArrowRight':
				Input.callbacks.move({x: 1, y: 0});
				break;
		 }
	},
};
