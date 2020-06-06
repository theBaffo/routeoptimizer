const GraphUtils = require('../utils/graph-utils');
const ValidationUtils = require('../utils/validation-utils');
const InputValidationError = require('../errors/input-validation-error');

class Graph {
  /**
   * Constructor for Graph
   *
   * @param {Object} graph an object representing the graph (ex. { A: { B: 1, C: 4 }, B: { C: 2 } })
   */
  constructor(graph = {}) {
    this.graph = graph;
  }

  /**
   * Adds a new edge to the graph
   *
   * @param {string} from the starting node for the new edge
   * @param {string} to the ending node for the new edge
   * @param {string} cost the cost for the new edge
   */
  addEdge(from, to, cost) {
    // If the starting node is not in the graph already, create it
    if (!this.graph[from]) {
      this.graph[from] = {};
    }

    // If the ending node is not in the graph already, create it
    if (!this.graph[to]) {
      this.graph[to] = {};
    }

    const adjacentNodes = this.graph[from];
    adjacentNodes[to] = cost;
  }

  /**
   * Calculate the cost of a given route
   *
   * @param {Array} route the given route (ex. ['A', 'B', 'C'])
   * @returns {number} the cost of the given route
   * @throws {InputValidationError} if route is not a valid Array of nodes
   */
  calculateRouteCost(route) {
    if (!ValidationUtils.isValidArrayOfNodes(route)) {
      throw new InputValidationError('Input is not a valid list of nodes');
    }

    // Retrieve the starting point of the given route
    let totalCost = 0;
    let index = 0;
    let currentNode = route[index];

    // Check if the node exists in the graph
    if (!this.graph[currentNode]) {
      return 'No Such Route';
    }

    // Cycle until the route has been fully explored
    while (index < route.length - 1) {
      index += 1;
      const nextNode = route[index];
      const availableNodes = this.graph[currentNode];

      if (!availableNodes[nextNode]) {
        return 'No Such Route';
      }

      totalCost += availableNodes[nextNode];
      currentNode = nextNode;
    }

    return totalCost;
  }

  /**
   * Find all the possible routes between start (current) and end (goal) nodes with recursion
   *
   * @param {string} current the current node
   * @param {string} goal the node that we want to reach
   * @param {number} currentDepth the current depth of the route
   * @param {number} maxDepth the max depth allowed for any given route (defaults to Infinity)
   * @param {number} currentCost the cost of the current route
   * @param {number} maxCost the max cost allowed for any given route (defaults to Infinity)
   * @param {boolean} shouldReuseRoute if we can reuse the same route more than once
   * @param {Array} currentRoute the current route for any given iteration of the method
   *  (defaults to false)
   * @param {Array} routesFound at the end of the execution it will contain all the possible routes
   */
  findRoutes(
    current,
    goal,
    currentDepth,
    maxDepth,
    currentCost,
    maxCost,
    shouldReuseRoute,
    currentRoute,
    routesFound,
  ) {
    currentRoute.push(current);

    // If we reached the max depth / cost, return
    if (currentDepth > maxDepth || currentCost >= maxCost) {
      currentRoute.pop();
      return;
    }

    // If we reached the goal (and currentDepth is more than 0) add this path to routesFound
    if (current === goal && currentDepth > 0) {
      routesFound.push(currentRoute.slice());

      // If shouldReuseRoute is false, we shouldn't continue with the exploration
      if (!shouldReuseRoute) {
        currentRoute.pop();
        return;
      }
    }

    // Retrieve the adjacent nodes for the current node and the distances to the next nodes
    const nextNodes = Object.keys(this.graph[current]);
    const nextNodesDistances = Object.values(this.graph[current]);

    // Call findRoutes recursively for the adjacent nodes (increasing currentDepth and currentCost)
    for (let i = 0; i < nextNodes.length; i += 1) {
      this.findRoutes(
        nextNodes[i],
        goal,
        currentDepth + 1,
        maxDepth,
        currentCost + nextNodesDistances[i],
        maxCost,
        shouldReuseRoute,
        currentRoute,
        routesFound,
      );
    }

    // We finished to process this node, so pop it from the "queue"
    currentRoute.pop();
  }

