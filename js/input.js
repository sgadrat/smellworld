var Input = {
	state: {
		'ArrowDown': false,
		'ArrowLeft': false,
		'ArrowUp': false,
		'ArrowRight': false,
	},

	init: function() {
		window.addEventListener('keydown', Input.keydown);
		window.addEventListener('keyup', Input.keyup);
	},

	keydown: function(event) {
		if (event.defaultPrevented) {
			return;
		}

		var key = Input.getNormalizedKey(event);
		if (key in Input.state) {
			Input.state[key] = true;
		}
	},

	keyup: function(event) {
		if (event.defaultPrevented) {
			return;
		}

		var key = Input.getNormalizedKey(event);
		if (key in Input.state) {
			Input.state[key] = false;
		}
	},

	getNormalizedKey: function(event) {
		var key = null;
		if (typeof event.key != 'undefined') {
			key = event.key;
		}else {
			key = event.keyCode;
			switch (key) {
				case 0x28:
					key = 'ArrowDown';
					break;
				case 0x27:
					key = 'ArrowRight';
					break;
				case 0x26:
					key = 'ArrowUp';
					break;
				case 0x25:
					key = 'ArrowLeft';
					break;
			}
		}
		return key;
	},
};
