const browserSync = require('browser-sync');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const watchify = require('watchify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
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
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify],
  transform: ["browserify-shim", ["babelify", babelOptions]]
};

var uglifyifyOptions = {
  global: true
};

var buildDevOptions = {
  entries: ['./app/src/main.js'],
  insertGlobals: true,
  debug: true,
  transform: ["browserify-shim", ["babelify", babelOptions]]
};

var buildProductionOpts = {
  entries: ['./app/src/main.js'],
  insertGlobals: false,
  debug: false,
  transform: ["browserify-shim", ["babelify", babelOptions], ["uglifyify", uglifyifyOptions]]
};

function watchifyReloadWrapper(cb){
  var b = browserify(watchifyOpts);

  b.on('error', function(er) {
    gutil.log(gutil.colors.red('Browserify'), 'Error: ' + gutil.colors.green(er));
    process.exit();
  })
  .on('time', function(time){
    gutil.log(gutil.colors.green('Browserify'), 'Built ' + gutil.colors.red('in ' + time + ' ms'));
  })
  .on('log', function(msg){
    gutil.log(gutil.colors.green('Browserify'), 'Log ' + gutil.colors.red(msg));
    if (msg.indexOf('written') > -1) {
      cb();
    }
  })
  .on('update', function(path){
    gutil.log(gutil.colors.green('Browserify'), 'Update ' + gutil.colors.red('in ' + path));
    b.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./app/dist'))
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./app/dist'));

  return b;
}

module.exports = function(gulp) {
  gulp.task('bundlejs', ['eslint'], function() {
    return browserify(buildDevOptions)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/dist'))
  });

  gulp.task('bundlejslive', ['eslint'], function() {
    return browserify(buildDevOptions)
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
      .pipe(sass())
      .pipe(gulp.dest('./app/dist/'))
      .pipe(browserSync.stream());
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
    gulp.watch('./app/assets/sass/**/*.scss', ['bundlesass']);
    gulp.watch(babelPatterns, ['eslint']);
    watchifyReloadWrapper(function() {
      browserSync.reload();
    });
  });

  gulp.task('buildJsReloadBrowser', ['eslint'], function(){
    watchifyReloadWrapper(browserSync.reload);
  });

  gulp.task('build', ['bundlesass', 'bundlejslive']);

  gulp.task('browsersync', function() {
    browserSync.init({
      server: {
        baseDir: "./app"
      }
    })
  });
};
