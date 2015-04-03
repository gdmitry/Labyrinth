/**
 * true - border present
 * false - no border
 * -1 - dead border
 */

Maze.Cell = function () {
    this.top = true;
    this.left = true;
    this.right = true;
    this.bottom = true;
    this.label = -1;
};