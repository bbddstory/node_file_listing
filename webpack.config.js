const buildPath = 'build';
const path = require('path');

module.exports = {
  entry: {
    list_upload: [
      // 'xmlhttprequest',
      // 'firebase',
      './src/firebase_conn.js'
    ]
  },
  // Enable sourcemaps for debugging webpack's output.
  // devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".js", ".json"]
  },
  output: {
    path: path.join(__dirname, buildPath), // needs to be an absolute path
    // publicPath: '../',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      // {
      //   test: /\.tsx?$/,
      //   loader: "awesome-typescript-loader"
      // },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // {
      //   enforce: "pre",
      //   test: /\.js$/,
      //   loader: "source-map-loader"
      // },
      {
        test: /\.(js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          presets: ['env']
        }
      }
    ]
  },
  plugins: [
  ]
}