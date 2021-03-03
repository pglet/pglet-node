module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '/unit_tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node'
};