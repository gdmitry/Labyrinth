// http://designformasters.info/posts/objectifying-javascript/
// http://www.cyberguru.ru/web/html/javascript-introduction-to-objective-js-page2.html
	"use strict";	

	var Maze = function(genData) {
		var data = genData;				
		
		this.getData = function() {
			return data;
		}	
	
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

		var data = this.getData();
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
				//console.log(paths[j]);
			}
			pathData.push(new Maze.Path(paths, maze));
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
		// array of cells
		var randomMaze;
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

		var currentCell, bottomCell, rightCell;
		// generation random eller maze
		randomMaze = RandomMaze.generate(width, height);
		
		for (i = 0; i < height-1; i++) {			
			for (j = 0; j < width-1; j++) {
				currentCell = data[i][j];
				bottomCell = data[i+1][j];
				rightCell = data[i][j+1];

				currentCell.right = randomMaze[i][j].hasRightBorder;
				currentCell.bottom = randomMaze[i][j].hasBottomBorder;
				
				bottomCell.top = currentCell.bottom;				
				rightCell.left = currentCell.right;
			}
		}

		// for last row
		for (i = 0; i < width-1; i++) {	
			currentCell = data[height-1][i];
			rightCell = data[height-1][i+1];

			currentCell.right = randomMaze[height-1][i].hasRightBorder;
			rightCell.left = currentCell.right;
		}

		// for last column
		for (i = 0; i < height-1; i++) {	
			currentCell = data[i][width-1];
			bottomCell = data[i+1][width-1];

			currentCell.bottom = randomMaze[i][width-1].hasBottomBorder;
			bottomCell.top = currentCell.bottom;
		}

		

		Module.createGraph(width, height);
		paths = Module.generatePaths(start, finish, possiblePaths);		
		var vertexes = Module.getVertexs();
		var path;
		var elem;
		var vertex;

		/*var out;
		for (i = 0; i < height; i++) {			
			out = "";
			for (j = 0; j < width; j++) {
				out = out + vertexes[i][j].top + "|";
				out = out + vertexes[i][j].right + "|";
				out = out + vertexes[i][j].bottom + "|";
				out = out + vertexes[i][j].left + "=";
			}
			console.log(out);
		}
		console.log("-----------------------------------------");*/
		
		var topCell, leftCell;

		// build paths
		for (i = 0; i < paths.length; i++) {
			path = paths[i];
			for (j = 0; j < path.length; j++) {
				elem = path[j];
				vertex = vertexes[elem.y-1][elem.x-1];
				currentCell = data[elem.y-1][elem.x-1];
				currentCell.right = !vertex.right;		
				currentCell.bottom = !vertex.bottom;	
				currentCell.top = !vertex.top;
				currentCell.left = !vertex.left;

				if (elem.x < width-1) {
					rightCell = data[elem.y-1][elem.x];
					rightCell.left = currentCell.right;
				}

				if (elem.x > 1) {
					leftCell = data[elem.y-1][elem.x-2];
					leftCell.right = currentCell.left;
				}

				if (elem.y > 1) {
					topCell = data[elem.y-2][elem.x-1];
					topCell.bottom = currentCell.top;
				}

				if (elem.y < height-1) {
					bottomCell = data[elem.y][elem.x-1];
					bottomCell.top = currentCell.bottom;
				}
			}
		}
/*
		

		
		for (i = 0; i < height; i++) {			
			out = "";
			for (j = 0; j < width; j++) {
				out = out + data[i][j].top + "|";
				out = out + data[i][j].right + "|";
				out = out + data[i][j].bottom + "|";
				out = out + data[i][j].left + "=";
			}
			console.log(out);
		}
*/
		var maze = new Maze(data);	
		return maze;
	};

	/**
	 * true - border present
	 * false - no border
	 *
	 */
	Maze.Cell = function() {
		/*this.top = false;
		this.left = false;
		this.right = false;
		this.bottom = false;*/

		this.top = true;
		this.left = true;
		this.right = true;
		this.bottom = true;
	};

	Maze.Path = function(data, maze) {
			var data;
			var maze;

			this.getMaze = function() {
				return maze;
			}

			this.getData = function() {
				return data;
			}
			return;
	};
	
	Maze.View = function(domContainer) {
	
		
		var renderMaze = function (maze) {
			"use strict";			

			var i, j;
			var height;
			var width;
			var data;
			var domCell;
			var className;
 			
			data = maze.getData();
			height = data.length;
			width = data[0].length;

			for (i = 0; i < height; i++) {			
				for (j = 0; j < width; j++) {
					domCell = document.createElement('div');						
					className = 'cell';
	                if (data[i][j].right == true) {					
						className = className + ' cellRightBorder';						
	                }
	                if (data[i][j].bottom == true) {					
						className = className + ' cellBottomBorder';					
	                }
	                if (j == 0) {
	                	className = className + ' cellLeftBorder';
	                }	
	                if (i == 0) {
	                	className = className + ' cellTopBorder';
	                }			
					domCell.className = className;
					domContainer.appendChild(domCell);	
				}
			}

			domContainer.style.width = 20 * width + "px";
		};

		var renderPath = function(path) {
			//console.log(path);		
			var i;
			var cells;
			var x, y;
			var cell;
			var className;
			var numW = path.getMaze().getData()[0].length;
			var data = path.getData();
			//console.log(data);
			cells = document.querySelectorAll(".cell");		
			for (i = 0; i < data.length; i++) {
				x = data[i].x-1;
				y = data[i].y-1;
				cell = cells[y*numW+x];
				if (cell.className.indexOf("cellPath") === -1) {	
					className = cell.className + " cellPath";
					cell.className = className;		
				}	
			}		
		};		

		this.init = function() {	
			while (domContainer.firstChild) {
	   			domContainer.removeChild(domContainer.firstChild);
			}	
		}

		this.render = function(obj) {
			"use strict";
			if (obj instanceof Maze) { // check if it is instance of Maze or Path
				this.init();
				renderMaze(obj);
			} else {
				if (obj instanceof Maze.Path) { // check if it is instance of Maze or Path
					renderPath(obj);
				}
			}
			
		}

		this.clearPath = function (){
			var i;
			var cells;
			var className;
			var cell;
			
			cells = document.querySelectorAll(".cellPath");		
			for (i = 0; i < cells.length; i++) {
				cell = cells[i];
				className = cell.className;						
				className = className.replace(" cellPath", "");
				cell.className = className;			
			}
		}

	}

	


