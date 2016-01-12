const browserSync = require('browser-sync');

const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const babelify = require('gulp-babel');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const source = require('vinyl-source-stream');
const fs = require('fs');
const eslint = require('gulp-eslint');
const cache = require('gulp-cached');
const path = require('path');

browserSync.create();

var babelPatterns = ['!./app/src/**/__tests__/**/*.js', './app/src/**/*.js', './app/src/**/*.jsx'];

module.exports = function(gulp, workingDir) {
  gulp.task('bundlejs', ['eslint'], () => {
    return browserify({
        entries: './app/src/main.js',
        debug : !gulp.env.production
      })
    .transform('babelify', {"presets": ["react", "es2015", "stage-2", "stage-0"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./app/dist'));
  });

  gulp.task('bundlesass', function() {
    return gulp.src('./app/assets/sass/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).sync().on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./app/dist/'));
  });

  gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
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

  gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });

    gulp.watch(babelPatterns, ['bundlejs'], () => {
      browserSync.reload();
    });

    gulp.watch('./sass/**/*.scss', ['sass'], () => {
      browserSync.reload();
    });
  });

};
