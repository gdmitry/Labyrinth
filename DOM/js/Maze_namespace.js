var Maze = {
	mazeModel: null,
	mazeView: null,	
	horizontalNum: -1,
	verticalNum: -1,
	canvas: null,
	inOut: null,
	
    init: function(domContainer) {		
		canvas = document.createElement('div');
		canvas.id = "canvas";
		canvas.className = "canvas";
		domContainer.appendChild(canvas);		
    },

    generate: function(x, y) {		
		horizontalNum = x;
		verticalNum = y;				
		mazeModel = new MazeModel(x, y);	
		inOut = mazeModel.getInOut();		
		return mazeModel.generateMaze();
    },
	
	getPaths: function(maze) {	
		var endCell = inOut[1];
		var startCell = inOut[0];		
		maze[startCell[1]-1][startCell[0]-1].label = 0;
		var mazePaths = mazeModel.findAllPaths(maze, endCell); 		
		return mazePaths;
    },
	
	render: function(maze) {		
		mazeView = new MazeView(horizontalNum, verticalNum, canvas);		
		mazeView.drawField(maze); // draws maze
		mazeView.drawInOut(inOut); // draws in and out
		mazeView.drawBorders();
    },
	
	renderPath: function(path) {
		mazeView.drawRoute(path);
    },
	
	clearPath: function() {
		mazeView.clearPath();		
    },
	
	getMinPath: function(maze) {
		var endCell = inOut[1];
		mazeModel.setPathLabels(maze, inOut);
		var mazePath = mazeModel.findPathKoordinates(maze, endCell); 
		return mazePath;
	}
	
};
