module.exports = {
  extends: ['airbnb', 'plugin:jsx-a11y/recommended'],
  rules: {
    'no-plusplus': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'react/jsx-one-expression-per-line': ['warn', { allow: 'single-child' }],
    'react/prop-types': 'off',
    'import/extensions': ['disabled'],
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': [
      'error',
      'before',
      {
        overrides: { '+': 'after' },
      },
    ],
    'object-curly-newline': ['error', { multiline: true }],
    'no-unused-expressions': ['error', { allowTernary: true }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*config.js', '*setupTests.js'],
      },
    ],
  },
  env: {
    browser: true,
    node: true,
  },
  plugins: ['jsx-a11y'],
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
        mocha: true,
      },
    },
  ],
};
