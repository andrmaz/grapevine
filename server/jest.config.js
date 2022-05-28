/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: ['<rootDir>/build/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/build/'],
}
