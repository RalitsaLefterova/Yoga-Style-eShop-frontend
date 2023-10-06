/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const webpack = require('webpack');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
// const dotenv = require('dotenv').config({ path: __dirname + '/.env' })
const Dotenv = require('dotenv-webpack')

let DIST_DIR = path.resolve(__dirname, "dist");

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    static: 'dist',
    open: true,
    hot: true,
    port: process.env.PORT || 3000,
    historyApiFallback: true
  },
  devtool: "source-map",
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        use: ["source-map-loader"],
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
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ 
      template: path.join(__dirname, "src", "index.html")
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['.tsx', '.ts', 'jsx', '.js'],
      exclude: 'node_modules'
    }),
    // new webpack.DefinePlugin({
    //   'process.env': JSON.stringify(dotenv.parsed)
    // }),
    new Dotenv({
      path: path.resolve(__dirname, '.env'),
      systemvars: true
    })
  ],
};