const { assert } = require('chai');
const ValidationUtils = require('../../utils/validation-utils');

describe('validation-utils.js tests', () => {
  describe('isValidArrayOfEdges()', () => {
    const testCases = [
      // Positive tests
      { edges: ['AB1', 'AC4', 'AD10'], result: true },
      // Negative tests
      { edges: ['AB1', 'AC4', 'bE3'], result: false },
      { edges: ['AB1', 'AC4', 3], result: false },
      { edges: ['AB1', 'AC4', ''], result: false },
      { edges: ['AB1', 'AC4', null], result: false },
      { edges: ['AB1', 'AC4', undefined], result: false },
      { edges: [], result: false },
      { edges: null, result: false },
      { edges: undefined, result: false },
    ];

    testCases.forEach((test) => {
      it(`${test.edges} is a valid Array of edges: ${test.result}`, () => {
        assert.equal(ValidationUtils.isValidArrayOfEdges(test.edges), test.result);
      });
    });
  });

  describe('isValidEdge()', () => {
    const testCases = [
      // Positive tests
      { edge: 'AB1', result: true },
      { edge: 'AD10', result: true },
      // Negative tests
      { edge: 'bE3', result: false },
      { edge: 'Be3', result: false },
      { edge: 'BeC', result: false },
      { edge: 'BE', result: false },
      { edge: 'BE3A', result: false },
      { edge: '', result: false },
      { edge: null, result: false },
      { edge: undefined, result: false },
    ];

    testCases.forEach((test) => {
      it(`The edge ${test.edge} is a valid edge: ${test.result}`, () => {
        assert.equal(ValidationUtils.isValidEdge(test.edge), test.result);
      });
    });
  });

  describe('isValidArrayOfNodes()', () => {
    const testCases = [
      // Positive tests
      { nodes: ['A', 'B', 'C'], result: true },
      // Negative tests
      { nodes: ['A', 'B', 'c'], result: false },
      { nodes: ['A', 'B', '3'], result: false },
      { nodes: ['A', 'B', 3], result: false },
      { nodes: ['A', 'B', ''], result: false },
      { nodes: ['A', 'B', null], result: false },
      { nodes: ['A', 'B', undefined], result: false },
      { nodes: [], result: false },
      { nodes: null, result: false },
      { nodes: undefined, result: false },
    ];

    testCases.forEach((test) => {
      it(`${test.nodes} is a valid Array of nodes: ${test.result}`, () => {
        assert.equal(ValidationUtils.isValidArrayOfNodes(test.nodes), test.result);
      });
    });
  });

  describe('isValidNode()', () => {
    const testCases = [
      // Positive tests
      { node: 'A', result: true },
      // Negative tests
      { node: 'a', result: false },
      { node: 'AA', result: false },
      { node: '', result: false },
      { node: null, result: false },
      { node: undefined, result: false },
    ];

    testCases.forEach((test) => {
      it(`The node ${test.node} is a valid node: ${test.result}`, () => {
        assert.equal(ValidationUtils.isValidNode(test.node), test.result);
      });
    });
  });

  describe('isValidParamsForGetAllPossibleRoutes()', () => {
    const testCases = [
      // Positive tests
      {
        start: 'A', end: 'B', maxStops: 4, maxCost: 5, reuseRoute: false, result: true,
      },
      // Negative tests
      {
        start: 'A', end: 'B', maxStops: Infinity, maxCost: Infinity, reuseRoute: true, result: false,
      },
      {
        start: 'a', end: 'B', maxStops: Infinity, maxCost: Infinity, reuseRoute: false, result: false,
      },
      {
        start: 'A', end: 'b', maxStops: Infinity, maxCost: Infinity, reuseRoute: false, result: false,
      },
      {
        start: 'A', end: 'B', maxStops: 0, maxCost: Infinity, reuseRoute: false, result: false,
      },
      {
        start: 'A', end: 'B', maxStops: Infinity, maxCost: 0, reuseRoute: false, result: false,
      },
      {
        result: false,
      },
    ];

    testCases.forEach((test) => {
      it(`Is valid input for getAllPossibleRoutes: ${test.result}`, () => {
        assert.equal(ValidationUtils.isValidParamsForGetAllPossibleRoutes(
          test.start, test.end, test.maxStops, test.maxCost, test.reuseRoute,
        ), test.result);
      });
    });
  });

  describe('isValidParamsForGetCheapestRoute()', () => {
    const testCases = [
      // Positive tests
      {
        start: 'A', end: 'B', result: true,
      },
      // Negative tests
      {
        start: 'a', end: 'B', result: false,
      },
      {
        start: 'A', end: 'b', result: false,
      },
      {
        start: 'A', end: 3, result: false,
      },
      {
        result: false,
      },
    ];

    testCases.forEach((test) => {
      it(`Is valid input for getCheapestRoute: ${test.result}`, () => {
        assert.equal(ValidationUtils.isValidParamsForGetCheapestRoute(
          test.start, test.end,
        ), test.result);
      });
    });
  });
});
