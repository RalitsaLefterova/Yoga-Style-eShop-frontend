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
    static: './',
    open: true,
    hot: true,
    port: process.env.PORT || 3000,
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
        use: ['babel-loader']
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
        use: ['url-loader']
      }
    ],
  },
  mode: process.env.NODE_ENV || "development",
  plugins: [
    new HtmlWebpackPlugin({ 
      template: path.join(__dirname, "src", "index.html")
    }),
  ],
};