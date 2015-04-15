var gulp = require('gulp-help')(require('gulp'));
var gulpif = require('gulp-if');
var yargs = require('yargs').argv;
var minify = require('gulp-cssmin');
var stripComments = require('gulp-strip-comments');
var debug = require('gulp-debug');
var handleErrors = require('../util/handleErrors');

var path = './leadpages-template/css/*.css';
var destination = './build/dist/leadpages-template/css/'

gulp.task('minCSS', 'Minify CSS', function(){
	gulp.src(path)
		.pipe(debug({title: 'Minifying: '}))
		.pipe(minify())
    	.pipe(stripComments())
    		.on('error', handleErrors)
    	.pipe(gulp.dest(destination));
});