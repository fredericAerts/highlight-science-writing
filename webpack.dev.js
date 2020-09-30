const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              minimize: false,
            },
          },
          { 
            loader: 'stylus-loader',
            options: {
              import: [
                path.resolve(__dirname, 'src/css/variables.styl'),
              ],
            },
          },
        ],
      },
    ]
  },
  plugins: []
});