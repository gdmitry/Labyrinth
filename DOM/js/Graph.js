var Graph = (function () {
 	"use strict";

 	var vertexs; // array of cells as vertexs of graph
 	var width;
	var height;
	var i;
	var j;

 	var Vertex = function() {
		/*
		 *	false - unavailable
		 *	true - active
		 *	-1 - deadlock
		 */
		this.bottom = false;
		this.top = false;
		this.left = false;
		this.right = false;
		this.label = -1;
	};		

	var countEdges = function(x, y) {
		"use strict";
		var top = vertexs[y-1][x-1].top ? 1 : 0;
		if (vertexs[y-1][x-1].top === -1) { top = 0 };

		var bottom = vertexs[y-1][x-1].bottom ? 1 : 0;
		if (vertexs[y-1][x-1].bottom === -1) { bottom = 0 };

		var left = vertexs[y-1][x-1].left ? 1 : 0;
		if (vertexs[y-1][x-1].left === -1) { left = 0 };

		var right = vertexs[y-1][x-1].right ? 1 : 0;
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

			if ((direction === 1) && (y > 1) && (currentVertex.top === false)) { // top
			    currentVertex.top = true;
	            y = y - 1; 
	           	vertexs[y-1][x-1].bottom = true;
	           	break;
	        }
		  
		   	if ((direction === 2) && (x < width) && (currentVertex.right === false)) { // right
	           	currentVertex.right = true;
	          	x = x + 1;
	          	vertexs[y-1][x-1].left = true;
	           	break;
	        }
		   
		   	if ((direction === 3) && (y < height) && (currentVertex.bottom === false)) { // bottom
	           	currentVertex.bottom = true;
	            y = y + 1;
	            vertexs[y-1][x-1].top = true;
	            break;
		   	}

		    if ((direction === 4) && (x > 1) && (currentVertex.left === false)) { // left
		        currentVertex.left = true;
		        x = x - 1;
		        vertexs[y-1][x-1].right = true;
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
		 	
		 	while ((countAllEdges(x, y) == 4) && (path.length != 0)) { //check for tupik			 		
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
				if (elem.top === -1) { elem.top = false;}
				if (elem.bottom === -1) { elem.bottom = false;}
				if (elem.left === -1) { elem.left = false;}
				if (elem.right === -1) { elem.right = false;}
			}
		}
		return;
	};	

	// Counts all available edges including deadlocks
	var countAllEdges = function(x, y) {
		"use strict";
		var top = vertexs[y-1][x-1].top ? 1 : 0;
		var bottom = vertexs[y-1][x-1].bottom ? 1 : 0;
		var left = vertexs[y-1][x-1].left ? 1 : 0;
		var right = vertexs[y-1][x-1].right ? 1 : 0;
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
					vertexs[i][j] = new Vertex();
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
			var path;

			// find first path
			console.log("Start= " + start.x + " " + start.y + " finish= " + finish.x + " " + finish.y);
			var firstPath = generatePath(start, finish);
			paths.push(firstPath)
		/*	console.log(firstPath);*/
			printVertexs();			
			i = 1;		

			while (i < possiblePaths) {
				resetDeadLocks();		
				initVertexs();			


				
				while(true) {
					PointA = getRandomInt(0, firstPath.length-1);
					pathA = firstPath[PointA]; // start
					if((countAllEdges(pathA.x, pathA.y) != 4)) { break; }
				}
				
				while(true) {
					PointB = getRandomInt(0,  firstPath.length-1);
					pathB = firstPath[PointB]; // finish
					if((countAllEdges(pathB.x, pathB.y) != 4)) { break; }
				}					
					
				path = generatePath(pathA, pathB);
				if (path.length == 1) { // if there is not way
					continue;
				}
				paths.push(path);
				// added///////////////////////////////
				firstPath = path;

				i = i + 1;

				/*console.log("-------------------------------------------------------------------------------------");
				console.log("Start= " + pathA.x + " " + pathA.y + " finish= " + pathB.x + " " + pathB.y);
				console.log("Path:");
				console.log(path);*/
				printVertexs();
			}
			resetDeadLocks();// to remove -1 (deadlock) as -1 is true (a way)
			
			console.log("Found paths:");
			console.log(paths);
			return paths;
		}
	  
 	};

})();