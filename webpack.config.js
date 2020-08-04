
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
  mode: NODE_ENV,
  entry: {
    datetime: './src/datetime/index.js',
    fetch: './src/fetch/index.js',
  },
  output: {
    path: __dirname + '/lib',
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  watch:(NODE_ENV=='development'),
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};
