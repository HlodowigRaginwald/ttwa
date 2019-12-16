module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  plugins: [
    "react-hooks"
  ],
  extends: [
    'airbnb',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],
  }
};
