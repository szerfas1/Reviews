const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    index: './client/src/index.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-react', '@babel/preset-env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, 'client/dist/'),
    publicPath: 'client/dist/',
    filename: '[name].bundle.js',
  },
  plugins: [new BundleAnalyzerPlugin({ analyzerMode: 'static' })],
  optimization: {
    splitChunks: { chunks: 'all' },
  },
};
