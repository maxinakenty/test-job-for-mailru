// const os = require('os');
const { join } = require('path');
const webpack = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const ExtractCssPlugin = require('mini-css-extract-plugin');

const PATH = {
  src: join(__dirname, '..', 'src'),
  public: join(__dirname, '..', 'public'),
  postcssConfig: join(__dirname, 'postcss.config.js'),
};

module.exports = {
  mode: 'production',
  context: PATH.src,
  entry: {
    common: ['babel-polyfill', './js/common'],
    home: './index.js',
    mobile: './mobile.js',
  },
  output: {
    path: PATH.public,
    publicPath: '/',
    filename: 'js/[name].[chunkhash].js',
  },
  performance: {
    hints: false,
  },
  watch: false,
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production'),
    }),
    new AssetsWebpackPlugin({
      filename: 'assets.json',
      path: PATH.public,
    }),
    new ExtractCssPlugin({
      filename: 'css/common.[contenthash].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              minimize: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: false,
              config: {
                path: PATH.postcssConfig,
              },
            },
          },
        ],
      },
    ],
  },
};
