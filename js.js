'use strict';

// A* Pathfinding for HTML5 Canvas Tutorial
// by Christer (McFunkypants) Kaitila
// http://www.mcfunkypants.com
// http://twitter.com/McFunkypants

// Based on Edsger Dijkstra's 1959 algorithm and work by:
// Andrea Giammarchi, Alessandro Crugnola, Jeroen Beckers,
// Peter Hart, Nils Nilsson, Bertram Raphael

// Permission is granted to use this source in any
// way you like, commercial or otherwise. Enjoy!

// the game's canvas element
let canvas = null;
// the canvas 2d context
let ctx = null;
// an image containing all sprites
// let spritesheet = null;
// true when the spritesheet has been downloaded
// let spritesheetLoaded = false;

// the maze grid: a 2d array of tiles
let maze = [[]];

// size in the maze in sprite tiles
let mazeWidth = 10;
let mazeHeight = 10;

// size of a tile in pixels
let tileWidth = 32;
let tileHeight = 32;

// start and end of path
let pathStart = [mazeWidth, mazeHeight];
let pathEnd = [0, 0];
let currentPath = [];

// ensure that concole.log doesn't cause errors
// if (typeof console == "undefined") console = {
//     log: function () {
//     }
// };

// the html page is ready
function onload() {
    console.log('Page loaded.');
    canvas = document.getElementById('gameCanvas');
    canvas.width = mazeWidth * tileWidth;
    canvas.height = mazeHeight * tileHeight;
    // canvas.addEventListener("click", canvasClick, false);
    canvas.addEventListener("click", fieldClick, false);
    if (!canvas) alert('Blah!');
    ctx = canvas.getContext("2d");
    if (!ctx) alert('Hmm!');

    createMaze();
}


// fill the maze with walls
function createMaze() {
    console.log('Creating maze...');

    // create emptiness
    for (let x = 0; x < mazeWidth; x++) {
        maze[x] = [];

        for (let y = 0; y < mazeHeight; y++) {
            maze[x][y] = 0;
        }
    }
    // maze.fill( [].fill(0,0, mazeHeight), 0, mazeWidth);


    // scatter some walls
    for (let x = 0; x < mazeWidth; x++) {
        for (let y = 0; y < mazeHeight; y++) {
            if (Math.random() > 0.75)
                maze[x][y] = 1;
        }
    }

    maze[0][0] = 0;
    maze[mazeWidth - 1][mazeHeight - 1] = 0;

    // calculate initial possible path
    // note: unlikely but possible to never find one...
    currentPath = [];

    // while (currentPath.length == 0) {
    //     // pathStart = [Math.floor(Math.random() * mazeWidth), Math.floor(Math.random() * mazeHeight)];
    //     // pathEnd = [Math.floor(Math.random() * mazeWidth), Math.floor(Math.random() * mazeHeight)];
    //     // pathStart = [0, 0];
    //     // pathEnd = [mazeWidth, mazeHeight];
    //     if (maze[pathStart[0]][pathStart[1]] == 0)
    //         currentPath = findPath(maze, pathStart, pathEnd);
    // }
    pathStart = [0, 0];
    pathEnd = [mazeWidth - 1, mazeHeight - 1];
    currentPath = findPath(maze, pathStart, pathEnd);
    redraw();

}

function redraw() {

    console.log('redrawing...');

    // clear the screen
    ctx.strokeStyle = '#000000';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    //draw maze
    console.log('maze: ' + maze);
    for (let x = 0; x < mazeWidth; x++) {
        for (let y = 0; y < mazeHeight; y++) {

            // choose a figure to draw
            switch (maze[x][y]) {
                case 1:
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                    break;
                default:
                    ctx.fillStyle = '#ffffff';
                    ctx.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                    ctx.strokeStyle = '#000000';
                    ctx.strokeRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                    break;
            }
        }
    }

    // draw the path
    console.log('Current path length: ' + currentPath.length);
    console.log('Current path: ' + currentPath);
    for (let rp = 0; rp < currentPath.length; rp++) {
        switch (rp) {
            case 0:
                // spriteNum = 2; // start
                ctx.fillStyle = '#00ff6e';
                break;
            case currentPath.length - 1:
                // spriteNum = 3; // end
                ctx.fillStyle = '#d72f2c';
                break;
            default:
                // spriteNum = 4; // path node
                ctx.fillStyle = '#fff026';
                break;
        }
        ctx.fillRect(currentPath[rp][0] * tileWidth, currentPath[rp][1] * tileHeight, tileWidth, tileHeight);
        ctx.strokeStyle = '#000000';
        ctx.strokeRect(currentPath[rp][0] * tileWidth, currentPath[rp][1] * tileHeight, tileWidth, tileHeight);
    }
}


// -------------------------------------------------------------------
// handle click events on the canvas
function fieldClick(e) {
    let x;
    let y;

    // grab html page coords
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    // make them relative to the canvas only
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    // return tile x,y that we clicked
    let cell =
        [
            Math.floor(x / tileWidth),
            Math.floor(y / tileHeight)
        ];

    // now we know while tile we clicked
    console.log('we clicked tile ' + cell[0] + ',' + cell[1]);

    if (maze[cell[0]][cell[1]] === 0) {
        maze[cell[0]][cell[1]] = 1;
    } else {
        maze[cell[0]][cell[1]] = 0;
    }

    // calculate path
    currentPath = findPath(maze, pathStart, pathEnd);
    redraw();

}

