const { assert, expect } = require('chai');
const Graph = require('../../models/graph');
const InputValidationError = require('../../errors/input-validation-error');

const testGraph = {
  A: { B: 1, C: 4, D: 10 },
  B: { E: 3 },
  C: { D: 4, F: 2 },
  D: { E: 1 },
  E: { B: 3, A: 2 },
  F: { D: 1 },
};

const graph = new Graph(testGraph);

describe('graph.js tests', () => {
  describe('addEdge()', () => {
    const testCases = [
      // Positive tests
      {
        from: 'A',
        to: 'B',
        cost: 1,
        result: {
          A: { B: 1 },
          B: {},
        },
      },
      // Negative tests covered in validation-utils.test.js
    ];

    const addEdgeGraph = new Graph();

    testCases.forEach((test) => {
      it(`I should be able to add an edge from ${test.from} to ${test.to}`, () => {
        addEdgeGraph.addEdge(test.from, test.to, test.cost);
        assert.deepEqual(addEdgeGraph.graph, test.result);
      });
    });
  });

  describe('calculateRouteCost()', () => {
    const testCases = [
      // Positive tests
      { route: ['A', 'B', 'E'], result: 4 },
      { route: ['A', 'D'], result: 10 },
      { route: ['E', 'A', 'C', 'F'], result: 8 },
      { route: ['A', 'D', 'F'], result: 'No Such Route' },
      // Negative tests (All other case covered in validation-utils.test.js)
      { nodes: ['A', 'B', 'c'], result: InputValidationError },
    ];

    testCases.forEach((test) => {
      if (test.result === InputValidationError) {
        it(`The route ${test.route} should not be valid`, () => {
          expect(() => graph.calculateRouteCost(test.route)).to.throw(test.result);
        });
      } else {
        it(`The cost of route ${test.route} should be ${test.result}`, () => {
          assert.equal(graph.calculateRouteCost(test.route), test.result);
        });
      }
    });
  });

  describe('findRoutes()', () => {
    const testCases = [
      // Positive tests
      {
        start: 'E',
        end: 'D',
        currentDepth: 0,
        maxDepth: 4,
        currentCost: 0,
        maxCost: Infinity,
        shouldReuseRoute: false,
        currentRoute: [],
        routesFound: [],
        result: 4,
        routes: [
          ['E', 'B', 'E', 'A', 'D'],
          ['E', 'A', 'C', 'D'],
          ['E', 'A', 'C', 'F', 'D'],
          ['E', 'A', 'D'],
        ],
      },
      {
        start: 'E',
        end: 'E',
        currentDepth: 0,
        maxDepth: Infinity,
        currentCost: 0,
        maxCost: Infinity,
        shouldReuseRoute: false,
        currentRoute: [],
        routesFound: [],
        result: 5,
        routes: [
          ['E', 'B', 'E'],
          ['E', 'A', 'B', 'E'],
          ['E', 'A', 'C', 'D', 'E'],
          ['E', 'A', 'C', 'F', 'D', 'E'],
          ['E', 'A', 'D', 'E'],
        ],
      },
      {
        start: 'E',
        end: 'E',
        currentDepth: 0,
        maxDepth: Infinity,
        currentCost: 0,
        maxCost: 20,
        shouldReuseRoute: true,
        currentRoute: [],
        routesFound: [],
        result: 29,
        routes: [
          ['E', 'B', 'E'],
          ['E', 'B', 'E', 'B', 'E'],
          [
            'E', 'B', 'E',
            'B', 'E', 'B',
            'E',
          ],
          [
            'E', 'B', 'E',
            'B', 'E', 'A',
            'B', 'E',
          ],
          ['E', 'B', 'E', 'A', 'B', 'E'],
          [
            'E', 'B', 'E',
            'A', 'B', 'E',
            'B', 'E',
          ],
          [
            'E', 'B', 'E',
            'A', 'B', 'E',
            'A', 'B', 'E',
          ],
          [
            'E', 'B', 'E',
            'A', 'C', 'D',
            'E',
          ],
          [
            'E', 'B', 'E',
            'A', 'C', 'F',
            'D', 'E',
          ],
          ['E', 'B', 'E', 'A', 'D', 'E'],
          ['E', 'A', 'B', 'E'],
          ['E', 'A', 'B', 'E', 'B', 'E'],
          [
            'E', 'A', 'B',
            'E', 'B', 'E',
            'B', 'E',
          ],
          [
            'E', 'A', 'B',
            'E', 'B', 'E',
            'A', 'B', 'E',
          ],
          [
            'E', 'A', 'B',
            'E', 'A', 'B',
            'E',
          ],
          [
            'E', 'A', 'B',
            'E', 'A', 'B',
            'E', 'B', 'E',
          ],
          [
            'E', 'A', 'B', 'E',
            'A', 'B', 'E', 'A',
            'B', 'E',
          ],
          [
            'E', 'A', 'B',
            'E', 'A', 'C',
            'D', 'E',
          ],
          [
            'E', 'A', 'B',
            'E', 'A', 'C',
            'F', 'D', 'E',
          ],
          [
            'E', 'A', 'B',
            'E', 'A', 'D',
            'E',
          ],
          ['E', 'A', 'C', 'D', 'E'],
          [
            'E', 'A', 'C',
            'D', 'E', 'B',
            'E',
          ],
          [
            'E', 'A', 'C',
            'D', 'E', 'A',
            'B', 'E',
          ],
          ['E', 'A', 'C', 'F', 'D', 'E'],
          [
            'E', 'A', 'C',
            'F', 'D', 'E',
            'B', 'E',
          ],
          [
            'E', 'A', 'C',
            'F', 'D', 'E',
            'A', 'B', 'E',
          ],
          ['E', 'A', 'D', 'E'],
          ['E', 'A', 'D', 'E', 'B', 'E'],
          [
            'E', 'A', 'D',
            'E', 'A', 'B',
            'E',
          ],
        ],
      },
    ];

    testCases.forEach((test) => {
      let message = `The number of possible routes between ${test.start} and ${test.end} (`;

      message += `shouldReuseRoute: ${test.shouldReuseRoute}`;
      message += `, maxDepth: ${test.maxDepth}`;
      message += `, maxCost: ${test.maxCost}`;
      message += `) should match the expected result (${test.result})`;

      graph.findRoutes(
        test.start,
        test.end,
        test.currentDepth,
        test.maxDepth,
        test.currentCost,
        test.maxCost,
        test.shouldReuseRoute,
        test.currentRoute,
        test.routesFound,
      );

      it(message, () => {
        assert.equal(test.routesFound.length, test.result);
        assert.deepEqual(test.routesFound, test.routes);
      });
    });
  });

  describe('getAllPossibleRoutes()', () => {
    const testCases = [
      // Positive tests
      {
        start: 'E',
        end: 'D',
        maxStops: 4,
        maxCost: Infinity,
        reuseRoute: false,
        result: 4,
        routes: [
          ['E', 'B', 'E', 'A', 'D'],
          ['E', 'A', 'C', 'D'],
          ['E', 'A', 'C', 'F', 'D'],
          ['E', 'A', 'D'],
        ],
      },
      // Negative tests (All other case covered in validation-utils.test.js)
      {
        start: 'E',
        end: 'D',
        maxStops: Infinity,
        maxCost: Infinity,
        reuseRoute: true,
        result: InputValidationError,
      },
      // Negative tests (Nodes not found in graph)
      {
        start: 'A',
        end: 'S',
        maxStops: Infinity,
        maxCost: Infinity,
        reuseRoute: false,
        result: InputValidationError,
      },
      {
        start: 'S',
        end: 'A',
        maxStops: Infinity,
        maxCost: Infinity,
        reuseRoute: false,
        result: InputValidationError,
      },
    ];

    testCases.forEach((test) => {
      let message = `The number of possible routes between ${test.start} and ${test.end} (`;

      message += `reuseRoute: ${test.reuseRoute}`;
      message += `, maxStops: ${test.maxStops}`;
      message += `, maxCost: ${test.maxCost}`;

      if (test.result === InputValidationError) {
        message += ') should not be valid';

        it(message, () => {
          expect(() => graph.getAllPossibleRoutes(
            test.start,
            test.end,
            test.maxStops,
            test.maxCost,
            test.reuseRoute,
          )).to.throw(test.result);
        });
      } else {
        message += `) should match the expected result (${test.result})`;

        const result = graph.getAllPossibleRoutes(
          test.start,
          test.end,
          test.maxStops,
          test.maxCost,
          test.reuseRoute,
        );

        it(message, () => {
          assert.equal(result.length, test.result);
          assert.deepEqual(result, test.routes);
        });
      }
    });
  });

  describe('getCheapestRoute()', () => {
    const testCases = [
      // Positive tests
      {
        start: 'E', end: 'D', cost: 9, route: ['E', 'A', 'C', 'F', 'D'],
      },
      {
        start: 'E', end: 'E', cost: 6, route: ['E', 'B', 'E'],
      },
      // Negative tests (All other case covered in validation-utils.test.js)
      {
        start: 'a', end: 'B', result: InputValidationError,
      },
      // Negative tests (Nodes not found in graph)
      {
        start: 'S', end: 'A', result: InputValidationError,
      },
      {
        start: 'A', end: 'S', result: InputValidationError,
      },
    ];

    testCases.forEach((test) => {
      if (test.result === InputValidationError) {
        it('The input should not be valid', () => {
          expect(() => graph.getCheapestRoute(test.start, test.end)).to.throw(test.result);
        });
      } else {
        const results = graph.getCheapestRoute(test.start, test.end);

        it(`The cheapest route between ${test.start} and ${test.end} should cost ${test.cost}`, () => {
          assert.equal(results.cost, test.cost);
        });
        it(`The cheapest route between ${test.start} and ${test.end} should be ${test.route}`, () => {
          assert.deepEqual(results.route, test.route);
        });
      }
    });
  });
});
