var MazeGenerator = {
	generateMaze: function() {
		var max_w = 10;
		var max_h = 10;
		var min_w = 5;
		var min_h = 5;
		var width = MazeGenerator.rand(min_w, max_w);
		var height = MazeGenerator.rand(min_h, max_h);
		var maze = MazeGenerator.generateWallMaze({
			width: width,
			height: height,
		});

		var mousePos = { x: MazeGenerator.rand(1, width-2), y: MazeGenerator.rand(1, height-2) };
		var cheesePos = { x: MazeGenerator.rand(1, width-2), y: MazeGenerator.rand(1, height-2) };
		while (cheesePos.x == mousePos.x && cheesePos.y == mousePos.y) {
			cheesePos = { x: MazeGenerator.rand(1, width-2), y: MazeGenerator.rand(1, height-2) };
		}
		MazeGenerator.dig(mousePos, cheesePos, maze);
		maze[mousePos.y][mousePos.x] = MAZE_MOUSE;
		maze[cheesePos.y][cheesePos.x] = MAZE_CHEESE;

		return maze;
	},

	generateWallMaze: function(dimensions) {
		var maze = [];
		for (var y = 0; y < dimensions.height; ++y) {
			maze.push([]);
			for (var x = 0; x < dimensions.width; ++x) {
				maze[y].push(MAZE_WALL);
			}
		}
		return maze;
	},

	dig: function(start, goal, maze) {
		var current = {x: start.x, y:start.y};
		while (current.x != goal.x) {
			maze[current.y][current.x] = MAZE_FLOOR;
			if (current.x < goal.x) {
				++current.x;
			}else {
				--current.x;
			}
		}
		maze[current.y][current.x] = MAZE_FLOOR;
		while (current.y != goal.y) {
			maze[current.y][current.x] = MAZE_FLOOR;
			if (current.y < goal.y) {
				++current.y;
			}else {
				--current.y;
			}
		}
	},

	rand: function(min, max) {
		return Math.floor(Math.random() * (max+1 - min) + min);
	},
};
