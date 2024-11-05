// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['**/__tests__/**/*.test.ts'], // Only run tests in the __tests__ directory
    testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore node_modules and dist directories
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};