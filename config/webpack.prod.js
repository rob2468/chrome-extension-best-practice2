const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base');
const { pagesPath, baseScript, fileExtra } = require('./config');

const conf = merge(baseConfig, {
  mode: 'production',
  entry: {
    ...Object.keys(pagesPath).reduce((prev, curr) => {
      if (pagesPath[curr].entry.env === 'production') {
        prev[curr] = path.resolve(
          __dirname,
          '../',
          pagesPath[curr].entry.value
        );
      }
      return prev;
    }, {}),
    ...Object.keys(baseScript).reduce((prev, curr) => {
      if (baseScript[curr].entry.env === 'production') {
        prev[curr] = path.resolve(
          __dirname,
          '../',
          baseScript[curr].entry.value
        );
      }
      return prev;
    }, {}),
  },
  output: {
    path: path.resolve(__dirname, '../', 'dist'),
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
        },
      }),
    ],
  },
  plugins: [
    ...Object.keys(pagesPath)
      .map((p) => {
        if (pagesPath[p].html) {
          return new HtmlWebpackPlugin({
            filename: 'html/' + p + '.html',
            template: pagesPath[p].html,
            chunks: [p],
            templateParameters: {
              ...fileExtra,
            },
          });
        }
      })
      .filter((i) => !!i),
  ],
});
module.exports = conf;
