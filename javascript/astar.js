// Implemented with the pseudocode from https://en.wikipedia.org/wiki/A*_search_algorithm
// A* selects a path that minimizes f(n) = g(n) + h(n) where
//   g(n) is the cost of the path from the start node to n
//   h(n) is a heuristic that estimates the cost of the cheapest
//   path from n to the goal

class AStar {
  constructor(graph, start, end) {
    this.start = start;
    this.end = end;
    this.graph = graph;

    for (let x = 0; x < this.graph.length; x++) {
      for (let y = 0; y < this.graph[x].length; y++) {
        this.graph[x][y].f = 0;
        this.graph[x][y].g = 0;
        this.graph[x][y].h = 0;
        this.graph[x][y].parent = null;
      }
    }
  }

  search() {
    const openSet = [];
    const closedSet = [];
    openSet.push(this.start);

    while (openSet.length > 0) {
      let lowestInd = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestInd].f)
          lowestInd = i;
      }

      let currNode = openSet[lowestInd];
      if (currNode.x === this.end.x && currNode.y === this.end.y) {
        let curr = currNode;
        let path = [];

        while (curr.parent) {
          path.push(curr);
          curr = curr.parent;
        }

        return path.reverse();
      }

      let closedNode = openSet.filter((el, ind) => ind === lowestInd);
      currNode.closed = true;
      closedSet.push(closedNode);
      let neighbors = this.graph.neighbors(currNode);

      for (let i = 0; i < neighbors.length; i++) {
        let n = neighbors[i];

        if (n.closed)
          continue;

        let gScore = currNode.g + 1;
        let bestGScore = false;

        if (n.visited || gScore < n.g) {
          bestGScore = true;
          n.h = AStar.manhattan(n.pos, this.end.pos);
          openSet.push(n);
        } else if (gScore < n.g) {
          bestGScore = true;
        }

        if (bestGScore) {
          n.parent = currNode;
          n.g = gScore;
          n.f = n.g + n.h;
        }
      }
    }

    return [];
  }

  static manhattan(p1, p2) {
    var dx = Math.abs(p2.x - p1.x);
    var dy = Math.abs(p2.y - p1.y);
    return dx + dy;
  }
}

export default AStar;
