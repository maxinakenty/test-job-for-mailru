const { join } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const PATH = {
  src: join(__dirname, '..', 'src'),
};

module.exports = {
  resolve: {
    extensions: ['.js', '.css'],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Index',
      template: `${PATH.src}/index.html`,
      chunks: ['common', 'home'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Mobile Controller',
      template: `${PATH.src}/mobile.html`,
      chunks: ['common', 'mobile'],
      filename: 'mobile.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
