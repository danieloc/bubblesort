var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'source-map',
  entry: [
    './app/main'
  ],
  output: {
    path: path.join(__dirname, 'public', 'js' ),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [{
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }]
          ]
        }
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '/images/.[hash].[ext]',
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },

      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
}
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          screw_ie8: true,
          warnings: false
        }
      })
  );
}

module.exports = config;
