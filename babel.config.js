module.exports = function (api) {
  api.cache(true)

  const presets = [
    ["@babel/preset-env", {
      targets: {
        esmodules: true
      },
      modules: false
    }],
    "@babel/preset-react"
  ]

  const plugins = [
    "./babel-plugin-jsx-to-js.js",
    ['babel-plugin-auto-import', {
      declarations: [
        {
          default: 'VDOM',
          path: './src/virtual-dom'
        },
      ],
    }],
  ]

  return {
    presets,
    plugins
  }
}
