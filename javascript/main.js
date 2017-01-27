// Set up grid and Graph prototype
// jQuery binded objects begin with $

import SearchGraph from './search_graph';
import AStar from './astar';
import BFS from './bfs';
import DFS from './dfs';

$(document).ready(() => {
  const grid = new Graph($("#grid"));
  const $newMazeBtn = document.getElementById("new-maze-btn");
  $newMazeBtn.addEventListener("click", () => new Graph($("#grid")));
});

class Graph {
  constructor($graph) {
    this.$graph = $graph;

    this.algo = AStar;
    const $algo = document.getElementById("selectAlgo");
    $algo.addEventListener("change", e => {
      switch(e.target.value) {
        case "BFS":
          this.algo = BFS;
          break;
        case "DFS":
          this.algo = DFS;
          break;
        default:
          this.algo = AStar;
          break;
      }
    });

    this.gridSize = $("#selectGridSize").val();
    this.grid = [];
    this.nodes = [];

    $graph.empty();

    this.newGrid = this.newGrid.bind(this);
    this.newGrid($graph);

    this.searchGraph = new SearchGraph(this.nodes);

    this.$cells = $graph.find(".grid-cell");
    this.$cells.bind("click", (e) => this.clickCell($(e.target)));
  }

  newGrid($graph) {
    const gridSize = this.gridSize;
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

        const blocked = Math.floor(Math.random()*5);
        if(blocked === 0 && x !== 0 && y !== 0) {
          nodeRow.push(0);
          $cell.addClass("block");
        } else {
          nodeRow.push(1); // Indicate path
        }
      }

      $graph.append($row);
      this.grid.push(gridRow);
      this.nodes.push(nodeRow);
    }
  }

  clickCell($el) {
    this.$end = $el;
    const goal = this.getNode($el);

    if ($el.hasClass("start"))
      return;

    this.searchGraph = new SearchGraph(this.nodes);

    this.$cells.removeClass("end");
    $el.addClass("end");

    this.$start = this.$cells.filter(".start");
    let startNode = this.getNode(this.$start);
    let endNode = this.getNode($el);

    let algoObj = new this.algo(this.searchGraph, startNode, endNode, this.grid);

    let { path, closedSet } = algoObj.search();
    this.path = path;

    this.highlightClosed(closedSet, 1);
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
    }, 800/this.gridSize);
  }

  highlightClosed(closedSet, i) {
    this.getElement(closedSet[i]).addClass("closed");
    setTimeout(() => {
      if (i < closedSet.length - 1)
        this.highlightClosed(closedSet, i+1);
      else {
        this.showPath(this.path);
        setTimeout(() => {
          this.$cells.removeClass("path");
          this.$cells.removeClass("closed");
          this.$start.removeClass("start");
          this.$end.removeClass("end");
          this.$end.addClass("start");
        }, this.path.length*50);
      }
    }, 200/this.gridSize);
  }
}
