const Graph = require('../models/graph');
const ValidationUtils = require('../utils/validation-utils');
const InputValidationError = require('../errors/input-validation-error');

class RouteOptimizer {
  /**
   * Constructor for RouteOptimizer: You should use the static method "fromArray" instead.
   */
  constructor() {
    this.graph = new Graph();
  }

  /**
   * Create a RouteOptimizer instance from an Array of edges representing the graph
   *
   * @param {Array} edges an Array of edges representing the graph (ex. ["AB1", "AC4", "BC2"])
   * @returns {Object} a new instance of RouteOptimizer
   * @throws {InputValidationError} if edges is not a valid Array of edges
   */
  static fromArray(edges) {
    // Initialize Graph
    const graph = new Graph();

    // Check if input is valid
    if (!ValidationUtils.isValidArrayOfEdges(edges)) {
      throw new InputValidationError('Input is not a valid list of edges');
    }

    for (let i = 0; i < edges.length; i += 1) {
      const from = edges[i][0];
      const to = edges[i][1];
      const cost = Number(edges[i].slice(2));

      graph.addEdge(from, to, cost);
    }

    // Initialize RouteOptimizer
    const routeOptimizer = new RouteOptimizer();
    routeOptimizer.graph = graph;
    return routeOptimizer;
  }

  /**
   * Calculate the cost of a given route
   *
   * @param {Array} route the given route (ex. ['A', 'B', 'C'])
   * @returns {number} the cost of the given route
   * @throws {InputValidationError} if route is not a valid Array of nodes
   */
  calculateRouteCost(route) {
    return this.graph.calculateRouteCost(route);
  }

  /**
   * Returns a Promise that calculates the cost of a given route
   *
   * @param {Array} route the given route (ex. ['A', 'B', 'C'])
   * @returns {number} the cost of the given route
   * @throws {InputValidationError} if route is not a valid Array of nodes
   */
  calculateRouteCostAsync(route) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.calculateRouteCost(route);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
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
    return this.graph.getAllPossibleRoutes(start, end, maxStops, maxCost, reuseRoute);
  }

  /**
   * Returns a Promise that gets all possible routes between start and end nodes
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
  getAllPossibleRoutesAsync(
    start,
    end,
    maxStops = Infinity,
    maxCost = Infinity,
    reuseRoute = false,
  ) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.getAllPossibleRoutes(start, end, maxStops, maxCost, reuseRoute);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
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
    return this.graph.getCheapestRoute(start, end);
  }

  /**
   * Returns a Promise that gets the cheapest route between start and end nodes
   *
   * @param {string} start the start node
   * @param {string} end the end node
   * @returns {Object} an object containing both the cost of the cheapest route and the route itself
   *  (ex. { cost: 4, route: ['A', 'B', 'C'] }
   * @throws {InputValidationError} if inputs are not valid
   */
  getCheapestRouteAsync(start, end) {
    return new Promise((resolve, reject) => {
      try {
        const result = this.getCheapestRoute(start, end);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
}


module.exports = RouteOptimizer;
