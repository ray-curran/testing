const path = require('path');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// For testing purposes the default flavor is MORAN
const config = require('./config/g2.js');


module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildStart: [
        'mkdir -p static',
        'echo _theme.scss copied!',
        'sass src/assets/css/style.scss src/assets/css/style.css',
        'echo style.scss compiled!'
      ],
      onBuildEnd: ['echo Webpack End'] }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        RESOURCES: JSON.stringify(config.resources),
        STAGE: JSON.stringify('dev')
      }
    }),
    new HtmlWebpackPlugin({
      title: config.title,
      filename: '../index.html',
      template: 'config/indexTemplate.ejs'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: [path.join(__dirname, 'src')]
      },
      {
        test: /.(woff(2)?|eot|ttf)(\?[a-z0-9=\.]+)?$/,
        loader: 'url-loader?limit=100000',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: path.join(__dirname, 'src')
      },
      { test: /\.svg$/,
       loader: 'babel?presets[]=es2015,presets[]=react!svg-react' 
      }
    ]
  }
};
