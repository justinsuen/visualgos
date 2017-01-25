/*
* Set up grid and Graph prototype
* NB: jQuery binded objects begin with $
*/

$(document).ready(() => {
  const $grid = $("#grid");
  const $selectAlgo = $("#selectAlgo");
  const algo = null;

  switch($selectAlgo.val()) {
    case "BFS":
      algo = bfs.search;
      break;
    case "DFS":
      algo = dfs.search;
      break;
    default:
      algo = astar.search;
      break;
  }

  const grid = new Graph($grid, algo);
});

function Graph($graph, algo) {
  this.$graph = $graph;
  this.algo = algo;
  this.initialize();
}
