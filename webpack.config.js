var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  entry: {},
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'babel!ts-loader'
      },
      {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel'},
      {test: /\.html$/, loader: 'ngtemplate?relativeTo=' + path.resolve(__dirname, './client/') + '!html'},
      {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader?name=fonts/[name].[ext]'},
      {test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=img/[name].[ext]?[hash]"},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass')},
      {test: /\.css$/, loader: 'style!css'}
    ]
  },
  plugins: [
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      hash: true
    }),

    new ExtractTextPlugin("[name].css", {
      allChunks: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'client')) === -1;
      }
    })
  ]
};
