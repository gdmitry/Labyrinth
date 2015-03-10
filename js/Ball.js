/**
 * Created by Dima on 04.03.2015.
 */
function Ball() {
	
	var route;
	
	function moveDomObj(left, top)
	{	
	  var domObj = document.getElementById("ball");
	  domObj.style.left = left+"px";
	  domObj.style.top = top+"px";
	}
	
	var timer2 = null;
	var s = 0;
	var d = 20;
	
	function stepBall2(route)
	{
		console.log(route);
		
		  x = route[s][0]*d-d/2+1;
		  y = route[s][1]*d-d/2+2;   
		 // console.log([x,y]);
		  moveDomObj(x, y);
		  s++;	  
		 if (s<route.length)
		  {
			timer2 = setTimeout(stepBall2(route), 3000);
		  }
		  else
		  {
			s = 0;     // so we can do it again
		  }
	  
	}
	
	this.startBall2 = function(route)
	{	document.getElementById('ball').style.visibility = 'visible';
		x = route[s][0]*d-d/2+1;
		y = route[s][1]*d-d/2+2; 
		s++;
		//moveDomObj(x,y);
		timer2 = setTimeout(stepBall2(route), 1000);
	}
	
    return this;
}