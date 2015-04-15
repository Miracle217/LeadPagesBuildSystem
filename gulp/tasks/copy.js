var gulp = require('gulp-help')(require('gulp'));
var plumber = require('gulp-plumber');
var cache = require('gulp-cache');

var path = ['./leadpages-template/**/*'];
var destination = './build/tmp/'

gulp.task('copy', 'Make a temp copy of leadpages-template for zipping', function(){
	gulp.src(path, {base: '.'})
		.pipe(cache('copying'))
		.pipe(gulp.dest(destination))
});