import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default () => ({
  entry: {
    app: ['babel-polyfill', './app/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'build/assets'),
    publicPath: '/assets/',
    filename: 'bundle.js',
    chunkFilename: '[id].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.module\.styl$/,
        exclude: /node_modules\/*/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[local]__[path][name]__[hash:base64:5]',
                modules: true,
                importLoaders: 2,
                sourceMap: true,
                minimize: true
              }
            },
            {
              loader: 'stylus-loader',
              options: { paths: 'apps' },
            },
          ],
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/*/,
        use: [
          {
            loader: 'babel-loader',
          }
        ],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff2?$|\.eot$|\.otf$|\.ttf$/,
        loader: 'file-loader?name=static/[hash].[ext]',
        exclude: /node_modules/
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css' }),
  ],
  devServer: {
    https: true,
    port: 8081,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    },
  }
});
