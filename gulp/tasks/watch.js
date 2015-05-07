var gulp = require('gulp');
var yargs = require('yargs').argv;
var watch = require('gulp-watch');

var paths = {
	templateFiles: './leadpages-template/**/*',
	htmlFiles: './leadpages-template/*.html',
	cssFiles: './leadpages-template/css/*.css',
	jsFiles: './leadpages-template/js/*.js'
};

gulp.task('watch',  ['build', 'reload', 'zip']);