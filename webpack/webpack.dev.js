const common = require('./webpack.common.js')

const dev = {
  mode: 'development',
  devtool: 'inline-source-map',
}

module.exports = {
  ...common,
  ...dev,
}
