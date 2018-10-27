module.exports = {
  extends: ['airbnb'],
  rules: {
    'no-plusplus': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    'import/extensions': ['disabled'],
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': ['error', 'after'],
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
