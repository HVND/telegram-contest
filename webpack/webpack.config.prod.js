const Path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  stats: 'errors-only',
  bail: true,
  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new Webpack.optimize.ModuleConcatenationPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.s?css/i,
        exclude: Path.resolve(__dirname, '../src/styles'),
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.s?css/i,
        include: Path.resolve(__dirname, '../src/styles'),
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});
