/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/config/jest-setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'utils', '<rootDir>/'],
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json', 'node'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^/(.*)$': '<rootDir>/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  preset: 'ts-jest/presets/js-with-ts-esm',
  transform: {'\\.[jt]sx?$': 'ts-jest'},
}
