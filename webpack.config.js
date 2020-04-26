const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: path.join(__dirname, './example/src/main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () =>
                autoprefixer({
                  browsers: ['last 2 version', '> 1%'],
                }),
            },
          },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './example/src/index.html'),
      filename: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['vue', '.js', '.jsx'],
  },
  devServer: {
    port: 8000,
  },
};
