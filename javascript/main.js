/*
 * Set up grid and Graph prototype
 * NB: jQuery binded objects begin with $
 */

$(document).ready(() => {
  const $grid = $("#grid");
  const $selectAlgo = $("#selectAlgo");
  const algo = null;

  // switch($selectAlgo.val()) {
  //   case "BFS":
  //     algo = bfs.search;
  //     break;
  //   case "DFS":
  //     algo = dfs.search;
  //     break;
  //   default:
  //     algo = astar.search;
  //     break;
  // }

  const grid = new Graph($grid, algo);
});

class Graph {
  constructor($graph, algo) {
    this.$graph = $graph;
    this.algo = algo;
    this.grid = [];

    $graph.empty();

    const gridSize = 40;
    const $cellTemplate = $("<div />");

    $cellTemplate.addClass("grid-cell").width(($graph.width() / gridSize) - 1).height(($graph.width() / gridSize) - 1);

    for (let x = 0; x < gridSize; x++) {
      let $row = $("<div />").addClass("grid-row");
      let gridRow = [];

      for (let y = 0; y < gridSize; y++) {
        const cellId = `cell-${x}-${y}`;
        let $cell = $cellTemplate.clone();
        $cell.attr("id", cellId).attr("x", x).attr("y", y);
        $row.append($cell);
        gridRow.push($cell);
      }

      $graph.append($row);
      this.grid.push(gridRow);
    }
  }
}
