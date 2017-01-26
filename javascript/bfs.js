class BFS {
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
    
  }
}

export default BFS;
