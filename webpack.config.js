const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {

    return {
      entry: './src/main.tsx',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      resolve: {
        extensions: ['.ts', '.js', '.tsx'],
      },
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            }
          },
          {
            test: /\.(svg|png)$/,
            use: 'raw-loader'
          }
        ]
      },
      plugins: [
          new HtmlWebpackPlugin({
              template: './index.html'
            })
      ]
    };
}