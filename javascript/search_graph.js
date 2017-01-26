import GraphNode from "./graph_node";

class SearchGraph {
  constructor(nodes) {
    this.nodes = [];
    this.grid = [];

    for (let x = 0; x < nodes.length; x++) {
      this.grid[x] = [];

      for (let y = 0, row = nodes[x]; y < row.length; y++) {
        let node = new GraphNode(x, y, row[y]);
        this.grid[x][y] = node;
        this.nodes.push(node);
      }
    }
  }
}

export default SearchGraph;
