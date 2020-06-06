class GraphUtils {
  /**
   * Get the closest unvisited node from the given distances object, otherwise return null
   *
   * @param {Object} distances an object containing the distance to any given node
   * @param {Array} visited an Array that stores the node that were visited already
   * @returns {string} the closest unvisited node
   */
  static getClosestNode(distances, visited) {
    if (!distances || !visited || !Array.isArray(visited)) {
      return null;
    }

    let closest = null;
    const nodes = Object.keys(distances);

    for (let i = 0; i < nodes.length; i += 1) {
      const currentIsShortest = closest === null || distances[nodes[i]] < distances[closest];

      // If the current node is the closest one, and is unvisited, save the reference in "closest"
      if (currentIsShortest && !visited.includes(nodes[i])) {
        closest = nodes[i];
      }
    }

    return closest;
  }

  /**
   * Given the parents object, return the cheapest route between start and end
   *
   * @param {Object} parents an object containing the "optimal" parent for any given node
   * @param {string} start the start node
   * @param {string} end the end node
   * @returns {Array} the cheapest route
   */
  static getCheapestRoute(parents, start, end) {
    if (!parents || !start || !end) {
      return null;
    }

    const shortestPath = [end];
    let parent = parents[end];

    // It may happen that there is no route to the end node, and the parent of the end node is null
    // In that case, return null
    if (!parent) {
      return null;
    }

    // Cycle until we reach the start node
    // We have to cycle at least once because start and end node might be the same
    do {
      shortestPath.push(parent);
      parent = parents[parent];
    } while (parent !== start);

    // We add the start node manually, then reverse the shortestPath Array to get the optimal route
    shortestPath.push(start);
    shortestPath.reverse();

    return shortestPath;
  }
}

module.exports = GraphUtils;
