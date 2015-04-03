// http://designformasters.info/posts/objectifying-javascript/
// http://www.cyberguru.ru/web/html/javascript-introduction-to-objective-js-page2.html
"use strict";

var Maze = function (options) {
    Object.defineProperty(this, "data", {
        value: options.data,
        writable: false
    });
};

Maze.prototype.getPaths = function (start, finish) {

    var findAllPaths = function (x, y, path) {
        var cell;

        if (searchSubArray(path, [x, y]) > 0) {
            return;
        }
        path.push([x, y]);
        if ((x === finish.x) && (y === finish.y)) {
            allPaths.push(path);
            return;
        }

        cell = data[y - 1][x - 1];
        // top
        if (!cell.top) {
            findAllPaths(x, y - 1, path.slice());
        }
        // right
        if (!cell.right) {
            findAllPaths(x + 1, y, path.slice());
        }
        // bottom
        if (!cell.bottom) {
            findAllPaths(x, y + 1, path.slice());
        }
        // left
        if (!cell.left) {
            findAllPaths(x - 1, y, path.slice());
        }
    };

    var searchSubArray = function (array, target) {
        var i;
        var result = -1;
        var len = array.length;
        target = target.toString();

        for (i = 0; i < len; i++) {
            if (target === array[i].toString()) {
                result = i;
                break;
            }
        }
        return result + 1;
    };

    var data = this.data;
    var allPaths = [];
    var x = start.x;
    var y = start.y;
    var i;
    var j;
    var maze = this;
    var paths;
    var path;
    var pathData;

    findAllPaths(x, y, []);

    pathData = [];
    for (i = 0; i < allPaths.length; i++) {
        path = allPaths[i];
        paths = [];
        for (j = 0; j < path.length; j++) {
            paths[j] = {x: path[j][0], y: path[j][1]};
        }
        pathData.push(new Maze.Path({data: paths, maze: maze}));
    }
    return pathData;
};

Maze.generate = function (options) {
    var MAX_PATHS = 10;
    var width = options.width;
    var height = options.height;
    var possiblePaths = (options.possiblePaths + 1) || Math.floor(Math.random() * (MAX_PATHS + 1)) + 1;
    possiblePaths = possiblePaths - 1;
    var start = options.start || {x: Math.floor(Math.random() * width) + 1, y: Math.floor(Math.random() * height) + 1};
    var finish = options.finish || {x: Math.floor(Math.random() * width) + 1, y: Math.floor(Math.random() * height) + 1};
    var paths;
    var i, j;
    console.log("-------------------------------------------------------------------------------------");
    console.log("W= " + width + " H= " + height);
    console.log("Start= " + start.x + " " + start.y + " finish= " + finish.x + " " + finish.y);
    console.log("Possible paths " + possiblePaths);
    console.log("-------------------------------------------------------------------------------------");

    var countBorders = function (cell) {
        var top = cell.top ? 1 : 0;
        var bottom = cell.bottom ? 1 : 0;
        var left = cell.left ? 1 : 0;
        var right = cell.right ? 1 : 0;
        return (top + bottom + left + right);
    };

    // all cells have at least one path
    var digTunnels = function (options) {
        var x = options.x;
        var y = options.y;
        var currentVertex = vertexes[x - 1][y - 1];
        var nextVertex;

        if ((currentVertex.top === true)) {
            nextVertex = vertexes[x - 2][y - 1];
            if (countBorders(nextVertex) == 4) {
                currentVertex.top = false;
                nextVertex.bottom = false;
                digTunnels({x: x - 1, y: y});
            }
        }
        if ((currentVertex.bottom === true)) {
            nextVertex = vertexes[x][y - 1];
            if (countBorders(nextVertex) == 4) {
                currentVertex.bottom = false;
                nextVertex.top = false;
                digTunnels({x: x + 1, y: y});
            }
        }
        if ((currentVertex.left === true)) {
            nextVertex = vertexes[x - 1][y - 2];
            if (countBorders(nextVertex) == 4) {
                currentVertex.left = false;
                nextVertex.right = false;
                digTunnels({x: x, y: y - 1});
            }
        }
        if ((currentVertex.right === true)) {
            nextVertex = vertexes[x - 1][y];
            if (countBorders(nextVertex) == 4) {
                currentVertex.right = false;
                nextVertex.left = false;
                digTunnels({x: x, y: y + 1});
            }
        }
    };

    var blockCell = function (x, y) {
        var rightCell;
        var leftCell;
        var topCell;
        var bottomCell;
        var cell;

        cell = vertexes[y - 1][x - 1];
        if (!cell.top) {
            cell.top = true;
            topCell = vertexes[y - 2][x - 1];
            topCell.bottom = true;
        }
        if (!cell.right) {
            cell.right = true;
            rightCell = vertexes[y - 1][x];
            rightCell.left = true;
        }
        if (!cell.bottom) {
            cell.bottom = true;
            bottomCell = vertexes[y][x - 1];
            bottomCell.top = true;
        }
        if (!cell.left) {
            cell.left = true;
            leftCell = vertexes[y - 1][x - 2];
            leftCell.right = true;
        }

    };

    Graph.createGraph({width: width, height: height});
    paths = Graph.generatePaths({start: start, finish: finish, possiblePaths: possiblePaths});

    var vertexes = Graph.getVertexs();
    var path;
    var len;
    var elem;

    for (j = 0; j < paths.length; j++) {
        path = paths[j];
        len = path.length;
        for (i = 0; i < len; i++) {
            elem = path[i];
            digTunnels({x: elem.y, y: elem.x});
        }
    }

    if (possiblePaths == 0) {
        Math.random() > 0.5 ? blockCell(start.x, start.y) : blockCell(finish.x, finish.y);
    }

    var maze = new Maze({data: vertexes});
    return maze;
};