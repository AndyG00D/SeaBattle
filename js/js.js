'use strict';

// import Node from './node';

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
// let canvas = null;
// the canvas 2d context
// let ctx = null;
// an image containing all sprites
// let spritesheet = null;
// true when the spritesheet has been downloaded
// let spritesheetLoaded = false;

// the maze grid: a 2d array of tiles
// let maze = [[]];

// size in the maze in sprite tiles


// size of a tile in pixels
// let tileWidth = 50;
// let tileHeight = 50;

// start and end of path
// let pathStart = [mazeWidth, mazeHeight];
// let pathEnd = [0, 0];
let currentCanvas = null;
let currentMaze = null;
let mazeWidth = 10;
let mazeHeight = 10;
// ensure that concole.log doesn't cause errors
// if (typeof console == "undefined") console = {
//     log: function () {
//     }
// };

// the html page is ready
function onload() {
    console.log('Page loaded.');

    currentMaze = new mazeGenerator(mazeWidth, mazeHeight);
    currentCanvas = new canvasMaze(mazeWidth, mazeHeight, 600 , 600 ,'maze-block', fieldClick);
    currentCanvas.drawMaze(currentMaze.maze);
}

function clickClear() {
    let size = document.getElementById("size").value;
    if (size > 9 && size < 151) {
        mazeWidth = mazeHeight = document.getElementById("size").value;
    } else {
        alert('Size of Maze from 10 to 150')
    }

    currentMaze = new mazeGenerator(mazeWidth, mazeHeight);
    currentCanvas = new canvasMaze(mazeWidth, mazeHeight, 600 , 600 ,'maze-block', fieldClick);
    currentCanvas.drawMaze(currentMaze.maze);
    // currentMaze.createEmptyField();
    // currentCanvas.drawMaze(currentMaze.maze);

}


// -------------------------------------------------------------------
// handle click events on the canvas
function clickFind() {
    let finderPath = new Finder(currentMaze.maze);
    currentCanvas.drawMaze(currentMaze.maze);
    currentCanvas.drawPath(finderPath.find());
}

function clickGenerate() {
    currentMaze.createMaze();
    currentCanvas.drawMaze(currentMaze.maze);
}


// -------------------------------------------------------------------
// handle click events on the canvas
function fieldClick(e) {
    let cell = currentCanvas.getPointerPosition(e);
    currentMaze.changeField(...cell);
    currentCanvas.drawMaze(currentMaze.maze);
}


class mazeGenerator {
    constructor(mazeWidth = 10, mazeHeight = 10){
    this.mazeWidth = mazeWidth;
    this.mazeHeight = mazeHeight;
    this.maze = [[]];
    this.createEmptyField();
    }

    createEmptyField() {
        // create emptiness
        for (let x = 0; x < this.mazeWidth; x++) {
            this.maze[x] = [];

            for (let y = 0; y < this.mazeHeight; y++) {
                this.maze[x][y] = 0;
            }
        }
    }


// fill the maze with walls
    createMaze() {
        console.log('Creating maze...');

        this.createEmptyField();

        // scatter some walls
        for (let x = 0; x < this.mazeWidth; x++) {
            for (let y = 0; y < this.mazeHeight; y++) {
                if (Math.random() > 0.75) {
                    this.maze[x][y] = 1;
                } else {
                    this.maze[x][y] = 0;
                }
            }
        }

        this.maze[0][0] = 0;
        this.maze[this.mazeWidth - 1][this.mazeHeight - 1] = 0;
    }

    changeField(x,y){
        if (this.maze[x][y] === 0) {
            this.maze[x][y] = 1;
        } else {
            this.maze[x][y] = 0;
        }
    }
}
class canvasMaze{
    constructor(mazeWidth = 10, mazeHeight = 10, width = 600, height = 600, elem = 'maze-block', event = fieldClick){
        this.tileWidth = width / mazeWidth;
        this.tileHeight = height / mazeHeight;
        this.canvas = document.getElementById(elem);
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.addEventListener("click", event, false);
        if (!this.canvas) alert('Canvas ERROR!');
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) alert('Canvas ERROR!');
    }

drawMaze(maze) {
    console.log('maze: ' + maze);
    for (let x = 0; x < maze[0].length; x++) {
        for (let y = 0; y < maze.length; y++) {

            if (!maze[x][y]) {
                //empty field
                this.ctx.fillStyle = '#ffffff';
                this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
                this.ctx.strokeStyle = '#000000';
                this.ctx.strokeRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
            } else {
                //wall
                this.ctx.fillStyle = '#000000';
                this.ctx.fillRect(x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight);
            }
        }
    }
}

drawPath(currentPath) {
    // draw the path
    console.log('Current path length: ' + currentPath.length);
    console.log('Current path: ' + currentPath);
    for (let rp = 0; rp < currentPath.length; rp++) {
        switch (rp) {
            case 0:
                // start
                this.ctx.fillStyle = '#00ff6e';
                break;
            case currentPath.length - 1:
                // end
                this.ctx.fillStyle = '#d72f2c';
                break;
            default:
                //path node
                this.ctx.fillStyle = '#fff026';
                break;
        }
        this.ctx.fillRect(currentPath[rp][0] * this.tileWidth, currentPath[rp][1] * this.tileHeight, this.tileWidth, this.tileHeight);
        this.ctx.strokeStyle = '#000000';
        this.ctx.strokeRect(currentPath[rp][0] * this.tileWidth, currentPath[rp][1] * this.tileHeight, this.tileWidth, this.tileHeight);
    }
}

