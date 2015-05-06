var gulp = require('gulp-help')(require('gulp'));
var yargs = require('yargs').argv;

var paths = {
	templateFiles: './leadpages-template/**/*',
	htmlFiles: './leadpages-template/*.html',
	cssFiles: './leadpages-template/css/*.css',
	jsFiles: './leadpages-template/js/*.js'
};

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload. ', function () {

  	gulp.watch([paths.htmlFiles], ['html']);

	//Runs copy, mincss & uglify - TODO: Make sure to test this.
	gulp.watch([paths.templateFiles], ['build', 'reload', 'zip']);

});