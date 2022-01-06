const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {

    return {
      entry: './src/main.ts',
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
      },
      resolve: {
        extensions: ['.ts', '.js'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
              loader: 'ts-loader',
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