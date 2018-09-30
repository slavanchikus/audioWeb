import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

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
    new WebpackPwaManifest({
      name: 'Black Chat',
      short_name: 'Black Chat',
      display: 'standalone',
      description: 'Online music',
      background_color: '#0f0f0f',
      theme_color: '#0f0f0f',
      fingerprints: false,
      crossorigin: 'use-credentials',
      start_url: '/',
      icons: [
        {
          src: path.resolve(__dirname, 'build/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512]
        },
      ]
    }),
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: 'build/index.htm',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    })
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