// -------------------------------------------------------------------
// handle click events on the canvas
function canvasClick(e) {
    var x;
    var y;

    // grab html page coords
    if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }

    // make them relative to the canvas only
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;

    // return tile x,y that we clicked
    var cell =
        [
            Math.floor(x / tileWidth),
            Math.floor(y / tileHeight)
        ];

    // now we know while tile we clicked
    console.log('we clicked tile ' + cell[0] + ',' + cell[1]);

    pathStart = pathEnd;
    pathEnd = cell;

    // calculate path
    currentPath = findPath(maze, pathStart, pathEnd);
    redraw();
}

// -------------------------------------------------------------------
// maze is a 2d array of integers (eg maze[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(maze, pathStart, pathEnd) {
    // shortcuts for speed
    // let abs = Math.abs;
    // let max = Math.max;
    // let pow = Math.pow;
    // let sqrt = Math.sqrt;


    // keep track of the maze dimensions
    // Note that this A-star implementation expects the maze array to be square:
    // it must have equal height and width. If your game maze is rectangular,
    // just fill the array with dummy values to pad the empty space.
    let mazeWidth = maze[0].length;
    let mazeHeight = maze.length;
    let mazeSize = mazeWidth * mazeHeight;

    // which heuristic should we use?
    // default: no diagonals (Manhattan)
    let distanceFunction = ManhattanDistance;


    // distanceFunction functions
    // these return how far away a point is to another

    function ManhattanDistance(Point, Goal) {	// linear movement - no diagonals - just cardinal directions (NSEW)
        return Math.abs(Point.x - Goal.x) + Math.abs(Point.y - Goal.y);
        // return 0;
    }


    // Returns every available North, South, East or West
    // cell that is empty. No diagonals,
    // unless distanceFunction function is not Manhattan
    function nextFields(x, y) {
        let top = y - 1,
            bottom = y + 1,
            left = x + 1,
            right = x - 1,
            result = [];
        //стек top, left, bottom, right
        if (top > -1 && isEmpty(x, top))
            result.push({x: x, y: top});
        if (left < mazeWidth && isEmpty(left, y))
            result.push({x: left, y: y});
        if (bottom < mazeHeight && isEmpty(x, bottom))
            result.push({x: x, y: bottom});
        if (right > -1 && isEmpty(right, y))
            result.push({x: right, y: y});
        return result;
    }


    // returns boolean value (maze cell is available and open)
    function isEmpty(x, y) {
        // return ((maze[x] != null) &&
        //     (maze[x][y] != null)
        //      && (maze[x][y] <= 0));
        return maze[x][y] == 0;
    };

    // Node function, returns a new object with Node properties
    // Used in the calculatePath function to store route costs, etc.
    function Node(prevNode, Point) {
        let newNode = {
            // pointer to another Node object
            prev: prevNode,
            // array index of this Node in the maze linear array
            value: Point.x + (Point.y * mazeWidth),
            // the location coordinates of this Node
            x: Point.x,
            y: Point.y,
            // the heuristic estimated cost
            // of an entire path using this node
            // h: distanceFunction(prevNode, Point);
            f: 0,
            // the distanceFunction cost to get
            // from the starting point to this node
            g: 0
        };

        return newNode;
    }

    // Path function, executes AStar algorithm operations
    function calculatePath() {
        // create Nodes from the Start and End x,y coordinates
        let startNode = Node(null, {x: pathStart[0], y: pathStart[1]});
        let endNode = Node(null, {x: pathEnd[0], y: pathEnd[1]});
        // create an array that will contain all maze cells
        let AStar = new Array(mazeSize);
        console.log("Astar:" + AStar);
        // list of currently open Nodes
        // Множество вершин(очередь), которые предстоит обработать(раскрыть).
        // Изначально здесь присутствует только начальная вершина start.
        let Open = [];
        Open.push(startNode);
        // list of closed Nodes
        // Множество вершин, которые уже были обработаны(раскрыты)
        let Closed = [];
        // list of the final output array
        let result = [];
         // reference to a Node (that we are considering now)
        let currentNode;
        // reference to a Node (that starts a path in question)
        let nextNode;
        // temp integer variables used in the calculations
        // iterate through the open list until none are left

        while (Open.length) {

            //ищем вершину из open имеющую самую низкую оценку f(x)
            let max = mazeSize;
            let min = -1;
            for (let i in Open) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // grab the next node and remove it from Open array
            // Вершина x пошла на обработку, а значит её следует удалить из очереди на обработку
            currentNode = Open.splice(min, 1)[0];
            // is it the destination node?
            if ((currentNode.x === endNode.x) && (currentNode.y === endNode.y)) {
                nextNode = Closed[Closed.push(currentNode) - 1];
                do {
                    result.push([nextNode.x, nextNode.y]);
                }
                while (nextNode = nextNode.prev);
                // clear the working arrays
                AStar = Closed = Open = [];
                // we want to return start to finish
                result.reverse();
            }
            else // not the destination
            {
                // find which nearby nodes are walkable
                // test each one that hasn't been tried already
                for (let next of nextFields(currentNode.x, currentNode.y)) {
                    nextNode = Node(currentNode, next);
                    if (!AStar[nextNode.value]) {
                        console.log("Astar:" + AStar);
                        // estimated cost of this particular route so far
                        nextNode.g = currentNode.g + distanceFunction(currentNode, next);
                        // estimated cost of entire guessed route to the destination
                        nextNode.f = nextNode.g + distanceFunction(currentNode, next);
                        // remember this new path for testing above
                        Open.push(nextNode);
                        // mark this node in the maze graph as visited
                        AStar[nextNode.value] = true;
                    }
                }
                // remember this route as having no more untested options
                Closed.push(currentNode);
            }
        } // keep iterating until the Open list is empty
        return result;
    }

    // actually calculate the a-star path!
    // this returns an array of coordinates
    // that is empty if no path is possible
    return calculatePath();

} // end of findPath() function

// start running immediately
onload();
