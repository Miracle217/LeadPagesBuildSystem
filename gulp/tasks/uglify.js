var gulp = require('gulp-help')(require('gulp'));
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');

var path = './leadpages-template/js/*.js';
var destintation = './build/dist/leadpages-template/js/';

gulp.task('uglify', 'Uglify JS files', function() {
  gulp.src(path)
  	.pipe(gulp.dest())
    .pipe(uglify())
    .pipe(gulp.dest(destintation))
});