const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnv = require('dotenv-webpack');

isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  entry: './src/index.ts',
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devServer: {
    static: './dist',
    open: true,
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      publicPath: isProduction ? '/javascript-movie-review/dist/' : '.',
    }),
    new DotEnv(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|mjs|ts)$/i,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
        },
      },
    ],
  },
};
