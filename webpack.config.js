const webpack = require('webpack');

module.exports = {
  entry: './javascript/main.js',
  output: {
    path: './',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      test: [/\.jsx?$/, /\.js?$/],
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
