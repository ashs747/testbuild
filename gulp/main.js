const browserSync = require('browser-sync');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const watchify = require('watchify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
const fs = require('fs');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const path = require('path');
const babel = require('gulp-babel');
var gutil = require('gulp-util');

browserSync.create();
var babelOptions = {
  "compact": true,
  "sourceMaps": true,
  "global": false,
  "presets": ["react", "es2015", "stage-2", "stage-0"],
  "sourceMapRelative": './app/src',
  "ignore": [
    'node_modules/',
    'bower_components/'
  ]
}

//  "ignore": /underscore/, "plugins": ["transform-es3-member-expression-literals", "transform-es3-property-literals"]
var babelPatterns = ['!./app/src/**/__tests__/**/*.js', './app/src/**/*.js', './app/src/**/*.jsx'];
var watchifyOpts = {
  entries: ['./app/src/main.js'],
  insertGlobals: false,
  debug: false,
  plugin: [watchify],
  transform: ["browserify-shim", ["babelify", babelOptions]]
};

var buildOnceOpts = {
  entries: ['./app/src/main.js'],
  insertGlobals: true,
  debug: true,
  transform: ["browserify-shim", ["babelify", babelOptions]]
};

function watchifyReloadWrapper(cb){
  return browserify(watchifyOpts)
    .on('error', function(er) {
      gutil.log(gutil.colors.red('Browserify'), 'Error: ' + gutil.colors.green(er));
      process.exit();
    })
    .on('time', function(time){
      gutil.log(gutil.colors.green('Browserify'), 'Built ' + gutil.colors.red('in ' + time + ' ms'));
      cb();
    })
    .on('log', function(msg){
      gutil.log(gutil.colors.green('Browserify'), 'Log ' + gutil.colors.red(msg));
      cb();
    })
    .on('update', function(path){
      gutil.log(gutil.colors.green('Browserify'), 'Update ' + gutil.colors.red('in ' + path));
      cb();
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/dist'));
}

module.exports = function(gulp) {
  gulp.task('bundlejs', ['eslint'], function() {
    return browserify(buildOnceOpts)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/dist'))
  });

  gulp.task('watchJSBuild', ['eslint'], watchifyReloadWrapper);

  gulp.task('babeljs', ['eslint'], function() {
    return gulp.src(babelPatterns)
      .pipe(cache('babel'))
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ["react", "es2015", "stage-2", "stage-0"]
      }))
      .pipe(concat('bundle.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./app/dist'));
  });

  gulp.task('bundlesass', function() {
    return gulp.src('./app/assets/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['bundlesass']);
  });

  gulp.task('bundlejs:watch', function() {
    gulp.watch(babelPatterns, ['bundlejs'])
  });

  gulp.task('eslint', function() {
    return gulp.src(babelPatterns)
    .pipe(cache('eslint'))
    // Only uncached and changed files past this point
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.result(function(result) {
      if (result.warningCount > 0 || result.errorCount > 0) {
        // If a file has errors/warnings remove uncache it
        delete cache.caches.eslint[path.resolve(result.filePath)];
      }
    }));
  });
  gulp.task('default', ['bundlejs', 'bundlesass'], function() {
    browserSync.init({
      server: {
        baseDir: "./app"
      }
    });
    gulp.watch('./sass/**/*.scss', ['buildCssReloadBrowser']);
    gulp.watch(babelPatterns, ['eslint']);
    watchifyReloadWrapper(function() {
      browserSync.reload();
    });
  });

  gulp.task('buildJsReloadBrowser', ['eslint'], function(){
    watchifyReloadWrapper(browserSync.reload);
  });

  gulp.task('buildCssReloadBrowser', ['bundlesass'], function(){
    browserSync.reload();
  });

  gulp.task('build', ['bundlesass', 'bundlejs']);
};
