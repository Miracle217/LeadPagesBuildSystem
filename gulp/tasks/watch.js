var gulp = require('gulp-help')(require('gulp'));
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');

var paths = {
	templateFiles: './leadpages-template/**/*',
	htmlFiles: './leadpages-template/*.html',
	cssFiles: './leadpages-template/css/*.css',
	jsFiles: './leadpages-template/js/*.js'
};

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload. ', function () {

  	gulp.watch([paths.htmlFiles], ['html']);
  	gulp.watch([paths.cssFiles], ['css']);

  	gulp.watch([paths.templateFiles], ['build']);

  	gulp.watch([paths.jsFiles], ['watchJS'])

	//Runs copy, mincss & uglify
	gulp.watch([paths.templateFiles], ['zip']);

});