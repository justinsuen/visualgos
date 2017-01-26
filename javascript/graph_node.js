class GraphNode {
  constructor(x, y, weight) {
    this.x = x;
    this.y = y;
    this.pos = {x: this.x, y: this.y};
    this.weight = weight;

    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.visited = false;
    this.closed = false;
    this.parent = null;
  }
}

export default GraphNode;
