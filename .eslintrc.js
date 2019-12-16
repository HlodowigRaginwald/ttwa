module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    'airbnb',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
  }
};
