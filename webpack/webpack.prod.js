const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./webpack.common.js')

const prod = {
  mode: 'production',
}

module.exports = {
  ...common,
  ...prod,
}
