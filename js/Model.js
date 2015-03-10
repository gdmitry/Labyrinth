/**
 * Created by Dima on 03.03.2015.
 */
function LabyrinthModel(w, h) {

    var d = 20; //size of cell
    var numH = h/d;
    var numW = w/d;

    this.run = function () {
        var field = [];
        var i;

        field[0]=[];

        // init first row
        for (i = 0; i < numW; i++) {
            field[0][i] = new Cell(-1);
        }

        for (i = 0; i < numH; i++) {
            fillRow(field[i]);
            initRightBorder(field[i]);
            initBottomBorder(field[i]);
            if (i == numH-1) break; // avoid creating additional array element
            field[i+1] = copyArray(field[i]);
            prepareRow(field[i+1]);
        }

        // remove borders in last row
        // belonging different cells
        for (i = 0; i < numW-1; i++) {
            if (field[numH-1][i].getSetNumber() != field[numH-1][i+1].getSetNumber()) {
                field[numH-1][i].setRightBorder('no');
            }
        }
        return field;
    }

    // set border or not
    var randomBorder = function() {
        var num =  Math.floor(Math.random() * 100) + 1;
        if (num % 2 == 0) return 'yes';
        return 'no';
    }

    // sets init setNumber
    var fillRow = function(row) {
        var setNumber = 1;
        var i;
        
        for (i = 0; i < numW; i++) {
            if (row[i].getSetNumber() == -1) {
                while (checkUnique(row, setNumber) != true) {
                    setNumber++;
                }
                row[i].setSetNumber(setNumber);
            } else {
                setNumber = row[i].getSetNumber();
            }
        }
        return row;
    }

    // check for unique setNumber in row
    // !TO DO: rewrite using every
    var checkUnique = function(row, setNumber) {
        var i;

        for (i = 0; i < numW; i++) {
            if (row[i].getSetNumber() == setNumber) {
                return false;
            }
        }
        return true;
    }

    // sets right border
    var initRightBorder = function(row) {
        var i;

        for (i = 0; i < numW-1; i++) {
            if (randomBorder() == 'no') {
                row[i+1].setSetNumber(row[i].getSetNumber());
            } else {
                // if they are already in one set
                // should not add border
               // if(row[i+1].getSetNumber() != row[i].getSetNumber())
                    row[i].setRightBorder('yes');
            }

        }
        return row;
    }

    // sets bottom border
    var initBottomBorder = function(row) {
        var i = 0;
        var k;

        while (i < numW-1) {
            k = i;
            while ((k+1 < numW) && (row[k+1].getSetNumber() == row[k].getSetNumber())){
                row[k].setBottomBorder(randomBorder());
                k++;
            }
            i = k+1;
        }
        return row;
    }

    // sets right border
    var prepareRow = function(row) {
        var i;

        for (i = 0; i < numW; i++) {
             row[i].setRightBorder('no');
             if (row[i].getBottomBorder() == 'yes'){
                 row[i].setSetNumber(-1);
                 row[i].setBottomBorder('no');
             }
        }

        return row;
    }

    // clones an array of Cell objects
    var copyArray = function(array) {
        var outArray = [];
        var i;
        var len = array.length;

        for (i = 0; i < len; i++) {
            outArray[i] = array[i].cloneCell();
        }

        return outArray;
    }

    // prints an row
    var outRow = function(row) {
        var str = '';
        var i;

        for (i = 0; i < numW; i++) {
            str = str.concat(row[i].getSetNumber(), ' ');
        }
        console.log(str);
    }

    // generate input and output
    this.getInOut = function () {
        var x1, x2;
        var y1, y2;

        if (randomBorder() == 'yes') {
           x1 = Math.floor(Math.random() * numW) + 1;
           x2 = Math.floor(Math.random() * numW) + 1;
           return [[x1,1], [x2, numH]];
        } else {
            y1 = Math.floor(Math.random() * numH) + 1;
            y2 = Math.floor(Math.random() * numH) + 1;
            return [[1,y1], [numW, y2]];
        }
    }

    // find path in maze
    this.getPath = function (field, start, end) {
        var d = 0;
        var wave = [start];
		var i;
        var k;
        var temp;
        var wavelen;

        do {
            temp = [];
            k = 0;
            wavelen = wave.length;

            for (i = 0; i < wavelen; i++) {
                x = wave[i][0];
                y = wave[i][1];


                if (field[y-1][x-1].getLabel() > -1)
                    continue;

                field[y-1][x-1].setLabel(d);

                if (y>1) { // top
                    if (field[y-2][x-1].getBottomBorder() == 'no') {
                        temp[k] = [x, y-1];
                        k++;
                    }
                }

                if (x<numW) { // right
                    if (field[y-1][x-1].getRightBorder() == 'no') {
                        temp[k] = [x+1, y];
                        k++;
                    }
                }

                if (y<numH) { // bottom
                    if (field[y-1][x-1].getBottomBorder() == 'no') {
                        temp[k] = [x, y+1];
                        k++;
                    }
                }

                if (x>1) { // left
                    if (field[y-1][x-2].getRightBorder() == 'no') {
                        temp[k] = [x-1, y];
                        k++;
                    }
                }
            }
           // console.log('teemp================================================');

            wave = [];
            for (var i = 0; i < temp.length; i++){
               wave[i] = temp[i].slice();               
            }
           // console.log('================================================');
            d++;
       } while (field[end[1]-1][end[0]-1].getLabel() < 0);// if the end is marked	
       
        printPathValues(field);
		//findPathValues(field, end);
		return field;
    }

	// prints label' values from field matrix
    var printPathValues = function(field) {
        var i;
        var str;
        var j;

		console.log('================================================');
        for (i = 0; i < numH; i++) {
            str = '';
            for (j = 0; j < numW; j++) {
                str = str.concat(field[i][j].getLabel(), ' ');
            }
            console.log(str);
        }
        console.log('================================================');
    }
	
	// end - koordinates of end point
	this.findPathValues = function(field, end) {
		var path_array = [];
		var current = end;
        var k = 0;
        var x;
        var y;
        var top, right, bottom, left;
		var temp;
        var i;
        var min;

        do {
            path_array[k] = current;
			x = current[0];
			y = current[1];			
			top = 10000;
            right = 10000;
            bottom = 10000;
            left = 10000;
			temp = []; // temporary array for searching min
			i = 0;				
			
			///////////////////////////////////////////////////////////////////////////////////////////////
				if (y>1) { // top
                    if (field[y-2][x-1].getBottomBorder() == 'no') {
                        top = field[y-2][x-1].getLabel();
						if (top !=-1){
							temp[i] = top; i++;
						}
                    }
                }

                if (x<numW) { // right
                    if (field[y-1][x-1].getRightBorder() == 'no') {
                        right = field[y-1][x].getLabel();
						if (right !=-1){
							temp[i] = right; i++;
						}
                    }
                }

                if (y<numH) { // bottom
                    if (field[y-1][x-1].getBottomBorder() == 'no') {
                        bottom = field[y][x-1].getLabel();
						if (bottom !=-1){
							temp[i] = bottom; i++;
						}
                    }
                }

                if (x>1) { // left
                    if (field[y-1][x-2].getRightBorder() == 'no') {
                        left = field[y-1][x-2].getLabel();
						if (left !=-1){
							temp[i] = left; i++;
						}
                    }
                }
			//////////////////////////////////////////////////////////////////////////////////////////
			min = Math.min.apply(Math, temp);
			if (top == min) {
				current = [x, y-1];
			} else
			if (left == min) {
				current = [x-1, y];
			} else
			if (bottom == min) {
				current = [x, y+1];
			} else
			if (right == min) {
				current = [x+1, y];
			}			
			k++;
       } while (field[current[1]-1][current[0]-1].getLabel() != 0);// if the start is marked
		path_array[k] = current; // adds start cell to path_array
		return path_array;
    }
	

    return this;

}