  /**
   * Get all possible routes between start and end nodes
   *
   * @param {string} start the start node
   * @param {string} end the end node
   * @param {number} maxStops the max stops allowed for any given route (defaults to Infinity)
   * @param {number} maxCost the max cost allowed for any given route (defaults to Infinity)
   * @param {boolean} reuseRoute if we can reuse the same route more than once (defaults to false):
   *  if true, either maxStops or maxCost should be a value between 0 and Infinity (both excluded).
   * @returns {Array} all the possible routes
   * @throws {InputValidationError} if inputs are not valid
   */
  getAllPossibleRoutes(
    start,
    end,
    maxStops = Infinity,
    maxCost = Infinity,
    reuseRoute = false,
  ) {
    if (!ValidationUtils.isValidParamsForGetAllPossibleRoutes(
      start, end, maxStops, maxCost, reuseRoute,
    )) {
      throw new InputValidationError('Input is not valid!');
    }

    // Check if both start and end exists in the graph
    if (!this.graph[start]) {
      throw new InputValidationError(`Start node '${start}' not found`);
    }

    if (!this.graph[end]) {
      throw new InputValidationError(`End node '${end}' not found`);
    }

    // possibleRoutes will be updated by findRoutes
    const possibleRoutes = [];

    this.findRoutes(
      start,
      end,
      0,
      maxStops,
      0,
      maxCost,
      reuseRoute,
      [],
      possibleRoutes,
    );

    return possibleRoutes;
  }

  /**
   * Get the cheapest route between start and end nodes
   *
   * @param {string} start the start node
   * @param {string} end the end node
   * @returns {Object} an object containing both the cost of the cheapest route and the route itself
   *  (ex. { cost: 4, route: ['A', 'B', 'C'] }
   * @throws {InputValidationError} if inputs are not valid
   */
  getCheapestRoute(start, end) {
    if (!ValidationUtils.isValidParamsForGetCheapestRoute(start, end)) {
      throw new InputValidationError('Input is not valid!');
    }

    // Check if both start and end exists in the graph
    if (!this.graph[start]) {
      throw new InputValidationError(`Start node '${start}' not found`);
    }

    if (!this.graph[end]) {
      throw new InputValidationError(`End node '${end}' not found`);
    }

    // The initial distance to the end node should be equal to Infinity
    let distances = {};
    distances[end] = Infinity;

    // Assign distance value to all nodes reachable from the starting node
    distances = Object.assign(distances, this.graph[start]);

    // We need to keep track of the visited nodes
    const visited = [];

    // We keep track of each node "optimal parent" so we can reconstruct the optimal path at the end
    // of the function execution
    const parents = {};

    // For all the nodes reachable from the starting node, the "optimal parent" should be equal to
    // the starting node
    const nextNodes = Object.keys(this.graph[start]);

    for (let i = 0; i < nextNodes.length; i += 1) {
      parents[nextNodes[i]] = start;
    }

    // To begin, get the closest (and unvisited) node
    let node = GraphUtils.getClosestNode(distances, visited);

    // Loop until there is a node to be explored
    while (node) {
      const distance = distances[node];
      const children = this.graph[node];

      // Get all the nodes reachable from the current node
      const nodes = Object.keys(children);

      for (let i = 0; i < nodes.length; i += 1) {
        // Get the new distance from the start node to the "child" node
        const newDistance = distance + children[nodes[i]];

        // If there is no recorded distance from the start node to the child node or if the new
        // distance is shorter than the recorded distance, save the new distance
        if (!distances[nodes[i]] || distances[nodes[i]] > newDistance) {
          distances[nodes[i]] = newDistance;

          // Update the "optimal parent" of the current node
          parents[nodes[i]] = node;
        }
      }

      // Move the current node to the visited set
      visited.push(node);

      // Move to the nearest unvisited node
      node = GraphUtils.getClosestNode(distances, visited);
    }

    // Return the cost of the cheapest route, and the route itself
    const results = {
      cost: distances[end],
      route: GraphUtils.getCheapestRoute(parents, start, end),
    };

    return results;
  }
}

module.exports = Graph;
