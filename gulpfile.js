var gulp = require('gulp');
var jshint = require('gulp-jshint');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');
var gbabel = require('gulp-babel');
var rename = require('gulp-rename');

var packageJSON = require('./package');
var jshintConfig = packageJSON.jshintConfig;

gulp.task('build:ripple', function() {
  return gulp.src('./src/index.es6.js')
    .pipe(gbabel({
      presets: ['es2015']
    }))
    .pipe(rename("build.js"))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename("index.js"))
    .pipe(gulp.dest('./src/'));
});

gulp.task('build:demo', function() {
  var bundler = browserify('./demo/src/main.js', { debug: true }).transform(babel);
  return bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./demo/dist/'));
});

gulp.task('lint', function() {
  return gulp.src(['gulpfile.js', './src/**/*.js'])
    .pipe(jshint(jshintConfig))
    .pipe(jshint.reporter('jshint-stylish'));

});

gulp.task('build', ['build:ripple', 'build:demo']);

gulp.task('default', ['build']);
