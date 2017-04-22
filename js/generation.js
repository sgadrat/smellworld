var MazeGenerator = {
	generateMaze: function() {
		// Tweakable parameters
		var min_w = 10; // Minimum maze width
		var min_h = 10; // Minimum maze height
		var max_w = 20; // Maximum maze width
		var max_h = 20; // Maximum maze height
		var maxTunnelsLength = 3; // Number of tiles the digger may dig before updating direction
		var numDummyTunnels = 2; // Number of tunnels not going to the cheese
		var numWaypoints = 2; // Number of intermediary goals for the tunnel between mouse and cheese

		// Generate a maze full of walls
		var width = MazeGenerator.rand(min_w, max_w);
		var height = MazeGenerator.rand(min_h, max_h);
		var maze = MazeGenerator.generateWallMaze({
			width: width,
			height: height,
		});

		// Choose cheese and mouse starting position
		var mousePos = { x: MazeGenerator.rand(0, 1) == 0 ? 1 : width - 2, y: MazeGenerator.rand(0, 1) == 0 ? 1 : height - 2 };
		var cheesePos = { x: MazeGenerator.rand(0, 1) == 0 ? 1 : width - 2, y: MazeGenerator.rand(0, 1) == 0 ? 1 : height - 2 };
		while (cheesePos.x == mousePos.x && cheesePos.y == mousePos.y) {
			cheesePos = { x: MazeGenerator.rand(0, 1) == 0 ? 1 : width - 2, y: MazeGenerator.rand(0, 1) == 0 ? 1 : height - 2 };
		}

		// Dig a tunnel from mouse to cheese
		var waypoints = [mousePos];
		for (var waypointNum = 0; waypointNum < numWaypoints; ++waypointNum) {
			var newWp = { x: MazeGenerator.rand(1, width-2), y: MazeGenerator.rand(1, height-2) };
			waypoints.push(newWp);
		}
		waypoints.push(cheesePos);
		for (waypointNum = 0; waypointNum < waypoints.length-1; ++waypointNum) {
			MazeGenerator.dig(waypoints[waypointNum], waypoints[waypointNum+1], maze, maxTunnelsLength);
		}

		// Dig dummy tunnels
		for (var tunnelNum = 0; tunnelNum < numDummyTunnels; ++tunnelNum) {
			var walls = [];
			var floors = [];
			for (var y = 1; y < height-1; ++y) {
				for (var x = 1; x < width-1; ++x) {
					if (maze[y][x] == MAZE_WALL) {
						walls.push({x: x, y: y});
					}
					if (maze[y][x] == MAZE_FLOOR) {
						floors.push({x: x, y: y});
					}
				}
			}

			if (floors.length > 1 && walls.length > 1) {
				MazeGenerator.dig(
					floors[MazeGenerator.rand(0, floors.length-1)],
					walls[MazeGenerator.rand(0, walls.length-1)],
					maze, maxTunnelsLength
				);
			}
		}

		// Place cheese and mouse
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

	dig: function(start, goal, maze, choiceFrequency) {
		var current = {x: start.x, y:start.y};
		var direction = null;
		var changeDirection = 0;
		while (current.x != goal.x || current.y != goal.y) {
			if (changeDirection == 0) {
				changeDirection = MazeGenerator.rand(1, choiceFrequency);
				var newDirection;
				if (current.y == goal.y || (current.x != goal.x) && Math.random() < 0.5) {
					newDirection = {y: 0, x: (current.x < goal.x) ? 1 : -1};
				}else {
					newDirection = {y: (current.y < goal.y) ? 1 : -1, x:0};
				}
				direction = newDirection;
			}
			--changeDirection;

			var newPosition = {
				x: current.x + direction.x,
				y: current.y + direction.y,
			};
			if (
				newPosition.x >= 1 && newPosition.x <= maze[0].length - 2 &&
				newPosition.y >= 1 && newPosition.y <= maze.length - 2
			)
			{
				if (
					Math.abs(goal.x - newPosition.x) < Math.abs(goal.x - current.x) ||
					Math.abs(goal.y - newPosition.y) < Math.abs(goal.y - current.y)
				)
				{
					current = newPosition;
				}
			}

			maze[current.y][current.x] = MAZE_FLOOR;
		}
	},

	rand: function(min, max) {
		return Math.floor(Math.random() * (max+1 - min) + min);
	},
};
