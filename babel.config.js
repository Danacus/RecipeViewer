module.exports = {
  presets: [
    // "@babel/env",
    "@babel/react",
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true}],
    ["@babel/plugin-proposal-class-properties", { "loose": true}],
    "@babel/plugin-transform-flow-strip-types",
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
