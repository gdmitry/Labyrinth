/**
 * Created by Dima on 03.03.2015.
 */
function LabyrinthView(w, h) {

    var w = w;
    var h = h;
    var lineColor = 'black';
    var backgroundColor = 'red';
    var d = 20; //size of cell

    this.init = function (context) {
        this.context = context;
        this.context.fillStyle = backgroundColor;
        this.context.strokeStyle = lineColor;
        this.context.fillRect(0, 0, w, h);
    }

    this.getDrawField = function (firstrow) {
        var numH = h/d;
        var numW = w/d;
        var i;
        var j;

        for (j = 0; j < numH; j++) {
            for (i = 0; i < numW; i++) {
                if (firstrow[j][i].getRightBorder() == 'yes') {
                    context.beginPath();
                    context.moveTo(i*d+d, j*d+1);
                    context.lineTo(i*d+d,j*d+1+d);
                    context.stroke();
                }

                if (firstrow[j][i].getBottomBorder() == 'yes') {
                    context.beginPath();
                    context.moveTo(i*d, j*d+d);
                    context.lineTo(i*d+d,j*d+d);
                    context.stroke();
                }
				// draw set numbers
				//context.fillStyle = "black";
				// context.fillText(firstrow[j][i].getSetNumber(),i*d+d/2-3,j*d+d/2+5);
				//context.fillText(firstrow[j][i].getLabel(),i*d+d/2-3,j*d+d/2+5);   // prints the label
            }
        }

    }

    this.drawBorders = function () {
        context.lineWidth=2;
        context.beginPath();
        context.moveTo(0+1,0+1);
        context.lineTo(w,0+1);
        context.moveTo(w,0+1);
        context.lineTo(w,h);
        context.moveTo(w,h);
        context.lineTo(0+1,h);
        context.moveTo(0+1,h);
        context.lineTo(0+1,0);
        context.stroke();
    }

    this.drawInOut = function (o) {
        context.lineWidth=2;
        context.fillStyle = "yellow";
        context.beginPath();
        context.fillText('in',o[0][0]*d - d/2 - 4,o[0][1]*d - d/2+3);
        context.fillText('out',o[1][0]*d - d/2 - 7,o[1][1]*d - d/2+3);
        context.stroke();
    }
	
	 this.drawRoute = function (route) {
        var i;

		console.log(route);
		context.lineWidth=2;
        context.strokeStyle = 'white';
        context.beginPath();
		 context.moveTo(route[0][0]*d-d/2+1,route[0][1]*d-d/2+2);
		for (i = 1; i < route.length; i++) {
			context.lineTo(route[i][0]*d-d/2+1,route[i][1]*d-d/2+2);
		}
		context.stroke();
	 }
    return this;
}
