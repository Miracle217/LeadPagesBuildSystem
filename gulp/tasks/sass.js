var gulp = require('gulp-help')(require('gulp'));
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');
var gulpif = require('gulp-if');
var yargs = require('yargs').argv;
var minCSS = require('gulp-cssmin');
var stripComments = require('gulp-strip-comments');

gulp.task('sass', 'Watch changes in the `scss` folder and compile to `leadpages-template/css/style.css`', function () {
	gulp.src('./scss/template.scss')
		.pipe(sass())
    		.on('error', handleErrors)
		.pipe(concat('style.css'))
    		.pipe(gulpif( yargs.min, minCSS() ))
    		.pipe(gulpif( yargs.nc, stripComments() ))
    		.on('error', handleErrors)
		.pipe(gulp.dest('./leadpages-template/css/'))
		.pipe(connect.reload());
});