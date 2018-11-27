const common = require('./webpack.common.js')

const dev = {
  devtool: 'inline-source-map',
}

module.exports = {
  ...common,
  ...dev,
}
