'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _exorcist = require('exorcist');

var _exorcist2 = _interopRequireDefault(_exorcist);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var _babelify = require('babelify');

var _babelify2 = _interopRequireDefault(_babelify);

var _watchify = require('watchify');

var _watchify2 = _interopRequireDefault(_watchify);

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _gulpSass = require('gulp-sass');

var _gulpSass2 = _interopRequireDefault(_gulpSass);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

var _gulpMinifyCss = require('gulp-minify-css');

var _gulpMinifyCss2 = _interopRequireDefault(_gulpMinifyCss);

var _gulpRev = require('gulp-rev');

var _gulpRev2 = _interopRequireDefault(_gulpRev);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _eslintTask = require('./eslintTask');

var _eslintTask2 = _interopRequireDefault(_eslintTask);

_browserSync2['default'].create();

exports['default'] = function (gulp, workingDir) {
  (0, _eslintTask2['default'])(gulp, './app/src/**/*.{js,jsx}');

  var runSequence = _runSequence2['default'].use(gulp);

  var webPort = '3000';
  var linkModules = [];

  process.argv.forEach(function (val, index) {
    if (val == '--link') {
      linkModules.push(process.argv[index + 1].split(':'));
    } else if (val == '-p') {
      webPort = process.argv[index + 1];
    }
  });

  function transforms(bundler) {
    bundler.transform(_babelify2['default'].configure({
      sourceMapRelative: './app/src',
      optional: ['runtime', 'es7.objectRestSpread'],
      ignore: ['node_modules/', 'bower_components/']
    }));
  }

  function watchifyBundler() {
    _watchify2['default'].args.debug = true;
    var bundler = (0, _watchify2['default'])((0, _browserify2['default'])('./app/src/main.js', _watchify2['default'].args));
    transforms(bundler);

    return bundler;
  }

  function browserifyBundler() {
    var bundler = (0, _browserify2['default'])('./app/src/main.js', { debug: true });
    transforms(bundler);

    return bundler;
  }

  function runBrowserSync(cb) {
    if (!cb) {
      cb = function () {};
    }

    _browserSync2['default'].init({
      server: "./app",
      port: webPort,
      ghostMode: false,
      open: false
    }, cb);
  }

  gulp.task('sass', function () {
    return gulp.src("./app/assets/sass/**/*.scss").pipe((0, _gulpSass2['default'])()).pipe(gulp.dest("./app/dist")).pipe(_browserSync2['default'].stream());
  });

  gulp.task('watchify', function () {
    var bundler = watchifyBundler();

    function bundle() {
      _gulpUtil2['default'].log("bundling...");

      return bundler.bundle().on('error', function (err) {
        _gulpUtil2['default'].log(err.message);
        _browserSync2['default'].notify("Browserify Error!");
        this.emit("end");
      }).pipe((0, _exorcist2['default'])('./app/dist/app.js.map')).pipe((0, _vinylSourceStream2['default'])('app.js')).pipe(gulp.dest('./app/dist')).pipe(_browserSync2['default'].stream({ once: true }));
    }

    bundler.on('update', bundle);

    return bundle();
  });

  gulp.task('browserify', function () {
    var bundler = browserifyBundler();

    _gulpUtil2['default'].log("bundling...");

    return bundler.bundle().on('error', function (err) {
      _gulpUtil2['default'].log(err.message);
      _browserSync2['default'].notify("Browserify Error!");
      this.emit("end");
    }).pipe((0, _exorcist2['default'])('./app/dist/app.js.map')).pipe((0, _vinylSourceStream2['default'])('app.js')).pipe(gulp.dest('./app/dist'));
  });

  gulp.task('default', function (cb) {
    if (linkModules.length > 0) {
      try {
        linkModules.forEach(function (val, index) {
          if (val.length !== 2) {
            throw 'Incorrect --link format. Should be <module-path>:<module-name> e.g. --link ../cirrus.js-lib:cirrus';
          }

          if (!_fs2['default'].existsSync(val[0])) {
            throw '--link module path ' + val[0] + ' doesn\'t exist';
          }

          if (!_fs2['default'].existsSync(workingDir + '/node_modules')) {
            _fs2['default'].mkdirSync(workingDir + '/node_modules');
          }

          var nodeModulePath = workingDir + '/node_modules/' + val[1];

          if (_fs2['default'].existsSync(nodeModulePath)) {
            var statModule = _fs2['default'].lstatSync(nodeModulePath);

            if (!statModule.isSymbolicLink()) {
              _utils2['default'].deleteFolderRecursive(nodeModulePath);
            }
          }

          if (!_fs2['default'].existsSync(nodeModulePath)) {
            _fs2['default'].symlinkSync(_path2['default'].resolve(val[0]), nodeModulePath, 'dir');
          }

          //react
          var reactModule = _path2['default'].resolve(val[0]) + '/node_modules/react';

          if (_fs2['default'].existsSync(reactModule)) {
            var statReact = _fs2['default'].lstatSync(reactModule);

            if (!statReact.isSymbolicLink()) {
              _utils2['default'].deleteFolderRecursive(reactModule);
              _fs2['default'].symlinkSync(workingDir + '/node_modules/react', reactModule, 'dir');
            }
          }
        });
      } catch (e) {
        _utils2['default'].logError(e);
        return;
      }
    }

    runSequence(['watchify', 'sass'], function () {
      runBrowserSync();

      gulp.watch("./app/assets/sass/**/*.scss", ['sass']);
      gulp.watch("./app/*.html").on('change', _browserSync2['default'].reload);
      gulp.watch("./app/src/**/*.{js,jsx}", ['lint']);

      cb();
    });
  });

  gulp.task('run', function () {
    runBrowserSync();
  });

  gulp.task('uglify', function () {
    return gulp.src('./app/dist/**/*.js').pipe((0, _gulpUglify2['default'])()).pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('minifyCss', function () {
    return gulp.src('./app/dist/**/*.css').pipe((0, _gulpMinifyCss2['default'])()).pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('rev', function () {
    return gulp.src('./app/dist/**/*.{css,js}').pipe((0, _gulpRev2['default'])()).pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('build', function (cb) {
    runSequence(['browserify', 'sass'], ['minifyCss'], 'rev', function () {
      cb();
    });
  });

  gulp.task('attach', function (cb) {
    _utils2['default'].runContainer('nginx', 'php-fpm', ['-v ' + workingDir + ':/var/www/html', '-v ' + workingDir + '/docker/nginx/nginx:/usr/local/sbin/nginx', '-v ' + workingDir + '/docker/nginx/default.conf:/etc/nginx/conf.d/tmp/default.conf', '-e APPLICATION_ENV=latest', '-p 3000:80', '-t', '-i'], '/bin/bash', cb);
  });
};

;
module.exports = exports['default'];