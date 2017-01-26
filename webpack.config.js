const webpack = require('webpack');

module.exports = {
  entry: './javascript/main.js',
  output: {
    path: 'javascript',
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
    }],
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
