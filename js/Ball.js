/**
 * Created by Dima on 04.03.2015.
 */
function Ball() {

	var timer2 = null;
	var s = 0;	
	var d = 20;

	function moveDomObj(left, top) {
	  var domObj = document.getElementById("ball");

	  domObj.style.left = left+"px";
	  domObj.style.top = top+"px";
	}	

	function stepBall() {

		if (s == 0) {
			document.getElementById("ball").style.visibility = 'visible';
		}

	  x = path[s][0]*d-d/2;
	  y = path[s][1]*d-d/2;   
		
	  moveDomObj(x, y);
	  s++;
	  if (s<path.length)
	  {
	    timer2 = setTimeout(stepBall, 120);
	  }
	  else
	  {
	    s = 0;     
	  }	  

	}

	this.startBall = function startBall2(path, d) {	
	  
	  timer2 = setTimeout(stepBall, 100);
	}
    return this;
}