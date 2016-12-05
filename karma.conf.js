var webpack = require('webpack');
var path = require('path');

module.exports = function (config) {
  config.set({
    // base path used to resolve all patterns
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files/patterns to load in the browser
    files: [{pattern: 'spec.bundle.js', watched: false}],

    // files to exclude
    exclude: [],

    plugins: [
      require('karma-jasmine'),
      require('karma-coverage'),
      require('karma-chrome-launcher'),
      require('karma-phantomjs-launcher'),
      require("karma-sourcemap-loader"),
      require("karma-mocha-reporter"),
      require("karma-junit-reporter"),
      require("karma-webpack"),
      require("karma-teamcity-reporter")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {'spec.bundle.js': ['webpack', 'sourcemap']},

    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
      },
      module: {
        loaders: [
          {test: /\.ts$/, loader: 'babel!ts-loader'},
          {test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'babel'},
          {test: /\.scss$/, loader: 'style!css!sass'},
          {test: /\.css$/, loader: 'style!css'},
          {test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=\.]+)?$/, loader: 'file-loader?name=fonts/[name].[ext]'},
          {test: /\.(jpe?g|png|gif)$/i, loader: "file-loader?name=img/[name].[ext]?[hash]"}
        ]
      }
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['mocha', 'dots', 'junit'],
    junitReporter: {
      outputDir :'testresults',
      outputFile: 'test-results.xml',
      useBrowserName :'false'
    },

    /*coverageReporter: {
      dir: 'coverage/',
      reporters: [
        {type: 'text-summary'},
        {type: 'json'},
        {type: 'html'},
        {type: 'cobertura'}
      ]
    },*/

    port: 9876,

    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // toggle whether to watch files and rerun tests upon incurring changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    // if true, Karma runs tests once and exits
    singleRun: true

  });
};
