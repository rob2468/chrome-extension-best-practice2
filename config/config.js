module.exports = {
  pagesPath: {
    popup: {
      html: 'src/pages/popup/index.ejs',
      entry: 'src/pages/popup',
    },
    plugins: {
      entry: 'src/plugins/plugins.ts',
    },
  },

  baseScript: {
    background: {
      entry: 'src/base/background',
    },
    contentScript: {
      entry: 'src/base/contentScript',
    },
  },

  fileExtra: {
    js: [
      '../libs/react.production.min.js',
      '../libs/react-dom.production.min.js',
    ],
    css: [],
  },
};
