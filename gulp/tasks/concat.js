var gulp = require('gulp-help')(require('gulp'));
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var handleErrors = require('../util/handleErrors');
var debug = require('gulp-debug');
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var cache = require('gulp-cached');

var destination = './leadpages-template/js'

gulp.task('concat', 'Concatenate js files from `scripts` into vendor.js and functions.js', function () {

	gulp.src(['./scripts/vendor/**/*.js'])
		.pipe(
			debug({
				before: 'Compiling vendor.js',
				after: 'Finished compiling vendor.js',
				basename: 'vendor',
				extname: '.js',
				display: 'name',
				dest: destination,
				showChange: true
			})
		)
		.pipe(cache('buildVendorJS'))
		.pipe(concat('vendor.js'))
    		.on('error', handleErrors)
		.pipe(gulp.dest(destination))
		.pipe(connect.reload());

	gulp.src(['./scripts/global.js','./scripts/scripts-header.js','./scripts/!(scripts-footer).js','./scripts/!(global).js','./scripts/app/**/*.js','./scripts/scripts-footer.js'])
		.pipe(
			debug({
				before: 'Compiling functions.js',
				after: 'Finished compiling functions.js',
				basename: 'functions',
				extname: '.js',
				display: 'name',
				dest: destination,
				showChange: true
			})
		)
		.pipe(cache('buildFunctionsJS'))
		.pipe(concat('functions.js'))
			.on('error', handleErrors)
		.pipe(gulp.dest(destination))
		.pipe(connect.reload());
});