module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'no-param-reassign': 1,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/no-empty-function': 1,
    'spaced-comment': 'error',
    quotes: ['error', 'single'],
    '@typescript-eslint/restrict-template-expressions': 1,
  },

  overrides: [
    // Configuration for TypeScript files
    {
      files: ['**/*.ts', '**/*.tsx'],
      plugins: ['@typescript-eslint', 'unused-imports', 'spellcheck'],
      extends: ['airbnb-typescript', 'plugin:prettier/recommended'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            endOfLine: 'auto',
          },
        ],
        'react/destructuring-assignment': 'off', // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
        'react/require-default-props': 'off', // Allow non-defined react props as undefined
        'react/jsx-props-no-spreading': 'off', // _app.tsx uses spread operator and also, react-hook-form
        'react-hooks/exhaustive-deps': 'off', // Incorrectly report needed dependency with Next.js router
        '@typescript-eslint/comma-dangle': 'off', // Avoid conflict rule between Eslint and Prettier
        '@typescript-eslint/consistent-type-imports': 'error', // Ensure `import type` is used when it's necessary
        'no-restricted-syntax': [
          'error',
          'ForInStatement',
          'LabeledStatement',
          'WithStatement',
        ], // Overrides Airbnb configuration and enable no-restricted-syntax
        'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'spellcheck/spell-checker': [
          'error',
          {
            comments: true,
            strings: true,
            identifiers: true,
            lang: 'en_US', // Set the language
            skipWords: ['some', 'specific', 'words'], // Add words to skip
            skipIfMatch: ['regex', 'vite', 'ai', 'pathname'], // Specify regex patterns to skip
            minLength: 3, // Minimum word length to check
          },
        ],
        'react/jsx-filename-extension': [0],
        'import/extensions': 'off',
      },
    },
  ],
};
