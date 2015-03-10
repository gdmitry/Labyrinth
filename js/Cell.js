/**
 * Created by Dima on 03.03.2015.
 */
function Cell(value) {

    var rightBorder = 'no';
    var bottomBorder = 'no';
    var setNumber = value;
    var label = -1;

    this.setRightBorder = function(value) {
        rightBorder = value;
    }

    this.setBottomBorder = function(value) {
        bottomBorder = value;
    }

    this.getBottomBorder = function() {
        return bottomBorder;
    }

    this.getRightBorder = function() {
        return rightBorder;
    }

    this.setSetNumber = function(value) {
        setNumber = value;
    }

    this.getSetNumber = function() {
        return setNumber;
    }

    this.cloneCell = function() {
        var c;
        c = new Cell(this.getSetNumber());
        c.setBottomBorder(this.getBottomBorder());
        c.setRightBorder(this.getRightBorder());
        return c;
    }

    this.getLabel = function() {
        return label;
    }

    this.setLabel = function(value) {
        label = value;
    }

    return this;
}