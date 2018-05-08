'use strict';

// -------------------------------------------------------------------
// maze is a 2d array of integers (eg maze[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
import Node from "./node";

export default class Finder {
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