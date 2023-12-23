const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.base');
const { pagesPath, baseScript, fileExtra } = require('./config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, '../', './src'),
    historyApiFallback: true,
  },
  entry: {
    ...Object.keys(pagesPath).reduce((prev, curr) => {
      if (pagesPath[curr].entry.env === 'development') {
        prev[curr] = path.resolve(
          __dirname,
          '../',
          pagesPath[curr].entry.value
        );
      }
      return prev;
    }, {}),
    ...Object.keys(baseScript).reduce((prev, curr) => {
      if (baseScript[curr].entry.env === 'development') {
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
    path: path.resolve(__dirname, '../', 'dev-dist'),
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devServer: {
    host: '0.0.0.0',
    watchFiles: ['src/**/*', 'dev/**/*'],
    client: {
      logging: 'info',
      overlay: true,
      progress: true,
    },
    hot: true,
    static: {
      directory: path.join(__dirname, '../', 'dev-dist'),
    },
    open: ['/webpack-dev-server'],
    compress: false,
  },
  plugins: [
    ...Object.keys(pagesPath)
      .map(
        (p) =>
          pagesPath[p].html.env === 'development' &&
          new HtmlWebpackPlugin({
            filename: 'html/' + p + '.html',
            template: pagesPath[p].html.value,
            chunks: [p],
            templateParameters: {
              ...fileExtra,
            },
          })
      )
      .filter((i) => !!i),
  ],
});
