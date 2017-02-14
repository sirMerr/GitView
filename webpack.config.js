module.exports = {
	entry: {
		app: './js/app.js',
		MainController: './js/MainController.js'
	},
	output: {
		path: './build/',
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};
