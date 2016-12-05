'use strict';

import gulp     from 'gulp';
import webpack  from 'webpack';
import path     from 'path';
import gutil    from 'gulp-util';
import serve    from 'browser-sync';
import del      from 'del';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddelware from 'webpack-hot-middleware';
import colorsSupported      from 'supports-color';
import historyApiFallback   from 'connect-history-api-fallback';

var Server = require('karma').Server;
let root = 'client';

// helper method for resolving paths
let resolveToAngularApp = (glob = '') => {
    return path.join(root, 'angularapp', glob); // app/{glob}
};

let resolveToComponents = (glob = '') => {
    return path.join(root, 'angularapp/components', glob); // app/components/{glob}
};

let paths = {
    ts: resolveToComponents('**/*!(.spec.js).ts'), // exclude spec files
    scss: resolveToAngularApp('**/*.scss'), // stylesheets
    html: [
        resolveToAngularApp('**/*.html'),
        path.join(root, 'index.html')
    ],
    entry: [
        path.join(__dirname, root, 'angularapp/app.ts')
    ],
    output: {
        path: root
    },
    dest: path.join(__dirname, 'www')
};

gulp.task('prod', ['clean'], (cb) => {
    const config = require('./webpack.dist.config');
    config.entry.app = paths.entry;

    webpack(config, (err, stats) => {
        if (err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: colorsSupported,
            chunks: false,
            errorDetails: true
        }));

        cb();
    });
});

gulp.task('serve', () => {
    const config = require('./webpack.dev.config');
    config.devtool = '#eval-source-map';
    config.debug = true;
    config.entry.app = [
        'webpack-hot-middleware/client?reload=true'
    ].concat(paths.entry);

    var compiler = webpack(config);
    serve({
        port: process.env.PORT || 3000,
        open: false,
        server: {
            baseDir: root
        },
        middleware: [
            historyApiFallback(),
            webpackDevMiddleware(compiler, {
                stats: {
                    colors: colorsSupported,
                    chunks: false,
                    components: false
                },
                publicPath: config.output.publicPath
            }),
            webpackHotMiddelware(compiler)
        ]
    });
});

gulp.task('watch', ['serve']);

gulp.task('clean', (cb) => {
    del([paths.dest]).then(function (paths) {
        gutil.log("[clean]", paths);
        cb();
    })
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('default', ['watch']);
