const VALID_EDGE_FORMAT = /^[A-Z]{2}[1-9]{1}[0-9]*$/g;
const VALID_NODE_FORMAT = /^[A-Z]{1}$/g;

class ValidationUtils {
  /*
   * Edges validation
   */

  /**
   * Check if the given Array of edges is valid
   *
   * @param {Array} edges an Array of string representing the graph (ex. ["AB1", "AC4", "BC2"])
   * @returns {boolean} if the given Array of edges is valid
   */
  static isValidArrayOfEdges(edges) {
    if (!edges) {
      return false;
    }

    return Array.isArray(edges)
      && edges.length > 0
      && edges.every((edge) => this.isValidEdge(edge));
  }

  /**
   * Check if the given edge is valid
   *
   * @param {string} edge a string representing an edge of the graph (ex. "AB1")
   * @returns {boolean} if the given edge is valid
   */
  static isValidEdge(edge) {
    if (!edge || typeof edge !== 'string') {
      return false;
    }

    // If the edge is not valid, .match returns null
    return edge.match(VALID_EDGE_FORMAT) != null;
  }

  /*
   * Array validation
   */

  /**
   * Check if the given Array of nodes is valid
   *
   * @param {Array} nodes an Array of string representing the nodes in the graph (ex. ["A", "B"])
   * @returns {boolean} if the given Array of nodes is valid
   */
  static isValidArrayOfNodes(nodes) {
    if (!nodes) {
      return false;
    }

    return Array.isArray(nodes)
      && nodes.length > 0
      && nodes.every((node) => this.isValidNode(node));
  }

  /**
   * Check if the given node is valid
   *
   * @param {string} node a string representing a node of the graph (ex. "A")
   * @returns {boolean} if the given node is valid
   */
  static isValidNode(node) {
    if (!node || typeof node !== 'string') {
      return false;
    }

    // If the edge is not valid, .match returns null
    return node.match(VALID_NODE_FORMAT) != null;
  }

  /*
   * Method validation
   */

  /**
   * Check if the given inputs are valid inputs for "getAllPossibleRoutes"
   *
   * @param {string} start the start node
   * @param {string} end the end node
   * @param {number} maxStops the max number of stops allowed
   * @param {number} maxCost the max cost allowed
   * @param {boolean} reuseRoute if we can reuse the same route more than once
   * @returns {boolean} if the given inputs are valid inputs for "getAllPossibleRoutes"
   */
  static isValidParamsForGetAllPossibleRoutes(
    start, end, maxStops, maxCost, reuseRoute,
  ) {
    if (!start || !end || !maxStops || !maxCost) {
      return false;
    }

    // start and end nodes should be valid nodes
    if (!this.isValidNode(start) || !this.isValidNode(end)) {
      return false;
    }

    // maxStops / maxCost should be greater than 0
    if (maxStops <= 0 || maxCost <= 0) {
      return false;
    }

    // If reuseRoute === true, either maxStops or maxCost should be defined
    if (reuseRoute && maxStops === Infinity && maxCost === Infinity) {
      return false;
    }

    // In all the other cases, the given inputs are valid
    return true;
  }

  /**
   * Check if the given inputs are valid inputs for "getCheapestRoute"
   *
   * @param {string} start the start node
   * @param {string} end the end node
   * @returns {boolean} if the given inputs are valid inputs for "getCheapestRoute"
   */
  static isValidParamsForGetCheapestRoute(start, end) {
    if (!start || !end) {
      return false;
    }

    // start and end nodes should be valid nodes
    if (!this.isValidNode(start) || !this.isValidNode(end)) {
      return false;
    }

    // In all the other cases, the given inputs are valid
    return true;
  }
}

module.exports = ValidationUtils;
