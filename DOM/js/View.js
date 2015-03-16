"use strict"; 

/**
 * Created by Dima on 03.03.2015.
 */
function MazeView(numW, numH, domContainer) {    
		
    this.drawField = function (firstrow) {   		
        var i;
        var j;
		var domCell;		
		var className;
		var sellSize;
		
        for (j = 0; j < numH; j++) {
            for (i = 0; i < numW; i++) {				
				domCell = document.createElement('div');						
				className = 'cell';
                if (firstrow[j][i].hasRightBorder == true) {					
					className = className + ' cellRightBorder';						
                }
                if (firstrow[j][i].hasBottomBorder == true) {					
					className = className + ' cellBottomBorder';					
                }				
				domCell.className = className;
				domContainer.appendChild(domCell);				
            }
        }
		
		domContainer.style.width = 20 * numW + "px";
    }   

    this.drawInOut = function (inOut) {
        var inCell = document.createElement('div');
		inCell.id = "inCell";
		inCell.className = "inCell";
		inCell.style.left = (inOut[0][0]-1)*20 + 'px';
		inCell.style.top = (inOut[0][1]-1)*20 + 'px';
		domContainer.appendChild(inCell);		
		var outCell = document.createElement('div');
		outCell.id = "outCell";
		outCell.className = "outCell";
		outCell.style.left = (inOut[1][0]-1)*20 + 'px';
		outCell.style.top = (inOut[1][1]-1)*20 + 'px';
		domContainer.appendChild(outCell);       
    }
	
	this.drawRoute = function (route) {       
		console.log(route);		
		var i;
		var cells;
		var x, y;
		var cell;
		var className;
		
		cells = document.querySelectorAll(".cell");		
		for (i = 0; i < route.length; i++) {
			x = route[i][0]-1;
			y = route[i][1]-1;
			cell = cells[y*numW+x];
			className = cell.className + " cellPath";
			cell.className = className;			
		}		
	}
	 
	this.drawBorders = function () {
		var border = document.createElement('div');
		border.id = "border";
		border.className = "border";		
		border.style.width = 20 * numW + "px";
		border.style.height = 20 * numH + "px";
		domContainer.appendChild(border);	
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
    return this;
}
