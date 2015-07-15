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
var Promise     = require('es6-promise').Promise;
var cirrusUtils = require('cirrus/dist/gulpUtils');
var path        = require('path');

var webPort = '3000';
var linkModules = [];

process.argv.forEach(function (val, index, array) {
  if (val == '--link') {
    linkModules.push(process.argv[index+1].split(':'));
  } else if (val == '-p') {
    webPort = process.argv[index+1];
  }
});

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

gulp.task('sass', function() {
  return gulp.src("./app/assets/sass/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./app/dist"))
    .pipe(browserSync.stream());
});

gulp.task('run:development', function(cb) {
  runSequence(['sass', 'bundle'], function() {
    browserSync.init({
      server: "./app",
      port: webPort,
      ghostMode: false,
      open: false
    });

    gulp.watch("./app/assets/sass/*.scss", ['sass']);
    gulp.watch("./app/*.html").on('change', browserSync.reload);

    cb();
  });
});

gulp.task('default', function (cb) {
  cirrusUtils.hasDockerInstalled(function() {
    var args = [
      '-v ' + __dirname + ':/usr/src/myapp',
      '-w /usr/src/myapp',
      '-p ' + webPort + ':' + webPort,
      '-p ' + '3001' + ':' + '3001',
      '-t',
      '-i',
    ];

    for (var i = 0; i < linkModules.length; i++) {
      args.push('-v ' + path.resolve(linkModules[i][0]) + ':/usr/src/myapp/node_modules/' + linkModules[i][1]);
    }

    cirrusUtils.runContainer('node:0.10', null, args, './node_modules/gulp/bin/gulp.js run:development -p ' + webPort, function() {
      cb();
    });
  });
});
