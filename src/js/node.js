'use strict';
// Node class, returns a new object with Node properties
// Used in the _findPath function to store route costs, etc.

export default class Node {
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