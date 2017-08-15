module.exports = {
  entry: [
    './src/index.js'
  ],
  devtool: 'eval',
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-2', 'react']
      },
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=fonts/[name].[ext]'
    },
    {
      test: /\.jpg$/,
      loader: 'file-loader?name=img/[name].[ext]'
    }]
  },
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: __dirname + '/docs',
    publicPath: '/',
    filename: 'bundle.js'
  }
};
