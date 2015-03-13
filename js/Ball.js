"use strict";
/**
 * Created by Dima on 04.03.2015.
 */
function Ball(d) {
    
    this.diameter = d || 20;
    var self = this;
    var timer = null;
    var s = 0;      
 	  var domBall = document.getElementById("ball");

    function stepBall(path) {       
      var  diameter = self.diameter;
      var left;
      var top;

      if (s == 0) {
           domBall.style.visibility = 'visible';
    	}        

    	left = path[s][0]*diameter-diameter/2; // x
      top = path[s][1]*diameter-diameter/2;  // y

      domBall.style.left = left+"px";
	    domBall.style.top = top+"px";

      s++;
      if (s<path.length) {
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