redraw(maze, path){

    console.log('redrawing...');

    // clear the screen
    this.ctx.strokeStyle = '#000000';
    this.ctx.strokeRect(0, 0, this.width, this.height);

    this.drawMaze(maze);
    this.drawPath(path);
}

getPointerPosition(e) {

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
    x -= this.canvas.offsetLeft;
    y -= this.canvas.offsetTop;

    // return tile x,y that we clicked
    let cell =
        [
            Math.floor(x / this.tileWidth),
            Math.floor(y / this.tileHeight)
        ];

    // now we know while tile we clicked
    console.log('we clicked tile ' + cell[0] + ',' + cell[1]);

    return cell;
}
}


// -------------------------------------------------------------------
// maze is a 2d array of integers (eg maze[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
class Finder {
    constructor(maze) {
        this.maze = maze;
        this._mazeWidth = maze[0].length;
        this._mazeHeight = maze.length;
        this._mazeSize = this._mazeWidth * this._mazeHeight;
        this._end = [this._mazeWidth - 1, this._mazeHeight - 1];
        // this._start = [0, 0];
    }

    // Returns every available North, South, East or West
    // cell that is empty. No diagonals,
    // unless distanceFunction function is not Manhattan
    _getNextNodes(x, y) {
        let top = y - 1,
            bottom = y + 1,
            left = x + 1,
            right = x - 1,
            result = [];
        //стек top, left, bottom, right
        if (top > -1 && this._isEmpty(x, top))
            result.push({x: x, y: top});
        if (left < this._mazeWidth && this._isEmpty(left, y))
            result.push({x: left, y: y});
        if (bottom < this._mazeHeight && this._isEmpty(x, bottom))
            result.push({x: x, y: bottom});
        if (right > -1 && this._isEmpty(right, y))
            result.push({x: right, y: y});
        return result;
    }


    // returns boolean value (maze cell is available and open)
    _isEmpty(x, y) {
        return this.maze[x][y] === 0;
    };


    // Path function, executes AStar algorithm operations
    find() {
        // create Nodes from the Start and End x,y coordinates
        let startNode = new Node();
        // create an array that will contain all maze cells
        let allPath = new Array(this._mazeSize);
        // list of currently open Nodes
        // Множество вершин(очередь), которые предстоит обработать(раскрыть).
        // Изначально здесь присутствует только начальная вершина start.
        let Open = [startNode];
        // Open.push(startNode);
        // list of closed Nodes
        // Множество вершин, которые уже были обработаны(раскрыты)
        let closed = [];
        // list of the final output array
        let path = [];
        // reference to a Node (that we are considering now)
        let currentNode;
        // reference to a Node (that starts a path in question)
        let nextNode;
        // temp integer variables used in the calculations
        // iterate through the open list until none are left

        while (Open.length) {

            //ищем вершину из open имеющую самую низкую оценку f(x)
            let max = this._mazeSize;
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
            if ((currentNode.x === this._end[0]) && (currentNode.y === this._end[1])) {
                nextNode = closed[closed.push(currentNode) - 1];
                do {
                    path.push([nextNode.x, nextNode.y]);
                }
                while (nextNode = nextNode.prev);
                // clear the working arrays
                allPath = closed = open = [];
                // we want to return start to finish
                path.reverse();
            }
            else // not the destination
            {
                // find which nearby nodes are walkable
                // test each one that hasn't been tried already
                for (let next of this._getNextNodes(currentNode.x, currentNode.y)) {
                    nextNode = new Node(currentNode, next);
                    //if (!allPath[next.x + (next.y * mazeWidth)]) {
                    if (!allPath[next.x + (next.y * this._mazeWidth)]) {
                        Open.push(nextNode);
                        // mark this node in the maze graph as visited
                        allPath[next.x + (next.y * this._mazeWidth)] = true;
                    }
                    // console.log(allPath);
                }
                // remember this allPath as having no more untested options
                closed.push(currentNode);
            }
        } // keep iterating until the Open list is empty
        if (!path.length) alert("No Path!");
        return path;
    }

} // end of Finder() function

class Node {
    constructor(prevNode = null, position = {x: 0, y: 0}) {
        this.x = position.x;
        this.y = position.y;
        // pointer to another Node object
        this.prev = prevNode;
        if (!prevNode) {
            this.h = 0;
            this.g = 0;
            this.f = 0;
        } else {

            // array index of this Node in the maze linear array
            // this.value = position.x + (position.y * mazeWidth);
            // the location coordinates of this Node
            this.h = Math.abs(position.x - prevNode.x) + Math.abs(position.y - prevNode.y);
            // the distanceFunction cost to get
            // from the starting point to this node
            this.g = prevNode.g + this.h;
            // the heuristic estimated cost
            // of an entire path using this node
            this.f = this.g + this.h;
        }
    }
}


// start running immediately
onload();
