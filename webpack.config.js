'use strict';

var path=require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	cache: true,
	context: path.join(__dirname,  'public'),

	entry  : [
		'bootstrap-sass!./bootstrap-sass.config.js',
		'./app.js'
	],
	output : {
		path    : path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	module : {
		loaders: [
			// **IMPORTANT** This is needed so that each bootstrap js file required by
			// bootstrap-sass-loader has access to the jQuery object
			{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
			{ test: /\.scss$/, loader: "style!css!sass?outputStyle=expanded" },

			// ToDo: custom path and source map option did not work
			//{ test: /\.scss$/,
			//  loader: "style!css!sass?outputStyle=expanded&sourceMap=true&includePaths[]=" + bootstrapPathStylesheets },

			// Needed for the css-loader when [bootstrap-sass-loader](https://github.com/justin808/bootstrap-sass-loader)
			// loads bootstrap's css.
			{ test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
			{ test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/octet-stream" },
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=image/svg+xml" }
		]
	},
	plugins: [
		new ExtractTextPlugin("bootstrap-and-customizations.css")
	]
};
