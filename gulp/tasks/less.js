var gulp = require('gulp-help')(require('gulp'));
var less = require('gulp-less');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var handleErrors = require('../util/handleErrors');

gulp.task('less', 'Watch changes in the `less` folder and compile to `leadpages-template/css/style.css. Pass in --min flag to minify, --nc to strip out all comments`', function () {

  	gulp.src('./less/template.less')
		.pipe(less())
    		.on('error', handleErrors)
		.pipe(concat('style.css'))
    		.on('error', handleErrors)
		.pipe(gulp.dest('./build/css/src'))
		.pipe(connect.reload());
});