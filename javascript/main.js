/*
 * Set up grid and Graph prototype
 * NB: jQuery binded objects begin with $
 */
import SearchGraph from './search_graph';
import AStar from './astar';
import BFS from './bfs';
import DFS from './dfs';

$(document).ready(() => {
  const $grid = $("#grid");
  const $selectAlgo = $("#selectAlgo");
  let algo = null;

  // switch($selectAlgo.val()) {
  //   case "BFS":
  //     algo = BFS;
  //     break;
  //   case "DFS":
  //     algo = DFS;
  //     break;
  //   default:
  //     algo = AStar;
  //     break;
  // }

  algo = AStar;

  const grid = new Graph($grid, algo);
});

class Graph {
  constructor($graph, algo) {
    this.$graph = $graph;
    this.algo = algo;
    this.grid = [];
    this.nodes = [];

    $graph.empty();

    const gridSize = 30;
    const $cellTemplate = $("<div />");

    $cellTemplate.addClass("grid-cell").width(($graph.width() / gridSize) - 1).height(($graph.width() / gridSize) - 1);

    for (let x = 0; x < gridSize; x++) {
      let $row = $("<div />").addClass("grid-row");
      const gridRow = [];
      const nodeRow = [];

      for (let y = 0; y < gridSize; y++) {
        const cellId = `cell-${x}-${y}`;
        let $cell = $cellTemplate.clone();
        $cell.attr("id", cellId).attr("x", x).attr("y", y);

        if (x === 0 && y === 0) {
          $cell.addClass("start");
        }

        $row.append($cell);
        gridRow.push($cell);
        nodeRow.push(1); // Indicate path
      }

      $graph.append($row);
      this.grid.push(gridRow);
      this.nodes.push(nodeRow);
    }

    this.searchGraph = new SearchGraph(this.nodes);

    this.$cells = $graph.find(".grid-cell");
    this.$cells.bind("click", (e) => this.clickCell($(e.target)));
  }

  clickCell($el) {
    const goal = this.getNode($el);

    if ($el.hasClass("start"))
      return;

    this.searchGraph = new SearchGraph(this.nodes);

    this.$cells.removeClass("clicked");
    this.$cells.removeClass("path");
    $el.addClass("clicked");

    let $start = this.$cells.filter(".start");
    let startNode = this.getNode($start);
    let endNode = this.getNode($el);

    let algoObj = new this.algo(this.searchGraph, startNode, endNode);

    let path = algoObj.search();

    this.showPath(path);
  }

  getNode($el) {
    return this.searchGraph.grid[Number($el.attr("x"))][Number($el.attr("y"))];
  }

  getElement(node) {
    return this.grid[node.x][node.y];
  }

  showPath(path) {
    this.showActive(path, 0);
  }

  showActive(path, i) {
    this.getElement(path[i]).addClass("path");
    setTimeout(() => {
      if (i < path.length - 2)
        this.showActive(path, i+1);
    }, 80);
  }
}
