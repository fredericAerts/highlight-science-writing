const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: [
      './src/js/index.js',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/views/components'),
      '@meta': path.resolve(__dirname, 'src/views/meta'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-loader'
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/views/index.ejs',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new CleanWebpackPlugin(['public']),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/meta',
        to: '',
      },
      {
        from: 'src/img',
        to: 'img',
      },
      {
        from: 'src/external',
        to: 'external',
      },
    ]),
  ],
  optimization: {
    minimizer: [new UglifyJSPlugin()]
  }
};
