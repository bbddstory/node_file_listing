const buildPath = 'build';
const path = require('path');

module.exports = {
  entry: {
    webpack_compile: [
      './src/dir_processing.js'
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  output: {
    path: path.join(__dirname, buildPath), // needs to be an absolute path
    filename: '[name].bundle.js'
  },
  module: {
    rules: [{
      test: /\.(js)$/,
      loader: 'babel-loader',
      exclude: /(node_modules)/,
      query: {
        presets: ['env']
      }
    }]
  },
  plugins: []
}