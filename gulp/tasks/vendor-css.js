var gulp = require('gulp-help')(require('gulp'));
var concat = require('gulp-concat');
var handleErrors = require('../util/handleErrors.js');
var connect = require('gulp-connect');
var debug = require('gulp-logger');

gulp.task('vendorcss', 'Compile vendor css into one file. css/vendor.css', function(){
	gulp.src(['./less/vendor/*.css', './scss/vendor/*.css'])
	.pipe(
		debug({
			before: 'Compiling vendor.css...',
			after: 'Finished compiling vendor.css',
			basename: 'vendor',
			extname: '.css',
			display: 'name',
			dest: './leadpages-template/css/',
			showChange: true
		})
	)
	.pipe(concat('vendor.css'))
	.on('error', handleErrors)
	.pipe(gulp.dest('./leadpages-template/css/'))
	.pipe(connect.reload());

});