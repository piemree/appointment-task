module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "no-unused-expressions": "error",
    "no-unused-vars": "error",
    "no-unsafe-optional-chaining": "error",
  },
};
