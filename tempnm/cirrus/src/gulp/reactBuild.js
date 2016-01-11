import rs from 'run-sequence';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';
import exorcist from 'exorcist';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import browserSync from 'browser-sync';
browserSync.create();
import sass from 'gulp-sass';
import path from 'path';
import uglify from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';
import rev from 'gulp-rev';
import cirrusUtils from './utils';
import fs from 'fs';
import eslintTask from './eslintTask';

export default function(gulp, workingDir) {
  eslintTask(gulp, './app/src/**/*.{js,jsx}');

  var runSequence = rs.use(gulp);

  var webPort = '3000';
  var linkModules = [];

  process.argv.forEach(function(val, index) {
    if (val == '--link') {
      linkModules.push(process.argv[index + 1].split(':'));
    } else if (val == '-p') {
      webPort = process.argv[index + 1];
    }
  });

  function transforms(bundler) {
    bundler.transform(babelify.configure({
      sourceMapRelative: './app/src',
      optional: ['runtime', 'es7.objectRestSpread'],
      ignore: [
        'node_modules/',
        'bower_components/'
      ]
    }));
  }

  function watchifyBundler() {
    watchify.args.debug = true;
    var bundler = watchify(browserify('./app/src/main.js', watchify.args));
    transforms(bundler);

    return bundler;
  }

  function browserifyBundler() {
    var bundler = browserify('./app/src/main.js', {debug: true});
    transforms(bundler);

    return bundler;
  }

  function runBrowserSync(cb) {
    if (!cb) {
      cb = () => {};
    }

    browserSync.init({
      server: "./app",
      port: webPort,
      ghostMode: false,
      open: false
    }, cb);
  }

  gulp.task('sass', function() {
    return gulp.src("./app/assets/sass/**/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./app/dist"))
      .pipe(browserSync.stream());
  });

  gulp.task('watchify', function() {
    var bundler = watchifyBundler();

    function bundle() {
      gutil.log("bundling...");

      return bundler.bundle()
        .on('error', function(err) {
          gutil.log(err.message);
          browserSync.notify("Browserify Error!");
          this.emit("end");
        })
        .pipe(exorcist('./app/dist/app.js.map'))
        .pipe(source('app.js'))
        .pipe(gulp.dest('./app/dist'))
        .pipe(browserSync.stream({once: true}));
    }

    bundler.on('update', bundle);

    return bundle();
  });

  gulp.task('browserify', function() {
    var bundler = browserifyBundler();

    gutil.log("bundling...");

    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(err.message);
        browserSync.notify("Browserify Error!");
        this.emit("end");
      })
      .pipe(exorcist('./app/dist/app.js.map'))
      .pipe(source('app.js'))
      .pipe(gulp.dest('./app/dist'));
  });

  gulp.task('default', function(cb) {
    if (linkModules.length > 0) {
      try {
        linkModules.forEach(function(val, index) {
          if (val.length !== 2) {
            throw 'Incorrect --link format. Should be <module-path>:<module-name> e.g. --link ../cirrus.js-lib:cirrus';
          }

          if (!fs.existsSync(val[0])) {
            throw '--link module path ' + val[0] + ' doesn\'t exist';
          }

          if (!fs.existsSync(workingDir + '/node_modules')) {
            fs.mkdirSync(workingDir + '/node_modules');
          }

          var nodeModulePath = workingDir + '/node_modules/' + val[1];

          if (fs.existsSync(nodeModulePath)) {
            var statModule = fs.lstatSync(nodeModulePath);

            if (!statModule.isSymbolicLink()) {
              cirrusUtils.deleteFolderRecursive(nodeModulePath);
            }
          }

          if (!fs.existsSync(nodeModulePath)) {
            fs.symlinkSync(path.resolve(val[0]), nodeModulePath, 'dir');
          }

          //react
          var reactModule = path.resolve(val[0]) + '/node_modules/react';

          if (fs.existsSync(reactModule)) {
            var statReact = fs.lstatSync(reactModule);

            if (!statReact.isSymbolicLink()) {
              cirrusUtils.deleteFolderRecursive(reactModule);
              fs.symlinkSync(workingDir + '/node_modules/react', reactModule, 'dir');
            }
          }
        });
      } catch (e) {
        cirrusUtils.logError(e);
        return;
      }
    }

    runSequence(['watchify', 'sass'], function() {
      runBrowserSync();

      gulp.watch("./app/assets/sass/**/*.scss", ['sass']);
      gulp.watch("./app/*.html").on('change', browserSync.reload);
      gulp.watch("./app/src/**/*.{js,jsx}", ['lint']);

      cb();
    });
  });

  gulp.task('run', function() {
    runBrowserSync();
  });

  gulp.task('uglify', function() {
    return gulp.src('./app/dist/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('minifyCss', function() {
    return gulp.src('./app/dist/**/*.css')
      .pipe(minifyCss())
      .pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('rev', function() {
    return gulp.src('./app/dist/**/*.{css,js}')
      .pipe(rev())
      .pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('build', function(cb) {
    runSequence(['browserify', 'sass'], ['minifyCss'], 'rev', function() {
      cb();
    });
  });

  gulp.task('attach', function(cb) {
    cirrusUtils.runContainer('nginx', 'php-fpm', [
      '-v ' + workingDir + ':/var/www/html',
      '-v ' + workingDir + '/docker/nginx/nginx:/usr/local/sbin/nginx',
      '-v ' + workingDir + '/docker/nginx/default.conf:/etc/nginx/conf.d/tmp/default.conf',
      '-e APPLICATION_ENV=latest',
      '-p 3000:80',
      '-t',
      '-i'
    ], '/bin/bash', cb);
  });
};
