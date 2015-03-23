Maze.View = function(domContainer) {
		
		
		var renderMaze = function (maze) {
			"use strict";			

			var i, j;
			var height;
			var width;
			var data;
			var domCell;			
 			
			data = maze.data;
			height = data.length;
			width = data[0].length;

			for (i = 0; i < height; i++) {			
				for (j = 0; j < width; j++) {
					domCell = document.createElement('div');						
					domCell.classList.add("cell");
	                if (data[i][j].right) {				
	                	domCell.classList.add("cellRightBorder");											
	                }
	                if (data[i][j].bottom) {	
	                	domCell.classList.add("cellBottomBorder");										
	                }
	                if (j == 0) {
	                	domCell.classList.add("cellLeftBorder");	                	
	                }	
	                if (i == 0) {
	                	domCell.classList.add("cellTopBorder");	                
	                }								
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
			var domCell;
			var className;
			var maze = path.maze;
			var numW = maze.data[0].length;
			var data = path.data;

			renderMaze(maze);
			cells = document.querySelectorAll(".cell");		
			for (i = 0; i < data.length; i++) {
				x = data[i].x-1;
				y = data[i].y-1;
				domCell = cells[y*numW+x];
				domCell.classList.add("cellPath");				
			}		
		};		

		var init = function() {	
			while (domContainer.firstChild) {
	   			domContainer.removeChild(domContainer.firstChild);
			}	
		}

		this.render = function(obj) {
			"use strict";
			init();
			if (obj instanceof Maze) { 			
				renderMaze(obj);
			} else {
				if (obj instanceof Maze.Path) { 
					renderPath(obj);
				}
			}
			
		}
	}