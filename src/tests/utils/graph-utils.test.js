const { assert } = require('chai');
const GraphUtils = require('../../utils/graph-utils');

describe('graph-utils.js tests', () => {
  describe('getClosestNode()', () => {
    const testCases = [
      // Positive tests
      { distances: { A: 3, B: 1, C: 5 }, visited: [], result: 'B' },
      { distances: { A: 3, B: 1, C: 5 }, visited: ['B'], result: 'A' },
      // "Negative" tests
      { distances: { A: 3, B: 1, C: 5 }, visited: ['A', 'B', 'C'], result: null },
      { distances: {}, visited: [], result: null },
    ];

    testCases.forEach((test) => {
      it(`The closest node should be ${test.result}`, () => {
        assert.equal(GraphUtils.getClosestNode(test.distances, test.visited), test.result);
      });
    });
  });

  describe('getCheapestRoute()', () => {
    const testCases = [
      // Positive tests
      {
        parents: {
          A: 'E', B: 'E', C: 'A', D: 'F', E: 'B', F: 'C',
        },
        start: 'E',
        end: 'D',
        result: ['E', 'A', 'C', 'F', 'D'],
      },
      // Negative tests
      {
        parents: { B: 'A', C: 'A' }, start: 'A', end: 'D', result: null,
      },
      {
        parents: {}, start: 'A', end: 'D', result: null,
      },
    ];

    testCases.forEach((test) => {
      it(`The cheapest route from ${test.start} to ${test.end} should be ${test.result}`, () => {
        assert.deepEqual(
          GraphUtils.getCheapestRoute(test.parents, test.start, test.end),
          test.result,
        );
      });
    });
  });
});
