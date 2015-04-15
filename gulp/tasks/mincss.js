var gulp = require('gulp-help')(require('gulp'));
var gulpif = require('gulp-if');
var yargs = require('yargs').argv;
var minify = require('gulp-cssmin');
var stripComments = require('gulp-strip-comments');
var debug = require('gulp-debug');
var handleErrors = require('../util/handleErrors');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var cache = require('gulp-cache');

gulp.task('minCSS', 'Minify CSS', function(){
	gulp.src('./build/css/src/*.css')
		.pipe(cache('minifycss'))
		.pipe(minify())
    	.pipe(stripComments())
    		.on('error', handleErrors)
    	.pipe(concat('style.css'))
			.on('error', handleErrors)
    	.pipe(gulp.dest('./build/css/dist'))
    	.pipe(connect.reload());
});