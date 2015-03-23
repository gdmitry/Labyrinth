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
		var data = [];
		
		// create and init data array
		for (i = 0; i < height; i++) {	
			data[i] = [];		
			for (j = 0; j < width; j++) {
				data[i][j] = new Maze.Cell();
			}
		}

		// generation of paths
		Graph.createGraph({width: width, height: height});
		paths = Graph.generatePaths({start: start, finish: finish, possiblePaths: possiblePaths});		
		var vertexes = Graph.getVertexs();

		
		var maze = new Maze({data: data});	
		return maze;
	};

	

	
	

	

	


