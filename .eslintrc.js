module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: [
    "airbnb",
    "standard",
  ],
  parser: "babel-eslint",
  parserOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018,
      sourceType: "module"
    },
  },
  plugins: [
    "react",
    "jsx-a11y"
  ],
  rules: {
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "no-unused-vars": [
      1
    ],
    'prefer-template': 0,
    'prefer-destructuring': 0,
    "prefer-const": 0,
    "global-require": 0,
    "linebreak-style": 0,
    'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }],
    "no-return-assign": 0,
    "no-restricted-syntax": 0,
    "no-param-reassign": 0,
    "react/destructuring-assignment": 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-no-undef': 0, // 本项目自动引入React
    "react/self-closing-comp": 0,
    "react/prop-types": 0,
    "react/no-string-refs": 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': 0,
    'import/no-unresolved': [2, { ignore: ['^@/', './'] }],
    'import/no-extraneous-dependencies': 0,
    'react/jsx-filename-extension': 0
  },
  globals: {
    React: true
  }
}