<h1 align="center">Route Optimizer</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/theBaffo/routeoptimizer#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/theBaffo/routeoptimizer/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/theBaffo/routeoptimizer/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/theBaffo/routeoptimizer" />
  </a>
</p>

## Usage

After downloading the project locally, you can use the library by requiring it in your project (passing the absolute path).

```sh
const RouteOptimizer = require('/your/path/here/routeoptimizer');
```

## Initialization

You can initialize RouteOptimizer by using the static method "fromArray": this method takes a list 
of edges (an array of strings) and returns a new RouteOptimizer object. 

The correct format for an edge is "SEC": S indicates the starting 
node, E the ending node, and C the cost (ex. "AB1").

```sh
// A list of edges representing the graph
const myGraphArray = ["AB1", "AC4", "AD10", "BE3", "CD4", "CF2", "DE1", "EB3", "EA2", "FD1"];

// Initialize the library using the "fromArray" method
const routeOptimizer = RouteOptimizer.fromArray(myGraphArray);
```

## Methods

The available methods are:

1. calculateRouteCost(route) - Calculate the cost of a given route.

```sh
// Calculate the cost of the route ['A', 'B', 'E']
// ex. => 4
routeOptimizer.calculateRouteCost(['A', 'B', 'E']);
```

2. getAllPossibleRoutes - Get all possible routes between start and end nodes.
Is it possible to specify the max number of stops allowed ("maxStops", defaults to Infinity), 
the max cost allowed ("maxCost", defaults to Infinity), and if the method should reuse the same 
route more than once (reuseRoute, defaults to false).

```sh
// Get all possible routes between 'E' and 'D' with no more than 4 stops
// Also, the method will not reuse the same route more than once ("reuseRoute" defaults to false)
// ex. => { cost: 9, route: ['E', 'A', 'C', 'F', 'D'] }
routeOptimizer.getAllPossibleRoutes('E', 'D', 4);
```

3. getCheapestRoute - Get the cheapest route between start and end nodes. The function 
will return an object containing both the cost (property "cost") of the cheapest route, and the 
route itself (property "route").

```sh
// Get the cheapest route between 'E' and 'D'
// ex. => { cost: 9, route: ['E', 'A', 'C', 'F', 'D'] }
routeOptimizer.getCheapestRoute('E', 'D');
```

For each of the previous methods, there is an "*Async" version that returns a Promise object.

```sh
// Returns a Promise that gets the cheapest route between 'E' and 'D'
// ex. => { cost: 9, route: ['E', 'A', 'C', 'F', 'D'] }
routeOptimizer.getCheapestRouteAsync('E', 'D').then(...).catch(...);
```

## Example

Take a look at the code in [examples/example.js](examples/example.js).

## Run tests

```sh
npm run test
```

## Author

👤 **Marco Giuliani**

* Github: [@theBaffo](https://github.com/theBaffo)
* LinkedIn: [@marco-giuliani-dev](https://linkedin.com/in/marco-giuliani-dev)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Marco Giuliani](https://github.com/theBaffo).<br />
This project is [MIT](https://github.com/theBaffo/routeoptimizer/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_