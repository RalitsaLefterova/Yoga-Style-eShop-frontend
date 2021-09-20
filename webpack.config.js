const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let DIST_DIR = path.resolve(__dirname, "build");

module.exports = {
  entry: './src/index.js',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    // contentBase: DIST_DIR,
    open: true,
    hot: true,
    port: 3000,
    historyApiFallback: true
  },
  devtool: "source-map",
  resolve: {
    extensions: [".jsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|scss)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'url-loader',
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: './src/index.html' 
    }),
  ],
};