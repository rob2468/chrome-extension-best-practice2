const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const postCssPlugins = [require('autoprefixer')];

const { pagesPath, baseScript, fileExtra } = require('./config');

module.exports = {
  entry: {
    ...Object.keys(pagesPath).reduce((prev, curr) => {
      if (!!pagesPath[curr].entry.env) return prev;
      prev[curr] = path.resolve(__dirname, '../', pagesPath[curr].entry);
      return prev;
    }, {}),
    ...Object.keys(baseScript).reduce((prev, curr) => {
      if (!!baseScript[curr].entry.env) return prev;
      prev[curr] = path.resolve(__dirname, '../', baseScript[curr].entry);
      return prev;
    }, {}),
  },
  output: {
    filename: (pathData, assetInfo) => {
      if (baseScript?.[pathData.runtime]) {
        return 'baseScript/[name].js';
      }
      // 公共应用包
      if (pathData?.chunk?.name && pathData.runtime !== pathData?.chunk?.name) {
        return 'common/[name].js';
      }

      return 'plugins/[name].js';
    },
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: (resourcePath) => {
                  const blackList = [/node_modules/gi];
                  return !blackList.every((b) => b.test(resourcePath));
                },
                localIdentName: '[local]_[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: postCssPlugins,
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {},
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'static/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    ...Object.keys(pagesPath)
      .map((p) => {
        if (!pagesPath[p].html || !pagesPath[p].html.env) {
          new HtmlWebpackPlugin({
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
    new CopyWebpackPlugin({
      patterns: [{ from: 'public' }],
    }),
    new CleanWebpackPlugin(),
  ],
};
