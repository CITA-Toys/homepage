const path = require('path')

const _root = process.cwd()

const root = (filepath) => {
  return path.resolve(_root, filepath)
}

const outpath = root('source/javascripts')

outpath.sub = (filepath) => {
  return resolve(outpath + filepath)
}

module.exports = {
  outpath,
  root,
}
