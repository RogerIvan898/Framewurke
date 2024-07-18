module.exports = function (api) {
  api.cache(true)

  const presets = [
    "@babel/preset-react",
    ["@babel/preset-env", {
      targets: {
        esmodules: true
      },
      modules: false
    }],
  ]

  const plugins = [
    "@babel/plugin-syntax-jsx",
    ["@babel/plugin-transform-react-jsx", { "pragma": "VDOM_CREATE_ELEMENT.createVElement" }],
    ['babel-plugin-auto-import', {
      declarations: [
        { default: 'VDOM_CREATE_ELEMENT', path: './src/virtual-dom/create-elements.js' },
      ],
    }]
  ]

  return {
    presets,
    plugins
  };
};
