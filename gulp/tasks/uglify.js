var gulp = require('gulp-help')(require('gulp'));
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');

gulp.task('uglify', 'Uglify JS files', function() {
  gulp.src('./build/js/src/*.js')
    .pipe(uglify())
    .pipe(concat('functions.js'))
    .pipe(gulp.dest('./build/js/dist'))
});