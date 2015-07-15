var gulp        = require('gulp');
var runSequence = require('run-sequence');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var exorcist    = require('exorcist');
var browserify  = require('browserify');
var babelify    = require('babelify');
var watchify    = require('watchify');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var mocha       = require('gulp-mocha');
var install     = require("gulp-install");

watchify.args.debug = true;
var bundler = watchify(browserify('./app/src/main.js', watchify.args));

bundler.transform(babelify.configure({
  sourceMapRelative: './app/src',
  optional: ['runtime', 'es7.objectRestSpread']
}));

bundler.on('update', bundle);

function bundle() {
  gutil.log('Compiling JS...');

  return bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message);
      browserSync.notify("Browserify Error!");
      this.emit("end");
    })
    .pipe(exorcist('./app/dist/app.js.map'))
    .pipe(source('app.js'))
    .pipe(gulp.dest('./app/dist'))
    .pipe(browserSync.stream({once: true}));
}

gulp.task('bundle', function() {
  return bundle();
});

gulp.task('install', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(install());
});

gulp.task('sass', function() {
  return gulp.src("./app/assets/sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./app/dist"))
    .pipe(browserSync.stream());
});

gulp.task('default', function(cb) {
  runSequence('install', ['sass', 'bundle'], function() {
    browserSync.init({
      server: "./app",
      ghostMode: false,
      open: false
    });

    gulp.watch("./app/assets/sass/*.scss", ['sass']);
    gulp.watch("./app/*.html").on('change', browserSync.reload);

    cb();
  });
});
