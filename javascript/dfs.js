// Implemented with the pseudocode from https://en.wikipedia.org/wiki/Depth-first_search
// Depth first search starts at the tree root of a graph, and explores
// as far as possible along each branch before backtracking to neighbors
// branches.

class DFS {
  constructor(graph, start, end) {
    this.start = start;
    this.end = end;
    this.graph = graph;

    for (let x = 0; x < this.graph.length; x++) {
      for (let y = 0; y < this.graph[x].length; y++) {
        this.graph[x][y].parent = null;
      }
    }
  }

  search() {
    const graph = this.graph;
    const start = this.start;
    const end = this.end;
    const closedSet = [];

    let stack = [[start, [start]]];

    while (stack.length > 0) {
      let currState = stack.pop();
      let currNode = currState[0];
      let currPath = currState[1];

      if (currNode.x === end.x && currNode.y === end.y) {
        return { path: currPath, closedSet: closedSet };
      }

      if (currNode.closed) {
        continue;
      }

      let neighbors = graph.neighbors(currNode);
      for (let i = 0; i < neighbors.length; i++) {
        let n = neighbors[i];

        if (n.weight === 0)
          continue;

        if (!n.visited) {
          n.visited = true;
          n.parent = currNode;
          stack.push([n, currPath.concat([n])]);
        }
      }

      currNode.closed = true;
      closedSet.push(currNode);
    }
  }
}

export default DFS;
