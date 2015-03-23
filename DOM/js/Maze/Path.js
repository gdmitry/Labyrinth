Maze.Path = function(options) {
		Object.defineProperty(this, "data", {
    				value: options.data,
   					writable: false
		});

		Object.defineProperty(this, "maze", {
    				value: options.maze,
   					writable: false
		});

		return;
};
	