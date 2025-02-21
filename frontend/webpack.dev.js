const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    static: [
      {
        directory: __dirname + '/public',
        publicPath: '/',
      },
      {
        directory: __dirname + '/dist',
        publicPath: '/',
      },
    ],
    compress: true,
    port: 3000,
    open: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
});
