const { assert, expect } = require('chai');
const RouteOptimizer = require('../../services/route-optimizer');
const InputValidationError = require('../../errors/input-validation-error');

const testArray = ['AB1', 'AC4', 'AD10', 'BE3', 'CD4', 'CF2', 'DE1', 'EB3', 'EA2', 'FD1'];
const routeOptimizer = RouteOptimizer.fromArray(testArray);

describe('route-optimizer.js tests', () => {
  describe('fromArray()', () => {
    const testCases = [
      // Positive tests
      {
        edges: ['AB1', 'AC4', 'CD4'],
        result: {
          A: { B: 1, C: 4 },
          B: {},
          C: { D: 4 },
          D: {},
        },
      },
      // Negative tests (All other case covered in validation-utils.test.js)
      { edges: ['AB1', 'AC4', 'CDC'], result: InputValidationError },
    ];

    testCases.forEach((test) => {
      if (test.result === InputValidationError) {
        it(`The Array of edges ${test.edges} should not be valid`, () => {
          expect(() => RouteOptimizer.fromArray(test.edges)).to.throw(test.result);
        });
      } else {
        it(`The Array of edges ${test.edges} should build the expected RouteService`, () => {
          assert.deepEqual(RouteOptimizer.fromArray(test.edges).graph.graph, test.result);
        });
      }
    });
  });

  describe('[E2E] calculateRouteCost()', () => {
    const testCases = [
      { route: ['A', 'B', 'E'], result: 4 },
      { route: ['A', 'D'], result: 10 },
      { route: ['E', 'A', 'C', 'F'], result: 8 },
      { route: ['A', 'D', 'F'], result: 'No Such Route' },
    ];

    testCases.forEach((test) => {
      it(`The cost of route ${test.route} should be ${test.result}`, () => {
        assert.equal(routeOptimizer.calculateRouteCost(test.route), test.result);
      });
    });
  });

  describe('[E2E] getAllPossibleRoutes()', () => {
    const testCases = [
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
      {
        start: 'E',
        end: 'E',
        maxStops: Infinity,
        maxCost: Infinity,
        reuseRoute: false,
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
        maxStops: Infinity,
        maxCost: 20,
        reuseRoute: true,
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

      message += `reuseRoute: ${test.reuseRoute}`;
      message += `, maxStops: ${test.maxStops}`;
      message += `, maxCost: ${test.maxCost}`;

      message += `) should match the expected result (${test.result})`;

      const result = routeOptimizer.getAllPossibleRoutes(
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
    });
  });

  describe('[E2E] getCheapestRoute()', () => {
    const testCases = [
      {
        start: 'E', end: 'D', cost: 9, route: ['E', 'A', 'C', 'F', 'D'],
      },
      {
        start: 'E', end: 'E', cost: 6, route: ['E', 'B', 'E'],
      },
    ];

    testCases.forEach((test) => {
      const results = routeOptimizer.getCheapestRoute(test.start, test.end);

      it(`The cheapest route between ${test.start} and ${test.end} should cost ${test.cost}`, () => {
        assert.equal(results.cost, test.cost);
        assert.deepEqual(results.route, test.route);
      });
    });
  });
});
