/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  roots: [
    "./src"
  ],
  preset: "ts-jest",
  // testEnvironment: "jsdom",
  testEnvironment: "jest-environment-jsdom",
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  transform: {
    // "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!my-module)"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: [
    //"./jest.setup.ts",
    "./globals.d.ts",
    '@testing-library/jest-dom/extend-expect'
  ],
  verbose: true,
  bail: true
};