var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');
var gbabel = require('gulp-babel');

var packageJSON = require('./package');
var jshintConfig = packageJSON.jshintConfig;

gulp.task('build:ripple', function() {
  return gulp.src('./src/**/*.js')
    .pipe(concat('build.js'))
    .pipe(gbabel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist/'));
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
