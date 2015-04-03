Maze.CanvasView = function (domContainer) {
    "use strict";

    var cellSize = 20;
    var lineThikness = 2;
    var context;

    var renderMaze = function (maze) {
        var i, j;
        var height;
        var width;
        var data;
        var cell;

        data = maze.data;
        height = data.length;
        width = data[0].length;

        document.querySelector("canvas").width = cellSize * width + lineThikness;
        document.querySelector("canvas").height = cellSize * height + lineThikness;
        context.lineWidth = lineThikness;

        for (i = 0; i < height; i++) {
            for (j = 0; j < width; j++) {
                cell = data[i][j];
                if (cell.right) {
                    context.beginPath();
                    context.moveTo(j * cellSize + cellSize + 1, i * cellSize + 1);
                    context.lineTo(j * cellSize + cellSize + 1, i * cellSize + 1 + cellSize);
                    context.stroke();
                }
                if (cell.bottom) {
                    context.beginPath();
                    context.moveTo(j * cellSize + 1, i * cellSize + cellSize + 1);
                    context.lineTo(j * cellSize + cellSize + 1, i * cellSize + cellSize + 1);
                    context.stroke();
                }
                if (j == 0) {
                    context.beginPath();
                    context.moveTo(j * cellSize + 1, i * cellSize + 1);
                    context.lineTo(j * cellSize + 1, i * cellSize + 1 + cellSize);
                    context.stroke();
                }
                if (i == 0) {
                    context.beginPath();
                    context.moveTo(j * cellSize + 1, i * cellSize + 1);
                    context.lineTo(j * cellSize + cellSize + 1, i * cellSize + 1);
                    context.stroke();
                }
            }
        }

    };

    var renderPath = function (path) {
        //console.log(path);
        var i;
        var cells;
        var x;
        var y;
        var cell;
        var maze = path.maze;
        var pathData = path.data;
        var mazeData = maze.data;

        renderMaze(maze);
        context.fillStyle = "#0CF01B";
        context.lineWidth = lineThikness;
        for (i = 0; i < pathData.length; i++) {
            x = pathData[i].x - 1;
            y = pathData[i].y - 1;
            cell = mazeData[y][x];
            context.fillRect(x * cellSize + 2, y * cellSize + 2, cellSize, cellSize);

            if (cell.right) {
                context.beginPath();
                context.moveTo(x * cellSize + cellSize + 1, y * cellSize + 1);
                context.lineTo(x * cellSize + cellSize + 1, y * cellSize + 2 + cellSize);
                context.stroke();
            }
            if (cell.bottom) {
                context.beginPath();
                context.moveTo(x * cellSize + 1, y * cellSize + cellSize + 1);
                context.lineTo(x * cellSize + cellSize + 2, y * cellSize + cellSize + 1);
                context.stroke();
            }
            if (x == 0) {
                context.beginPath();
                context.moveTo(x * cellSize + 1, y * cellSize + 1);
                context.lineTo(x * cellSize + 1, y * cellSize + 1 + cellSize);
                context.stroke();
            }
            if (y == 0) {
                context.beginPath();
                context.moveTo(x * cellSize + 1, y * cellSize + 1);
                context.lineTo(x * cellSize + cellSize + 1, y * cellSize + 1);
                context.stroke();
            }

        }
    };

    var init = function () {
        var domCanvas;

        while (domContainer.firstChild) {
            domContainer.removeChild(domContainer.firstChild);
        }
        domCanvas = document.createElement('canvas');
        domCanvas.id = "board";
        domCanvas.className = "board";
        domCanvas.style.backgroundColor = '#6495ed';
        domContainer.appendChild(domCanvas);
        context = domCanvas.getContext("2d");
        context.strokeStyle = 'black';
    }

    this.render = function (obj) {
        init();
        if (obj instanceof Maze) {
            renderMaze(obj);
        } else {
            if (obj instanceof Maze.Path) {
                renderPath(obj);
            }
        }

    }
}