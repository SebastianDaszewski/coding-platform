export const TESTS_CASES = [
  {
    inputData: `[
  "test",
  [5, 4, 3, 2, 1],
  [5, 4, 3, 2, 1],
]`,

    expectedResult: "[2, 4, 5, 123, 1, 23, 123, 12, 31, 23, 123]",
    yourResult: "[2, 4, 5, 123, 1, 23, 123, 12, 31, 23, 123]",
    passed: false,
  },
  {
    inputData: `{
  [
    [5, 4, 3, 2, 1],
    [5, 4, 3, 2, 1],
  ],
}`,

    expectedResult: "[2, 4, 5, 123, 1, 23, 123, 12, 31, 23, 123]",
    yourResult: "[2, 4, 5, 123, 1, 23, 123, 12, 31, 23, 123]",
    passed: true,
  },
  {
    inputData: "'Programowanie jest ok",
    expectedResult: "[2, 4, 5, 123, 1, 23, 123, 12, 31, 23, 123]",
    yourResult: "[2, 4, 5, 123, 1, 23, 123, 12, 31, 23, 123]",
    passed: true,
  },
];
export const QUICK_TEST_RESULT = {
  expectedResult: "[1, '4asdas', 5, 6, 1]",
  yourResult: "[1, 4, 5, 6, 1]",
  passed: true,
};
