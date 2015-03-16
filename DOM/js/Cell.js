 "use strict"; 
/**
 * Created by Dima on 03.03.2015.
 */
function Cell() {

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
}