'use strict';

import Node from "./node";

export default class Finder {
    constructor(maze) {
        this.maze = maze;
        this._mazeWidth = maze[0].length;
        this._mazeHeight = maze.length;
        this._mazeSize = this._mazeWidth * this._mazeHeight;
        this._end = [this._mazeWidth - 1, this._mazeHeight - 1];
    }

    // Returns next empty fields
    _getNextNodes(x, y) {
        let top = y - 1,
            bottom = y + 1,
            left = x + 1,
            right = x - 1,
            result = [];
        // top, left, bottom, right
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

    _isEmpty(x, y) {
        return this.maze[x][y] === 0;
    };

    // Path function. AStar algorithm with square function
    find() {

        let startNode = new Node();
        // array contain all Path
        let allPath = new Array(this._mazeSize);
        // stack of currently open Nodes
        let Open = [startNode];
        // stack of closed Nodes
        let closed = [];
        // array of the final path
        let path = [];
        // calculated Nodes
        let currentNode;
        let nextNode;

        while (Open.length) {
            //Find Node with minimal parameter f
            let max = this._mazeSize;
            let min = -1;
            for (let i in Open) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }
            // remove currentNode from Open stack
            currentNode = Open.splice(min, 1)[0];

            // if this end node
            if ((currentNode.x === this._end[0]) && (currentNode.y === this._end[1])) {
                nextNode = closed[closed.push(currentNode) - 1];
                do {
                    path.push([nextNode.x, nextNode.y]);
                }
                while (nextNode = nextNode.prev);
                allPath = closed = open = [];
                path.reverse();
            }
            else {
                // find next
                for (let next of this._getNextNodes(currentNode.x, currentNode.y)) {
                    nextNode = new Node(currentNode, next);
                    if (!allPath[next.x + (next.y * this._mazeWidth)]) {
                        Open.push(nextNode);
                        // mark node as visited
                        allPath[next.x + (next.y * this._mazeWidth)] = true;
                    }
                }
                closed.push(currentNode);
            }
        }
        if (!path.length) alert("No Path!");
        return path;
    }
}