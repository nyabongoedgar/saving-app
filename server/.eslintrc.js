module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
