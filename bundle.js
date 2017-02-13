/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Set up grid and Graph prototype
	// jQuery binded objects begin with $
	
	var _search_graph = __webpack_require__(1);
	
	var _search_graph2 = _interopRequireDefault(_search_graph);
	
	var _astar = __webpack_require__(3);
	
	var _astar2 = _interopRequireDefault(_astar);
	
	var _bfs = __webpack_require__(4);
	
	var _bfs2 = _interopRequireDefault(_bfs);
	
	var _dfs = __webpack_require__(5);
	
	var _dfs2 = _interopRequireDefault(_dfs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	$(document).ready(function () {
	  var grid = new Graph($("#grid"));
	  var $newMazeBtn = document.getElementById("new-maze-btn");
	  $newMazeBtn.addEventListener("click", function () {
	    return new Graph($("#grid"));
	  });
	});
	
	var Graph = function () {
	  function Graph($graph) {
	    var _this = this;
	
	    _classCallCheck(this, Graph);
	
	    this.$graph = $graph;
	
	    this.algo = this.checkAlgo();
	    var $algo = document.getElementById("selectAlgo");
	    $algo.addEventListener("change", function (e) {
	      switch (e.target.value) {
	        case "BFS":
	          _this.algo = _bfs2.default;
	          break;
	        case "DFS":
	          _this.algo = _dfs2.default;
	          break;
	        default:
	          _this.algo = _astar2.default;
	          break;
	      }
	    });
	
	    this.gridSize = $("#selectGridSize").val();
	    this.grid = [];
	    this.nodes = [];
	
	    $graph.empty();
	
	    this.newGrid = this.newGrid.bind(this);
	    this.newGrid($graph);
	
	    this.searchGraph = new _search_graph2.default(this.nodes);
	
	    this.$cells = $graph.find(".grid-cell");
	    this.$cells.bind("click", function (e) {
	      return _this.clickCell($(e.target));
	    });
	  }
	
	  _createClass(Graph, [{
	    key: 'newGrid',
	    value: function newGrid($graph) {
	      var gridSize = this.gridSize;
	      var $cellTemplate = $("<div />");
	
	      $cellTemplate.addClass("grid-cell").width($graph.width() / gridSize - 1).height($graph.width() / gridSize - 1);
	
	      for (var x = 0; x < gridSize; x++) {
	        var $row = $("<div />").addClass("grid-row");
	        var gridRow = [];
	        var nodeRow = [];
	
	        for (var y = 0; y < gridSize; y++) {
	          var cellId = 'cell-' + x + '-' + y;
	          var $cell = $cellTemplate.clone();
	          $cell.attr("id", cellId).attr("x", x).attr("y", y);
	
	          if (x === 0 && y === 0) {
	            $cell.addClass("start");
	          }
	
	          $row.append($cell);
	          gridRow.push($cell);
	
	          var blocked = Math.floor(Math.random() * 5);
	          if (blocked === 0 && x !== 0 && y !== 0) {
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
	  }, {
	    key: 'checkAlgo',
	    value: function checkAlgo() {
	      var $selectAlgo = $("#selectAlgo");
	      switch ($selectAlgo.val()) {
	        case "BFS":
	          return _bfs2.default;
	        case "DFS":
	          return _dfs2.default;
	        default:
	          return _astar2.default;
	      }
	    }
	  }, {
	    key: 'clickCell',
	    value: function clickCell($el) {
	      this.$end = $el;
	      var goal = this.getNode($el);
	
	      if ($el.hasClass("start")) return;
	
	      this.searchGraph = new _search_graph2.default(this.nodes);
	
	      this.$cells.removeClass("end");
	      $el.addClass("end");
	
	      this.$start = this.$cells.filter(".start");
	      var startNode = this.getNode(this.$start);
	      var endNode = this.getNode($el);
	
	      var algoObj = new this.algo(this.searchGraph, startNode, endNode, this.grid);
	
	      var _algoObj$search = algoObj.search(),
	          path = _algoObj$search.path,
	          closedSet = _algoObj$search.closedSet;
	
	      this.path = path;
	
	      this.highlightClosed(closedSet, 1);
	    }
	  }, {
	    key: 'getNode',
	    value: function getNode($el) {
	      return this.searchGraph.grid[Number($el.attr("x"))][Number($el.attr("y"))];
	    }
	  }, {
	    key: 'getElement',
	    value: function getElement(node) {
	      return this.grid[node.x][node.y];
	    }
	  }, {
	    key: 'showPath',
	    value: function showPath(path) {
	      this.showActive(path, 0);
	    }
	  }, {
	    key: 'showActive',
	    value: function showActive(path, i) {
	      var _this2 = this;
	
	      this.getElement(path[i]).addClass("path");
	      setTimeout(function () {
	        if (i < path.length - 2) _this2.showActive(path, i + 1);
	      }, 800 / this.gridSize);
	    }
	  }, {
	    key: 'highlightClosed',
	    value: function highlightClosed(closedSet, i) {
	      var _this3 = this;
	
	      this.getElement(closedSet[i]).addClass("closed");
	      setTimeout(function () {
	        if (i < closedSet.length - 1) _this3.highlightClosed(closedSet, i + 1);else {
	          _this3.showPath(_this3.path);
	          setTimeout(function () {
	            _this3.$cells.removeClass("path");
	            _this3.$cells.removeClass("closed");
	            _this3.$start.removeClass("start");
	            _this3.$end.removeClass("end");
	            _this3.$end.addClass("start");
	          }, 3000 + 800 / _this3.gridSize * _this3.path.length);
	        }
	      }, 200 / this.gridSize);
	    }
	  }]);

	  return Graph;
	}();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _graph_node = __webpack_require__(2);
	
	var _graph_node2 = _interopRequireDefault(_graph_node);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SearchGraph = function () {
	  function SearchGraph(nodes) {
	    _classCallCheck(this, SearchGraph);
	
	    this.nodes = [];
	    this.grid = [];
	
	    for (var x = 0; x < nodes.length; x++) {
	      this.grid[x] = [];
	
	      for (var y = 0, row = nodes[x]; y < row.length; y++) {
	        var node = new _graph_node2.default(x, y, row[y]);
	        this.grid[x][y] = node;
	        this.nodes.push(node);
	      }
	    }
	  }
	
	  _createClass(SearchGraph, [{
	    key: "neighbors",
	    value: function neighbors(node) {
	      var allNeighbors = [];
	      var x = node.x;
	      var y = node.y;
	      var grid = this.grid;
	
	      // Manhattan neighbors
	      if (grid[x - 1] && grid[x - 1][y]) {
	        allNeighbors.push(grid[x - 1][y]);
	      }
	
	      if (grid[x + 1] && grid[x + 1][y]) {
	        allNeighbors.push(grid[x + 1][y]);
	      }
	
	      if (grid[x] && grid[x][y - 1]) {
	        allNeighbors.push(grid[x][y - 1]);
	      }
	
	      if (grid[x] && grid[x][y + 1]) {
	        allNeighbors.push(grid[x][y + 1]);
	      }
	
	      return allNeighbors;
	    }
	  }]);
	
	  return SearchGraph;
	}();
	
	exports.default = SearchGraph;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GraphNode = function GraphNode(x, y, weight) {
	  _classCallCheck(this, GraphNode);
	
	  this.x = x;
	  this.y = y;
	  this.pos = { x: this.x, y: this.y };
	  this.weight = weight;
	
	  this.f = 0;
	  this.g = 0;
	  this.h = 0;
	
	  this.visited = false;
	  this.closed = false;
	  this.parent = null;
	};
	
	exports.default = GraphNode;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Implemented with the pseudocode from https://en.wikipedia.org/wiki/A*_search_algorithm
	// A* selects a path that minimizes f(n) = g(n) + h(n) where
	//   g(n) is the cost of the path from the start node to n
	//   h(n) is a heuristic that estimates the cost of the cheapest
	//   path from n to the goal
	
	var AStar = function () {
	  function AStar(graph, start, end, grid) {
	    _classCallCheck(this, AStar);
	
	    this.start = start;
	    this.end = end;
	    this.graph = graph;
	    this.grid = grid;
	
	    for (var x = 0; x < this.graph.length; x++) {
	      for (var y = 0; y < this.graph[x].length; y++) {
	        this.graph[x][y].f = 0;
	        this.graph[x][y].g = 0;
	        this.graph[x][y].h = 0;
	        this.graph[x][y].parent = null;
	      }
	    }
	  }
	
	  _createClass(AStar, [{
	    key: "search",
	    value: function search() {
	      var _this = this;
	
	      var openSet = [];
	      var closedSet = [];
	      openSet.push(this.start);
	
	      var _loop = function _loop() {
	        var lowestInd = 0;
	        for (var i = 0; i < openSet.length; i++) {
	          if (openSet[i].f < openSet[lowestInd].f) lowestInd = i;
	        }
	
	        var currNode = openSet[lowestInd];
	        if (currNode.x === _this.end.x && currNode.y === _this.end.y) {
	          var curr = currNode;
	          var path = [];
	
	          while (curr.parent) {
	            path.push(curr);
	            curr = curr.parent;
	          }
	
	          return {
	            v: { path: path.reverse(), closedSet: closedSet }
	          };
	        }
	
	        var closedNode = openSet.filter(function (el, ind) {
	          return ind === lowestInd;
	        });
	
	        openSet = openSet.filter(function (el, ind) {
	          return ind !== lowestInd;
	        });
	
	        currNode.closed = true;
	        closedSet.push(closedNode[0]);
	        var neighbors = _this.graph.neighbors(currNode);
	
	        for (var _i = 0; _i < neighbors.length; _i++) {
	          var n = neighbors[_i];
	
	          if (n.closed || n.weight === 0) continue;
	
	          var gScore = currNode.g + 1;
	          var bestGScore = false;
	
	          if (!n.visited) {
	            bestGScore = true;
	            n.visited = true;
	            n.h = AStar.manhattan(n.pos, _this.end.pos);
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
	      };
	
	      while (openSet.length > 0) {
	        var _ret = _loop();
	
	        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	      }
	
	      return [];
	    }
	  }], [{
	    key: "manhattan",
	    value: function manhattan(p1, p2) {
	      var dx = Math.abs(p2.x - p1.x);
	      var dy = Math.abs(p2.y - p1.y);
	      return dx + dy;
	    }
	  }]);
	
	  return AStar;
	}();
	
	exports.default = AStar;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Implemented with the pseudocode from https://en.wikipedia.org/wiki/Breadth-first_search
	// Breadth first search starts at the tree root of a graph, and explores
	// the neighbor nodes first, before moving to the next level neighbors.
	
	var BFS = function () {
	  function BFS(graph, start, end) {
	    _classCallCheck(this, BFS);
	
	    this.start = start;
	    this.end = end;
	    this.graph = graph;
	
	    for (var x = 0; x < this.graph.length; x++) {
	      for (var y = 0; y < this.graph[x].length; y++) {
	        this.graph[x][y].parent = null;
	        this.graph[x][y].visited = false;
	      }
	    }
	  }
	
	  _createClass(BFS, [{
	    key: "search",
	    value: function search() {
	      var graph = this.graph;
	      var start = this.start;
	      var end = this.end;
	      var closedSet = [];
	
	      var queue = [start];
	
	      while (queue.length > 0) {
	        var currNode = queue.shift();
	
	        if (currNode.x === end.x && currNode.y === end.y) {
	          var path = [];
	          var curr = currNode;
	
	          while (curr.parent) {
	            path.push(curr);
	            curr = curr.parent;
	          }
	
	          return { path: path.reverse(), closedSet: closedSet };
	        }
	
	        currNode.closed = true;
	        closedSet.push(currNode);
	
	        var neighbors = graph.neighbors(currNode);
	        for (var i = 0; i < neighbors.length; i++) {
	          var n = neighbors[i];
	
	          if (n.closed || n.weight === 0) continue;
	
	          if (!n.visited) {
	            n.visited = true;
	            n.parent = currNode;
	            queue.push(n);
	          }
	        }
	      }
	    }
	  }]);
	
	  return BFS;
	}();
	
	exports.default = BFS;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// Implemented with the pseudocode from https://en.wikipedia.org/wiki/Depth-first_search
	// Depth first search starts at the tree root of a graph, and explores
	// as far as possible along each branch before backtracking to neighbors
	// branches.
	//
	// This version is a little bit hybrid-like... It checks neighbors to see
	// if any of them are the end nodes just in case.
	
	var DFS = function () {
	  function DFS(graph, start, end) {
	    _classCallCheck(this, DFS);
	
	    this.start = start;
	    this.end = end;
	    this.graph = graph;
	
	    for (var x = 0; x < this.graph.length; x++) {
	      for (var y = 0; y < this.graph[x].length; y++) {
	        this.graph[x][y].parent = null;
	      }
	    }
	  }
	
	  _createClass(DFS, [{
	    key: "search",
	    value: function search() {
	      var graph = this.graph;
	      var start = this.start;
	      var end = this.end;
	      var closedSet = [];
	
	      var stack = [[start, []]];
	
	      while (stack.length > 0) {
	        var currState = stack.pop();
	        var currNode = currState[0];
	        var currPath = currState[1];
	
	        if (currNode.x === end.x && currNode.y === end.y) {
	          return { path: currPath, closedSet: closedSet };
	        }
	
	        if (currNode.closed) {
	          continue;
	        }
	
	        var neighbors = graph.neighbors(currNode);
	        for (var i = 0; i < neighbors.length; i++) {
	          var n = neighbors[i];
	
	          if (n.weight === 0) continue;
	
	          if (n.x === end.x && n.y === end.y) {
	            return { path: currPath.concat([n]), closedSet: closedSet.concat([currNode]) };
	          }
	
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
	  }]);
	
	  return DFS;
	}();
	
	exports.default = DFS;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map