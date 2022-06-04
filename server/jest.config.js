/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
  moduleDirectories: ['node_modules', 'mocks', __dirname],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
    '^mocks/(.*)$': '<rootDir>/mocks/$1',
  },
}
