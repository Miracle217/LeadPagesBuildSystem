var gulp = require('gulp-help')(require('gulp'));
var concat = require('gulp-concat');
var handleErrors = require('../util/handleErrors.js');
var connect = require('gulp-connect');
var debug = require('gulp-debug');

gulp.task('vendorcss', 'Compile vendor css into one file. css/vendor.css', function(){
	gulp.src(['./less/vendor/*.css', './less/vendor/*.scss', './scss/vendor/*.css', './less/vendor/*.less'])
	.pipe(debug({title: 'Compiling vendor.css: '}))
	.pipe(concat('vendor.css'))
	.on('error', handleErrors)
	.pipe(gulp.dest('./leadpages-template/css'))
	.pipe(connect.reload());
});