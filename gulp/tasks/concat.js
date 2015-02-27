var gulp = require('gulp-help')(require('gulp'));
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var handleErrors = require('../util/handleErrors');
var debug = require('gulp-logger');
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

gulp.task('concat', 'Concatenate js files from `scripts` into vendor.js and functions.js', function () {

	gulp.src(['./scripts/vendor/**/*.js'])
		.pipe(
			debug({
				before: 'Compiling vendor.js',
				after: 'Finished compiling vendor.js',
				basename: 'vendor',
				extname: '.js',
				display: 'name',
				dest: './leadpages-template/js/',
				showChange: true
			})
		)
		.pipe(concat('vendor.js'))
    		.on('error', handleErrors)
		.pipe(gulp.dest('./leadpages-template/js'))
		.pipe(connect.reload());

	gulp.src(['./scripts/scripts-header.js','./scripts/app/**/!(scripts-footer)*.js','./scripts/scripts-footer.js'])
		.pipe(
			debug({
				before: 'Compiling function.js',
				after: 'Finished compiling functions.js',
				basename: 'functions',
				extname: '.js',
				display: 'name',
				dest: './leadpages-template/js/',
				showChange: true
			})
		)
		.pipe(concat('functions.js'))
    		.pipe(gulpif( yargs.min, uglify() ))
    		.on('error', handleErrors)
		.pipe(gulp.dest('./leadpages-template/js'))
		.pipe(connect.reload());
});