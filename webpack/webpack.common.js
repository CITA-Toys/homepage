const { outpath } = require('./pathtable')
console.log(outpath)
module.exports = {
  entry: {
    app: './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      j: 'jquery/dist/jquery.min.js',  
    }
  },
  output: {
    path: outpath,
    filename: 'bundle.js',
  },
}
