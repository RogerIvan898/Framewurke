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
    ["@babel/plugin-transform-react-jsx", { "pragma": "VDOM.createElement" }],
    ['babel-plugin-auto-import', {
      declarations: [
        {
          default: 'VDOM',
          path: './src/virtual-dom'
        },
      ],
    }]
  ]

  return {
    presets,
    plugins
  }
}
