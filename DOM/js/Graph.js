var Graph = (function () {
 	"use strict";

 	var vertexs; // array of cells as vertexs of graph
 	var width;
	var height;
	var i;
	var j; 		

	var countEdges = function(x, y) {
		"use strict";
		var top = vertexs[y-1][x-1].top ? 0 : 1;
		if (vertexs[y-1][x-1].top === -1) { top = 0 };

		var bottom = vertexs[y-1][x-1].bottom ? 0 : 1;
		if (vertexs[y-1][x-1].bottom === -1) { bottom = 0 };

		var left = vertexs[y-1][x-1].left ? 0 : 1;
		if (vertexs[y-1][x-1].left === -1) { left = 0 };

		var right = vertexs[y-1][x-1].right ? 0 : 1;
		if (vertexs[y-1][x-1].right === -1) { right = 0 };

		return (top + bottom + left + right);
	};

	// Removes an edge between two vertexs
	var removeEdge = function(x, y, elem) {
		"use strict";
		var x1 = elem.x;
		var y1 = elem.y;
				
		if (x == x1){
			if (y > y1) {
			 	vertexs[y-1][x-1].top = -1;
			 	vertexs[y1-1][x1-1].bottom = -1;
			} else {
			 	vertexs[y-1][x-1].bottom = -1;
			 	vertexs[y1-1][x1-1].top = -1;
			}
		}
		if (y == y1){
			if (x > x1) {
				vertexs[y-1][x-1].left = -1;
				vertexs[y1-1][x1-1].right = -1;
			} else {
				vertexs[y-1][x-1].right = -1;
				vertexs[y1-1][x1-1].left = -1;
			}
		}			 
		return {x: x1, y: y1};
	};	

	// Chages current vertex
	var makeMove = function(x, y, index) {
		"use strict";
		var direction;
		var currentVertex;

		currentVertex = vertexs[y-1][x-1];
		currentVertex.label = index;	
		while(true) {
		    direction = getRandomInt(1,4);  

			if ((direction === 1)  && (currentVertex.top === true)) { // top
			    currentVertex.top = false;
	            y = y - 1; 
	           	vertexs[y-1][x-1].bottom = false;
	           	break;
	        }
		  
		   	if ((direction === 2) && (currentVertex.right === true)) { // right
	           	currentVertex.right = false;
	          	x = x + 1;
	          	vertexs[y-1][x-1].left = false;
	           	break;
	        }
		   
		   	if ((direction === 3)  && (currentVertex.bottom === true)) { // bottom
	           	currentVertex.bottom = false;
	            y = y + 1;
	            vertexs[y-1][x-1].top = false;
	            break;
		   	}

		    if ((direction === 4) && (currentVertex.left === true)) { // left
		        currentVertex.left = false;
		        x = x - 1;
		        vertexs[y-1][x-1].right = false;
		        break;
		    }
		}

		return {x: x, y: y};
	};

	// set default deadlocks for border vertexs of graph
	var initVertexs = function() {
		"use strict";
		// set tops	and bottoms deadlocks
		for(j = 0; j < width; j++)  {
			vertexs[0][j].top = -1;
			vertexs[height-1][j].bottom = -1;
		}
		// set tops	and bottoms deadlocks
		for(j = 0; j < height; j++)  {
			vertexs[j][0].left = -1;
			vertexs[j][width-1].right = -1;
		}
	};


	// Returns a path between two points in graph
	var generatePath = function(start, finish) {
		"use strict";		

		var x = start.x;
		var y = start.y;
		var xx = finish.x;
		var yy = finish.y;
		var path = [];
		var index = 0;			
		var currentVertex;
		var flag = true;
		var elem;
		var result;

		while (true) {	
			  
			if ((x === xx) && (y === yy)) { // check if finish is reached
		    	break;
		    } 
			
			if ((countEdges(x, y) != 1) && (index !=0)) {	// check for cycle				 		 
		 		elem = path.pop();
		 		result = removeEdge(x, y, elem);
		 		x = result.x;
		 		y = result.y;
		 		index = vertexs[y-1][x-1].label;
		 	}			 	
		 	
		 	while ((countAllEdges(x, y) == 4) && (path.length != 0)) { //check for deadlock		 		
		 		vertexs[y-1][x-1].label = -3; // mark as no way out		
		 		elem = path.pop();			
		 		result = removeEdge(x, y, elem);
		 		x = result.x;
		 		y = result.y;
		 		index = vertexs[y-1][x-1].label;
		 	}
			
			if ((path.length == 0) && (flag == false)) {
			 	break;
		 	}
			
			flag = false;			 	   	
			  
			    path.push({x: x, y: y});			   		       
			    result = makeMove(x, y, index);
			    index = index + 1;
			    x = result.x;
			    y = result.y;
		}
		// add finish point
		currentVertex = vertexs[y-1][x-1];
		currentVertex.label = index;	
		path.push({x: x, y: y});
		return path;
	};


	// Removes all deadlock in graph
	var resetDeadLocks = function() {
		"use strict";
		var elem;

		for(i = 0; i < height; i++)  {			
			for(j = 0; j < width; j++)  {
				elem = vertexs[i][j];
				//elem.label = -1;
				if (elem.top === -1) { elem.top = true;}
				if (elem.bottom === -1) { elem.bottom = true;}
				if (elem.left === -1) { elem.left = true;}
				if (elem.right === -1) { elem.right = true;}
			}
		}
		return;
	};	

	// Counts all available edges including deadlocks
	var countAllEdges = function(x, y) {
		"use strict";
		var top = vertexs[y-1][x-1].top;
		var bottom = vertexs[y-1][x-1].bottom;
		var left = vertexs[y-1][x-1].left;
		var right = vertexs[y-1][x-1].right;

		top = ((top === false) || (top === -1)) ? 1 : 0;
		bottom = ((bottom === false) || (bottom === -1)) ? 1 : 0;
		left = ((left === false) || (left === -1)) ? 1 : 0;
		right = ((right === false) || (right === -1)) ? 1 : 0;
		return (top + bottom + left + right);
	};

	/**
	 * Prints all vertexs from array
	 */
	var printVertexs = function() {		
		"use strict";
		var str;	
		
		console.log("-------------------------------------------------------------------------------------");
		for(i = 0; i < height; i++)  {	
				str = "";		
			for(j = 0; j < width; j++)  {
				str = str + vertexs[i][j].label + " ";
			}
			console.log(str);
		}
		console.log("-------------------------------------------------------------------------------------");
		return;
	};


	/**
	 * Returns a random integer between min (inclusive) and max (inclusive)
	 * Using Math.round() will give you a non-uniform distribution!
	 */
	var getRandomInt = function(min, max) {
		"use strict";
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	return {  	
	  	// Creates an empty graph
		createGraph: function(options) {
			"use strict";
			width = options.width;
			height = options.height;		

			vertexs = [];
			// create array of vertexs
			for(i = 0; i < height; i++)  {	
				vertexs[i] = [];		
				for(j = 0; j < width; j++)  {
					vertexs[i][j] = new Maze.Cell();
				}
			}

			initVertexs();
			return vertexs;	
		},	

		getVertexs: function() {
			return vertexs;
		},

		generatePaths: function(options) {
			"use strict";
			var start = options.start;
			var finish = options.finish;
			var possiblePaths = options.possiblePaths;
			var temp;
			var PointA;
			var PointB;			
			var pathA;
			var pathB;
			var i;			
			var paths = [];
			var allPaths = [];
			var path;
			var start;
			var end;
			var k;
			// find first path
			// find first path
			console.log("Start= " + start.x + " " + start.y + " finish= " + finish.x + " " + finish.y);			 
			var firstPath = generatePath(start, finish);
			allPaths.push(firstPath);
			resetDeadLocks();
			initVertexs();	
			printVertexs();

			i = 1;
			while (i < possiblePaths) {
				start = 0;
				end = firstPath.length-1;
				console.log(firstPath);
				for (k = end; k > start; k = k-1) {
					//console.log(k);
					while ((countAllEdges(firstPath[start].x, firstPath[start].y) == 4) && (start < end)) {
						start = start + 1;
					}
					if (countAllEdges(firstPath[k].x, firstPath[k].y) != 4) {
						if (i < possiblePaths) { 							
							path = generatePath(firstPath[start], firstPath[k]);
							resetDeadLocks();
							initVertexs();
							if (path.length != 1) {							
								paths.push(path);
								allPaths.push(path);
								i = i+1;
							}
							start = start +1;
						} 					
					}					
					
				}
				
				if (paths.length != 0) {
					firstPath = paths.pop();
				} else {
					break;
				}							
				
			}

			printVertexs();
			resetDeadLocks();// to remove -1 (deadlock) as -1 is true (a way)
			initVertexs();
			console.log("Found paths:");
			console.log(allPaths);
			return allPaths;
		}
	  
 	};

})();