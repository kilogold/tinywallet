// jest.config.js
module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    testMatch: ['<rootDir>/tests/**/*.(ts|tsx|js)'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    setupFiles: ['<rootDir>/jest.setup.js'],
    testTimeout: 10000,
};