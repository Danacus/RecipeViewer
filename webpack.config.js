const webpack = require('webpack')
const path = require('path')

const config = {
	entry: [
		path.join(__dirname, '/app/index.js')
	],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "app"),
					path.resolve(__dirname, "node_modules/antd")
				],
				use: ['babel-loader']
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.json$/,
				use: ['json-loader']
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	target: 'node',
	externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
}

module.exports = config
