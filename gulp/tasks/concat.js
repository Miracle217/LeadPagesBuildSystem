var gulp = require('gulp-help')(require('gulp'));
var concat = require('gulp-concat');
var handleErrors = require('../util/handleErrors');
var logger = require('gulp-logger');
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

var destination = './leadpages-template/js';

gulp.task('concat', 'Concatenate js files from `scripts` into vendor.js and functions.js', function () {

	gulp.src(['./scripts/vendor/jquery-1.9.1.min.js','./scripts/vendor/**/*.js'])
		.pipe(
			logger({
				before: 'Compiling vendor.js',
				after: 'Finished compiling vendor.js',
				basename: 'vendor',
				extname: '.js',
				display: 'name',
				dest: destination,
				showChange: true
			})
		)
	        .pipe(concat('vendor.js'))
	        	.on('error', handleErrors)
	        .pipe(gulp.dest(destination)
        );

	gulp.src(['./scripts/scripts-header.js','./scripts/app/**/*.js','./scripts/scripts-footer.js'])
		.pipe(
			logger({
				before: 'Compiling function.js',
				after: 'Finished compiling functions.js',
				basename: 'functions',
				extname: '.js',
				display: 'name',
				dest: './leadpages-template/js',
				showChange: true
			})
		)
		.pipe(concat('functions.js'))
    			.on('error', handleErrors)
		.pipe(gulp.dest(destination)
	);
});
