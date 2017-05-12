var path = require('path');
var EjsWebpackPlugin = require('ejs-webpack-plugin');
/*

there are really three main steps and three main things webpack needs to know.

1) webpack needs to know the starting point of your application, or your root JavaScript file.

2) webpack needs to know which transformations to make on your code.

3) webpack needs to know to which location it should save the new transformed code.

*/


module.exports = {
  entry: './react.js',
  output: {
  	path: path.resolve(__dirname, 'dist'),
  	filename: 'webpack-file.bundle.js'
  },
  module: {
  	rules: [
  	{ test: /\.(js)$/, use: 'babel-loader' },
  	{ test: /\.(css)$/, use: ['style-loader', 'css-loader']}
  	]
  }
}

// *HERE is an example of the Webpack syntax*
/*

module.exports = {
  entry: './app/index.js',
  module: {
    rules: [
      { test: /\.coffee$/, use: "coffee-loader" }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  }
}




*/