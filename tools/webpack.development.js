const { join } = require('path');
const webpack = require('webpack');

const PATH = {
  src: join(__dirname, '..', 'src'),
  postcssConfig: join(__dirname, 'postcss.config.js'),
};

module.exports = {
  mode: 'development',
  context: PATH.src,
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    './index.js',
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'eval',
  watch: true,
  watchOptions: {
    aggregateTimeout: 100,
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
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
