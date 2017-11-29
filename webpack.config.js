var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require("path");

module.exports = {
  devtool: debug ? "inline-sourcemap" : null,
  entry: {
  	main: path.join(__dirname, "asset", "js", 'main')
  },
  output: {
  	path: path.join(__dirname, "asset", "js"),
    filename: "[name].bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};