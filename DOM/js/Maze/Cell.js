/**
 * true - border present
 * false - no border     *
 */

Maze.Cell = function () {
    /*this.top = false;
     this.left = false;
     this.right = false;
     this.bottom = false;*/

    this.top = true;
    this.left = true;
    this.right = true;
    this.bottom = true;
    this.label = -1;
};