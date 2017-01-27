// Implemented with the pseudocode from https://en.wikipedia.org/wiki/Breadth-first_search
// Breadth first search starts at the tree root of a graph, and explores
// the neighbor nodes first, before moving to the next level neighbors.

class BFS {
  constructor(graph, start, end) {
    this.start = start;
    this.end = end;
    this.graph = graph;

    for (let x = 0; x < this.graph.length; x++) {
      for (let y = 0; y < this.graph[x].length; y++) {
        this.graph[x][y].parent = null;
        this.graph[x][y].visited = false;
      }
    }
  }

  search() {
    const graph = this.graph;
    const start = this.start;
    const end = this.end;
    const closedSet = [];

    let queue = [start];

    while (queue.length > 0) {
      let currNode = queue.shift();

      if (currNode.pos.x === end.pos.x && currNode.pos.y === end.pos.y) {
        let path = [];
        let curr = currNode;

        while (curr.parent) {
          path.push(curr);
          curr = curr.parent;
        }

        return { path: path.reverse(), closedSet: closedSet };
      }

      closedSet.push(currNode);

      let neighbors = graph.neighbors(currNode);
      for (let i = 0; i < neighbors.length; i++) {
        if (!neighbors[i].visited) {
          neighbors[i].visited = true;
          neighbors[i].parent = currNode;
          queue.push(neighbors[i]);
        }
      }
    }
  }
}

export default BFS;
