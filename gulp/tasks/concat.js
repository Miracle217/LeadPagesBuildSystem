var gulp = require('gulp-help')(require('gulp'));
var concat = require('gulp-concat');
var handleErrors = require('../util/handleErrors');
var logger = require('gulp-logger');
var destination = './leadpages-template/js';

gulp.task('concat', 'Concatenate js files from `scripts` into vendor.js and functions.js', function () {

	gulp.src(['./scripts/vendor/jquery*.js','./scripts/vendor/**/!(jquery-*).js'])
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
		.pipe(gulp.dest(destination));

	gulp.src(['./scripts/scripts-header.js','./scripts/app/**/*.js','./scripts/scripts-footer.js'])
		.pipe(
			logger({
				before: 'Compiling function.js',
				after: 'Finished compiling functions.js',
				basename: 'functions',
				extname: '.js',
				display: 'name',
				dest: destination,
				showChange: true
			})
		)
		.pipe(concat('functions.js'))
		.pipe(gulp.dest(destination));
});