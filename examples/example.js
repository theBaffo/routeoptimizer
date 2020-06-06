/* eslint-disable no-console */

// Substitute with the absolute path to RouteOptimizer
const RouteOptimizer = require('..');

// Create a RouteOptimizer object from testArray
const testArray = ['AB1', 'AC4', 'AD10', 'BE3', 'CD4', 'CF2', 'DE1', 'EB3', 'EA2', 'FD1'];
const routeOptimizer = RouteOptimizer.fromArray(testArray);

// Test the various method
console.log(`Cost of route 'ABE': ${routeOptimizer.calculateRouteCost(['A', 'B', 'E'])}`);
console.log(`Number of possible routes between 'E' and 'D': ${routeOptimizer.getAllPossibleRoutes('E', 'D', 4).length}`);
console.log(`Cheapest route between 'E' and 'D': ${routeOptimizer.getCheapestRoute('E', 'D').route}`);

// Test the various method (async)
routeOptimizer.calculateRouteCostAsync(['A', 'B', 'E'])
  .then((res) => {
    console.log(`(Async) Cost of route 'ABE': ${res}`);
  })
  .catch((err) => {
    console.log(`(Async) Cost of route 'ABE': ${err}`);
  });

routeOptimizer.getAllPossibleRoutesAsync('E', 'D', 4)
  .then((res) => {
    console.log(`(Async) Number of possible routes between 'E' and 'D': ${res.length}`);
  })
  .catch((err) => {
    console.log(`(Async) Number of possible routes between 'E' and 'D': ${err}`);
  });

routeOptimizer.getCheapestRouteAsync('E', 'D')
  .then((res) => {
    console.log(`(Async) Cheapest route between 'E' and 'D': ${res.route}`);
  })
  .catch((err) => {
    console.log(`(Async) Cheapest route between 'E' and 'D': ${err}`);
  });
