'use strict';
/**
 * Created by Dima on 04.03.2015.
 */
function Ball() {    
    var timer = null;
    var s = 0;      
 	var domBall;

	this.init = function(domContainer) {
		domBall = document.createElement('img');
		domBall.id = "ball";
		domBall.className = "ball";
		domBall.src = "images/redBall.gif";
		domContainer.appendChild(domBall);
	}
	
    function stepBall(path) {       
        var  diameter = 20;
        var left;
        var top;

        if (s == 0) {
           domBall.style.visibility = 'visible';
    	}        

    	left = (path[s][0]-1)*diameter; // x
      	top = (path[s][1]-1)*diameter;  // y

      	domBall.style.left = left+"px";
	    domBall.style.top = top+"px";

      	s++;
      	if (s < path.length) {
    		timer = setTimeout(function(){
        		stepBall(path);
          	}, 120);
        } else {
        	s = 0;
        } 
    }

    this.startBall = function (path) {  
	    timer = setTimeout(function(){
	    stepBall(path);
	    }, 100);
    }

	
    return this;
}