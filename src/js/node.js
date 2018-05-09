// Node class, returns a new object with Node properties

export default class Node {
  constructor(prevNode = null, position = { x: 0, y: 0 }) {
    this.x = position.x;
    this.y = position.y;
    this.prev = prevNode; // pointer to another Node object
    if (!prevNode) {
      this.h = 0;
      this.g = 0;
      this.f = 0;
    } else {
      this.h = Math.abs(position.x - prevNode.x) + Math.abs(position.y - prevNode.y);
      this.g = prevNode.g + this.h;
      this.f = this.g + this.h;
    }
  }
}
