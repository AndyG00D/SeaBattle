/* eslint-disable no-multi-assign,prefer-destructuring */
import Node from './node';

export default class Finder {
  constructor(maze) {
    this.maze = maze;
    this.mazeWidth = maze[0].length;
    this.mazeHeight = maze.length;
    this.mazeSize = this.mazeWidth * this.mazeHeight;
    this.end = [this.mazeWidth - 1, this.mazeHeight - 1];
  }

  // Returns next empty fields
  getNextNodes(x, y) {
    const top = y - 1;
    const left = x + 1;
    const bottom = y + 1;
    const right = x - 1;
    const result = [];

    if (top > -1 && this.isEmpty(x, top)) {
      result.push({ x, y: top });
    }
    if (left < this.mazeWidth && this.isEmpty(left, y)) {
      result.push({ x: left, y });
    }
    if (bottom < this.mazeHeight && this.isEmpty(x, bottom)) {
      result.push({ x, y: bottom });
    }
    if (right > -1 && this.isEmpty(right, y)) {
      result.push({ x: right, y });
    }
    return result;
  }

  isEmpty(x, y) {
    return this.maze[x][y] === 0;
  }

  // Path function. AStar algorithm with square function
  find() {
    const startNode = new Node();
    // array contain all Path
    let allPath = new Array(this.mazeSize);
    // stack of currently open Nodes
    let open = [startNode];
    // stack of closed Nodes
    let closed = [];
    // array of the final path
    const path = [];
    // calculated Nodes
    let currentNode;
    let nextNode;

    while (open.length) {
      // Find Node with minimal parameter f
      let max = this.mazeSize;
      let min = -1;
      for (const i in open) {
        if (open[i].f < max) {
          max = open[i].f;
          min = i;
        }
      }
      // remove currentNode from open stack
      currentNode = open.splice(min, 1)[0];

      // if this end node
      if ((currentNode.x === this.end[0]) && (currentNode.y === this.end[1])) {
        nextNode = closed[closed.push(currentNode) - 1];
        do {
          path.push([nextNode.x, nextNode.y]);
        }
        while (nextNode = nextNode.prev);
        allPath = closed = open = [];
        path.reverse();
      } else {
        // find next
        for (const next of this.getNextNodes(currentNode.x, currentNode.y)) {
          nextNode = new Node(currentNode, next);
          if (!allPath[next.x + (next.y * this.mazeWidth)]) {
            open.push(nextNode);
            // mark node as visited
            allPath[next.x + (next.y * this.mazeWidth)] = true;
          }
        }
        closed.push(currentNode);
      }
    }
    if (!path.length) alert('No Path!');

    return path;
  }
}
