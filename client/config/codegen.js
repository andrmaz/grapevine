module.exports = {
  schema: ['graphql-schema.json'],
  documents: ['./src/api/*.graphql'],
  overwrite: true,
  generates: {
    './__generated__/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        apolloReactHooksImportFrom: '@apollo/client',
        pureMagicComment: true,
        useTypeImports: true,
      },
    },
  },
}
