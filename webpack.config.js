const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [
  {
    devtool: 'eval',
    entry: [
      `${__dirname}/src/index.js`,
      `${__dirname}/src/style.css`,
      `${__dirname}/node_modules/handsontable/dist/handsontable.full.min.css`,
    ],
    output: {
      path: `${__dirname}/dist`,
      filename: 'bundle.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['env'],
          },
        },
        {
          test: /\.css$/,
          loader: 'style-loader!css-loader',
        },
      ],
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: `${__dirname}/src/index.html`,
        to: `${__dirname}/dist/index.html`,
      }]),
    ],
    stats: {
      colors: true,
    },
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/,
    },
  },
];
