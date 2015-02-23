var gulp = require('gulp-help')(require('gulp'));
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var debug = require('gulp-debug');

gulp.task('lint', 'Lint JS files', function(){
	gulp.src('./scripts/app/*.js')
		.pipe(debug({title: 'Linting: '}))
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
});