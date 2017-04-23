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

		var key = null;
		if (typeof undefined != 'undefined') {
			key = event.key;
		}else {
			key = event.keyCode;
		}

		switch (key) {
			case 'ArrowDown':
			case 0x28:
				Input.callbacks.move({x: 0, y: 1});
				break;
			case 'ArrowLeft':
			case 0x25:
				Input.callbacks.move({x: -1, y: 0});
				break;
			case 'ArrowUp':
			case 0x26:
				Input.callbacks.move({x: 0, y: -1});
				break;
			case 'ArrowRight':
			case 0x27:
				Input.callbacks.move({x: 1, y: 0});
				break;
		}
	},
};
