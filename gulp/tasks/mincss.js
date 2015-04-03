var gulp = require('gulp-help')(require('gulp'));
var gulpif = require('gulp-if');
var yargs = require('yargs').argv;
var minify = require('gulp-cssmin');
var stripComments = require('gulp-strip-comments');
var debug = require('gulp-debug');

gulp.task('minCSS', 'Minify CSS', function(){
	gulp.src('./build/css/src/*.css')
		.pipe(minify())
    	.pipe(stripComments())
    	.pipe(gulp.dest('./leadpages-template/css/style.css'))
});