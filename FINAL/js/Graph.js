var Graph = (function () {
    "use strict";

    var vertexs; // array of cells as vertexs of graph
    var width;
    var height;
    var i;
    var j;

    var countEdges = function (x, y) {
        var cell;
        var top;
        var left;
        var right;
        var bottom;

        cell = vertexs[y - 1][x - 1];
        top = (!cell.top) ? 1 : 0;
        bottom = (!cell.bottom) ? 1 : 0;
        left = (!cell.left) ? 1 : 0;
        right = (!cell.right) ? 1 : 0;
        return (top + bottom + left + right);
    };

    // Removes an edge between two vertexs
    var removeEdge = function (x, y, elem) {
        var x1 = elem.x;
        var y1 = elem.y;
        var current = vertexs[y - 1][x - 1];
        var previous = vertexs[y1 - 1][x1 - 1];

        if (x == x1) {
            if (y > y1) {
                current.top = -1;
                previous.bottom = -1;
            } else {
                current.bottom = -1;
                previous.top = -1;
            }
        }
        if (y == y1) {
            if (x > x1) {
                current.left = -1;
                previous.right = -1;
            } else {
                current.right = -1;
                previous.left = -1;
            }
        }
        return {x: x1, y: y1};
    };

    // Chages current vertex
    var makeMove = function (x, y, index) {
        var direction;
        var currentVertex;

        currentVertex = vertexs[y - 1][x - 1];
        currentVertex.label = index;
        while (true) {
            direction = getRandomInt(1, 4);

            if ((direction === 1) && (currentVertex.top === true)) { // top
                currentVertex.top = false;
                y = y - 1;
                vertexs[y - 1][x - 1].bottom = false;
                break;
            }

            if ((direction === 2) && (currentVertex.right === true)) { // right
                currentVertex.right = false;
                x = x + 1;
                vertexs[y - 1][x - 1].left = false;
                break;
            }

            if ((direction === 3) && (currentVertex.bottom === true)) { // bottom
                currentVertex.bottom = false;
                y = y + 1;
                vertexs[y - 1][x - 1].top = false;
                break;
            }

            if ((direction === 4) && (currentVertex.left === true)) { // left
                currentVertex.left = false;
                x = x - 1;
                vertexs[y - 1][x - 1].right = false;
                break;
            }
        }

        return {x: x, y: y};
    };

    // set default deadlocks for border vertexs of graph
    var initVertexs = function () {
        // set tops	and bottoms deadlocks
        for (j = 0; j < width; j++) {
            vertexs[0][j].top = -1;
            vertexs[height - 1][j].bottom = -1;
        }
        // set tops	and bottoms deadlocks
        for (j = 0; j < height; j++) {
            vertexs[j][0].left = -1;
            vertexs[j][width - 1].right = -1;
        }
    };


    // Returns a path between two points in graph
    var generatePath = function (start, finish) {
        var x = start.x;
        var y = start.y;
        var xx = finish.x;
        var yy = finish.y;
        var path = [];
        var index = 0;
        var currentVertex;
        var flag = true;
        var elem;
        var result;

        while (true) {

            if ((x === xx) && (y === yy)) { // check if finish is reached
                break;
            }

            if ((countEdges(x, y) != 1) && (index != 0)) {	// check for cycle
                elem = path.pop();
                result = removeEdge(x, y, elem);
                x = result.x;
                y = result.y;
                index = vertexs[y - 1][x - 1].label;
            }

            while ((countAllEdges(x, y) == 4) && (path.length != 0)) { //check for deadlock
                vertexs[y - 1][x - 1].label = -3; // mark as no way out
                elem = path.pop();
                result = removeEdge(x, y, elem);
                x = result.x;
                y = result.y;
                index = vertexs[y - 1][x - 1].label;
            }

            if ((path.length == 0) && (flag == false)) {
                break;
            }

            flag = false;

            path.push({x: x, y: y});
            result = makeMove(x, y, index);
            index = index + 1;
            x = result.x;
            y = result.y;
        }
        // add finish point
        currentVertex = vertexs[y - 1][x - 1];
        currentVertex.label = index;
        path.push({x: x, y: y});
        return path;
    };


    // Removes all deadlock in graph
    var resetDeadLocks = function () {
        var elem;

        for (i = 0; i < height; i++) {
            for (j = 0; j < width; j++) {
                elem = vertexs[i][j];
                //elem.label = -1;
                if (elem.top === -1) {
                    elem.top = true;
                }
                if (elem.bottom === -1) {
                    elem.bottom = true;
                }
                if (elem.left === -1) {
                    elem.left = true;
                }
                if (elem.right === -1) {
                    elem.right = true;
                }
            }
        }
    };

    // Counts all available edges including deadlocks
    var countAllEdges = function (x, y) {
        var cell;
        var top;
        var bottom;
        var left;
        var right;

        cell = vertexs[y-1][x-1];
        top = (!cell.top || cell.top === -1) ? 1 : 0;
        bottom = (!cell.bottom || cell.bottom === -1) ? 1 : 0;
        left = (!cell.left || cell.left === -1) ? 1 : 0;
        right = (!cell.right || cell.right === -1) ? 1 : 0;
        return (top + bottom + left + right);
    };

    /**
     * Prints all vertexs from array
     */
    var printVertexs = function () {
        var str;

        console.log("-------------------------------------------------------------------------------------");
        for (i = 0; i < height; i++) {
            str = "";
            for (j = 0; j < width; j++) {
                str = str + vertexs[i][j].label + " ";
            }
            console.log(str);
        }
        console.log("-------------------------------------------------------------------------------------");
    };

    var printEdges = function () {
        var str;

        console.log("-------------------------------------------------------------------------------------");
        for (i = 0; i < height; i++) {
            str = "";
            for (j = 0; j < width; j++) {
                str = str + vertexs[i][j].top + " " + vertexs[i][j].right + " " + vertexs[i][j].bottom + " " + vertexs[i][j].left + "|";
            }
            console.log(str);
        }
        console.log("-------------------------------------------------------------------------------------");
    };


    /**
     * Returns a random integer between min (inclusive) and max (inclusive)
     * Using Math.round() will give you a non-uniform distribution!
     */
    var getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    return {
        // Creates an empty graph
        createGraph: function (options) {
            width = options.width;
            height = options.height;

            vertexs = [];
            // create array of vertexs
            for (i = 0; i < height; i++) {
                vertexs[i] = [];
                for (j = 0; j < width; j++) {
                    vertexs[i][j] = new Maze.Cell();
                }
            }

            initVertexs();
            return vertexs;
        },

        getVertexs: function () {
            return vertexs;
        },

        generatePaths: function (options) {
            var start = options.start;
            var finish = options.finish;
            var possiblePaths = options.possiblePaths;
            var i;
            var paths = [];
            var path;
            var end;
            var result;
            var resultPowPaths;
            var firstPath;

            var getMaxLengthPath = function (start, end, firstPath) {
                var maxLenght;
                var backUpVertices;
                var pathLenght;
                var pathIndexStart;
                var pathIndexEnd;
                var i;
                var path;

                maxLenght = 1;
                while (start < end) {

                    while ((start < end) && (countAllEdges(firstPath[start].x, firstPath[start].y) == 4)) {
                        start = start + 1;
                    }

                    for (i = end; i > start; i = i - 1) {
                        backUpVertices = JSON.parse(JSON.stringify(vertexs));
                        path = generatePath(firstPath[start], firstPath[i]);
                        pathLenght = path.length;
                        if (pathLenght > maxLenght) {
                            maxLenght = pathLenght;
                            pathIndexStart = start;
                            pathIndexEnd = i;
                        }
                        vertexs = backUpVertices;
                    }
                    start = start + 1;
                }
                return {maxLenght: maxLenght, pathIndexStart: pathIndexStart, pathIndexEnd: pathIndexEnd};
            };

            var getPowPaths = function (start, end, firstPath, numberOfPaths) {

                var pathLenght;

                var i;
                var path;
                var pathsCount;
                var failCount;

                failCount = 0;
                pathsCount = 0;

                while ((start < end) && (countAllEdges(firstPath[start].x, firstPath[start].y) == 4)) {
                    start = start + 1;
                }

                for (i = start + 1; i <= end; i = i + 1) {
                    if (pathsCount + 1 > numberOfPaths) {
                        break;
                    }

                    path = generatePath(firstPath[start], firstPath[i]);
                    pathLenght = path.length;
                    resetDeadLocks();
                    initVertexs();

                    // if there is a way

                    if (pathLenght > 1) {
                        pathsCount = pathsCount + 1;
                        paths.push(path);
                        start = i;
                        while ((start < end) && (countAllEdges(firstPath[start].x, firstPath[start].y) == 4)) {
                            start = start + 1;
                        }
                        i = start;
                        failCount = 0;
                    } else {
                        failCount = failCount + 1;
                    }

                    if (failCount > 3) {
                        start = start + 1;
                        while ((start < end) && (countAllEdges(firstPath[start].x, firstPath[start].y) == 4)) {
                            start = start + 1;
                        }
                        i = start;
                        failCount = 0;
                    }
                }
                return {donePaths: Math.pow(2, pathsCount)};
            };

            firstPath = generatePath(start, finish);
            paths.push(firstPath);
            resetDeadLocks();
            initVertexs();

            if ((possiblePaths == 1) || (possiblePaths == 0)) {
                return paths;
            }

            i = 0;
            while (i < possiblePaths) {
                start = 0;
                end = firstPath.length - 1;
                result = getMaxLengthPath(start, end, firstPath);
                if (result.maxLenght == 1) {
                    break;
                }
                // generation of max length path
                path = generatePath(firstPath[result.pathIndexStart], firstPath[result.pathIndexEnd]);
                resetDeadLocks();
                initVertexs();
                i = i + 1;
                if (i < possiblePaths) {
                    resultPowPaths = getPowPaths(result.pathIndexStart, result.pathIndexEnd, firstPath, Math.floor(Math.log2(possiblePaths - i)));
                    i = i + resultPowPaths.donePaths;
                }
                firstPath = path;
                paths.push(path);
            }
            return paths;
        }
    };

})();