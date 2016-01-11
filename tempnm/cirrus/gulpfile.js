var gulp = require("gulp");
var runSequence = require('run-sequence');
var babel = require("gulp-babel");
var del = require('del');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var eslintTask = require('./gulp/eslintTask');

eslintTask(gulp, './src/**/*.{js,jsx}');

gulp.task('clean', function(cb) {
  del(['./dist/**/*'], cb);
});

gulp.task('build', function(cb) {
  return gulp.src(['./src/**/*.{js,jsx}', '!./src/**/__tests__/**'])
    .pipe(babel({
      optional: ['runtime', 'es7.objectRestSpread']
    }))
    .pipe(gulp.dest("./"));
});

gulp.task('watch', function(cb) {
  gulp.watch("./src/**/*.{js,jsx}", ['lint']);

  return gulp.src(['./src/**/*.{js,jsx}', '!./src/**/__tests__/**'])
    .pipe(watch('./src/**/*.{js,jsx}').on('change', function() {
      gutil.log('Build');
    }))
    .pipe(babel({
      optional: ['runtime', 'es7.objectRestSpread']
    }))
    .pipe(gulp.dest('./'));
});


gulp.task("default", function(cb) {
  runSequence('build', 'watch');
});
