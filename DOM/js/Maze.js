// http://designformasters.info/posts/objectifying-javascript/
// http://www.cyberguru.ru/web/html/javascript-introduction-to-objective-js-page2.html
	"use strict";	

	var Maze = function(options) {					
		
		Object.defineProperty(this, "data", {
    				value: options.data,
   					writable: false
		});
	
		return;
	};

	 // the 'this' keyword refers to the object instance
	 // you can access only 'privileged' and 'public' members	 
	Maze.prototype.getPaths = function(start, finish) {	

		var findAllPaths = function(x, y, path) {			
			
			if (searchSubArray(path, [x, y]) > 0) {				
				return;
			}

			path.push([x, y]);			

			if ((x === finish.x) && (y === finish.y)) {
				allPaths.push(path);
				return;
			}	
			
			 // top			
	        if (data[y-1][x-1].top === false) {
	           //	console.log("top");
	            findAllPaths(x, y-1, path.slice());
	               
	        }			
	        			
			// right
	        if (data[y-1][x-1].right === false) {
	           //  console.log("right");
	             findAllPaths(x+1, y, path.slice());
	                
	        }					
			
			 // bottom
	        if (data[y-1][x-1].bottom === false) {
	           // console.log("bottom");
	            findAllPaths(x, y+1, path.slice());	                
	        }        

	       // left
	        if (data[y-1][x-1].left === false) {
	           //	console.log("left");  
	            findAllPaths(x-1, y, path.slice());	                    
	        }

		}			

		var searchSubArray = function(array, target) {
			var result = -1;
			target = target.toString();				
			var len = array.length;

			for (var i = 0; i < len; i++) {
				if (target === array[i].toString()) {
					result = i;
					break;
				}		
			}
			return result + 1;
		}

		var data = this.data;
		var allPaths = [];
		var x = start.x;
		var y = start.y;		
		var out;
		var i, j;
		var maze = this;
		var paths;
		var i, j;
		var path;
		var pathData;

		findAllPaths(x, y, []);	
		
		pathData = [];
		for (i = 0; i < allPaths.length; i++) {
			path = allPaths[i];
			paths = [];
			for (j = 0; j < path.length; j++) {
				paths[j] = {x: path[j][0], y: path[j][1]};				
			}
			pathData.push(new Maze.Path({data: paths, maze: maze}));
		}
		return pathData;
	};

	// A 'static method', it's just like a normal function 
	// it has no relation with any 'Maze' object instance
	Maze.generate = function (options) {
		"use strict"; 

		var width = options.width;
		var height = options.height;
		var possiblePaths = options.possiblePaths;
		var start = options.start;
		var finish = options.finish;		
		var paths;
		var i, j;		

		console.log("-------------------------------------------------------------------------------------");
		console.log("W= " + width + " H= " + height);
		
		var countBorders = function (cell) {
			var top = cell.top ? 1 : 0;
			var bottom = cell.bottom ? 1 : 0;
			var left = cell.left ? 1 : 0;
			var right = cell.right ? 1 : 0;
			return (top + bottom + left + right);
		}
		
		var getRandomInt = function(min, max) {
			"use strict";
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		var digLockedTunnels = function() {
			var deadCells = [];
 			var cell;

	 		// create and init data array

	 		for (i = 0; i < height; i++) {
	 			for (j = 0; j < width; j++) {
	 					cell = vertexes[i][j];
	 				if (countBorders(cell) == 4) {
	 					deadCells.push({x: i+1, y: j+1});
	 				}
	 			}
	 		}

	 		deadCells.reverse();
	 		var x;
	 		var y;
	 		var currentVertex;
	 		var direction;
			var path; 

	 		while (deadCells.length != 0) {
	 			cell = deadCells.pop();
	 			x = cell.x;
	 			y = cell.y;
	 			currentVertex = vertexes[x-1][y-1];

	 			while(countBorders(currentVertex) > 2) {
	 				while (true) {
	 				    direction = getRandomInt(1,4);
	 					if ((direction === 1)  && (currentVertex.top === true)) { // top
	 					    currentVertex.top = false;
	 			            x = x - 1; 
	 			           	vertexes[x-1][y-1].bottom = false;
	 			           	break;
	 			        } 			

	 				   	if ((direction === 2) && (currentVertex.right === true)) { // right
	 			           	currentVertex.right = false;
	 			          	y = y + 1;
	 			          	vertexes[x-1][y-1].left = false;
	 			           	break;
	 			        }			   

	 				   	if ((direction === 3)  && (currentVertex.bottom === true)) { // bottom
	 			           	currentVertex.bottom = false;
	 			            x = x + 1;
	 			            vertexes[x-1][y-1].top = false;
	 			            break;
	 				   	}

	 				    if ((direction === 4) && (currentVertex.left === true)) { // left
	 				        currentVertex.left = false;
	 				        y = y - 1;
	 				        vertexes[x-1][y-1].right = false;
	 				        break;
	 				    }

	 				}

	 		    	currentVertex = vertexes[x-1][y-1];
	 			}

	 		}			
		}
		// all cells have at least one path
		var digTunnels = function(options) {
			var x = options.x;
			var y = options.y;		
			var currentVertex = vertexes[x-1][y-1];			
			var nextVertex;
			
			if ((currentVertex.top === true)) {
				nextVertex = vertexes[x-2][y-1];
				if (countBorders(nextVertex) == 4) {				
					currentVertex.top = false;
					nextVertex.bottom = false;
					digTunnels({x: x-1, y: y});
				}	
			}
				
			if ((currentVertex.bottom === true)) {
				nextVertex = vertexes[x][y-1];
				if (countBorders(nextVertex) == 4){			
					currentVertex.bottom = false;
					nextVertex.top = false;
					digTunnels({x: x+1, y: y});
				}	

			}			

			if ((currentVertex.left === true)){
				nextVertex = vertexes[x-1][y-2];
				if (countBorders(nextVertex) == 4) {			
					currentVertex.left = false;
					nextVertex.right = false;
					digTunnels({x: x, y: y-1});
				}
			}

			if ((currentVertex.right === true)){
				nextVertex = vertexes[x-1][y];
				if (countBorders(nextVertex) == 4) {				
					currentVertex.right = false;
					nextVertex.left = false;
					digTunnels({x: x, y: y+1});
				}	
			}			
			
		}

		
		Graph.createGraph({width: width, height: height});
		paths = Graph.generatePaths({start: start, finish: finish, possiblePaths: possiblePaths});
		
		var vertexes = Graph.getVertexs();		
		var path;
		var len;
		var elem;
		var currentVertex;
		var x, y;
		// пройтись по всем ячейкам пути (ей)
		for (j = 0; j < paths.length; j++) {
			path = paths[j];
			len = path.length;
			for (i = 0; i < len; i++) {
				elem = path[i];
				digTunnels({x: elem.y, y: elem.x});
			}
		}	

		var maze = new Maze({data: vertexes});			
		return maze;
	};

	

	
	

	

	


