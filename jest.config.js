/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  // testEnvironment: 'node',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!my-module)"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
};