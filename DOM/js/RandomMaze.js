var RandomMaze = (function () {
 	"use strict";
 	var numW;
 	var numH;

	var Cell = function () {

	    this.hasRightBorder = false;
	    this.hasBottomBorder = false;
	    this.setNumber = -1;
	    this.label = -1;
		
	    this.cloneCell = function() {
	        var c;
	        c = new Cell();
	        c.hasBottomBorder = this.hasBottomBorder;
	        c.hasRightBorder = this.hasRightBorder;
	        c.setNumber = this.setNumber;
	        return c;
	    }   

   		return this;
	};

	 // sets right border
    var prepareRow = function(row) {
        var i;

        for (i = 0; i < numW; i++) {
             row[i].hasRightBorder = false;
             if (row[i].hasBottomBorder == true){
                 row[i].setNumber = -1;
                 row[i].hasBottomBorder = false;
             }
        }

        return row;
    };

    // clones an row of Cell objects
    var cloneRow = function(array) {
        var outArray = [];
        var i;
        var len = array.length;

        for (i = 0; i < len; i++) {
            outArray[i] = array[i].cloneCell();
        }

        return outArray;
    };

    // set border or not
    var randomBorder = function() {
        var num = Math.random() > 0.5;        
        return num;
    };

    // sets init setNumber
    var fillRow = function(row) {
        var setNumber = 1;
        var i;
        
        for (i = 0; i < numW; i++) {
            if (row[i].setNumber == -1) {
                while (!checkUnique(row, setNumber)) {
                    setNumber++;
                }
                row[i].setNumber = setNumber;
            } else {
                setNumber = row[i].setNumber;
            }
        }
        return row;
    };

    // check for unique setNumber in row
    // !TO DO: rewrite using every
    var checkUnique = function(row, setNumber) {
        var i;

        for (i = 0; i < numW; i++) {
            if (row[i].setNumber == setNumber) {
                return false;
            }
        }
        return true;
    };

    // sets right border
    var initRightBorder = function(row) {
        var i;

        for (i = 0; i < numW-1; i++) {
            if (randomBorder() == false) {
                row[i+1].setNumber = row[i].setNumber;
            } else {               
                row[i].hasRightBorder = true;
            }
        }
        return row;
    };

    // sets bottom border
    var initBottomBorder = function(row) {
        var i;
        var k;

        i = 0;
        while (i < numW-1) {
            k = i;
            while ((k+1 < numW) && (row[k+1].setNumber == row[k].setNumber)){
                row[k].hasBottomBorder = randomBorder();
                k++;
            }
            i = k+1;
        }
        return row;
    };
 	
 	var printSetValues = function(field) {
        var i;
        var str;
        var j;

		console.log('================================================');
        for (i = 0; i < numH; i++) {
            str = '';
            for (j = 0; j < numW; j++) {
                str = str.concat(field[i][j].setNumber, ' ');
            }
            console.log(str);
        }
        console.log('================================================');
    };

 	return {

 		generate: function(width, height) {
 			var field = [];
	        var i;

	        field[0]=[];
	        numW = width;
	        numH = height;

	        // init first row
	        for (i = 0; i < numW; i++) {
	            field[0][i] = new Cell();
	        }

	        for (i = 0; i < numH; i++) {
	            fillRow(field[i]);
	            initRightBorder(field[i]);
	            initBottomBorder(field[i]);
	            if (i == numH-1) break; // avoid creating additional array element
	            field[i+1] = cloneRow(field[i]);
	            prepareRow(field[i+1]);
	        }

	        // remove borders in last row
	        // belonging different cells
	        for (i = 0; i < numW-1; i++) {
	            if (field[numH-1][i].setNumber != field[numH-1][i+1].setNumber) {
	                field[numH-1][i].hasRightBorder = false;
	            }
	        }
	       // printSetValues(field);
	        return field;
 		}
 	}

})();