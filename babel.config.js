module.exports = function (api) {
  api.cache(false);

  console.log(8989)

  const presets = [
    "@babel/preset-react",
    "@babel/preset-env",
  ]

  const plugins = [
    "@babel/plugin-syntax-jsx",
    ["@babel/plugin-transform-react-jsx", { "pragma": "VDOM_CREATE_ELEMENT.createVElement" }]
  ]

  return {
    presets,
    plugins
  };
};
