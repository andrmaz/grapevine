module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ['/node_modules/*', '/client/dist/*', '!.prettierrc'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    '@typescript-eslint/no-unused-vars': ['error', {ignoreRestSiblings: true}],
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      {
        allowExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
      },
    ],
  },
}
