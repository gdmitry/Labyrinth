/**
 * Created by Dima on 04.03.2015.
 */
Maze.Ball = function (domContainer) {
    'use strict';

    var timer = null;
    var domBall;
    var diameter = 20;

    var init = function () {
        domBall = document.createElement('img');
        domBall.id = "ball";
        domBall.className = "ball";
        domBall.src = "images/redBall.gif";
        domContainer.appendChild(domBall);
    }

    var stepBall = function (path, index) {
        var left;
        var top;
        var pathCell;

        if (index == 0) {
            domBall.style.visibility = 'visible';
        }

        pathCell = path[index];
        left = (pathCell.x - 1) * diameter; // x
        top = (pathCell.y - 1) * diameter;  // y

        domBall.style.left = left + "px";
        domBall.style.top = top + "px";


        if (index < path.length - 1) {
            timer = setTimeout(function () {
                stepBall(path, index + 1);
            }, 120);
        }
    }

    this.startBall = function (path) {
        init();
        var data = path.data;

        timer = setTimeout(function () {
            stepBall(data, 0);
        }, 100);
    }

    return this;
}