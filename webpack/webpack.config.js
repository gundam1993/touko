'use strict'

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    path.join(__dirname, '../adminApp/main.js')
  ],
  output: {
    path: path.join(__dirname, '../adminAppDist/'),
    filename: '[name].js',
    publicPath: '/admin'
  },
  mode: 'production',

  plugins: [
    new HtmlWebpackPlugin({
      template: 'adminApp/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: false
    // })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [['env', {
            'targets': {
              'chrome': '60'
            }
          }], 'react', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              module: false
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  }
}
