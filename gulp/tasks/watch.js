var gulp = require('gulp-help')(require('gulp'));
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');

var paths = {
	templateFiles: './leadpages-template/**/*',
	buildFolder: './build/dist/leadpages-template/**/*',
	htmlFiles: './leadpages-template/*.html',
	scriptFiles: './scripts/**/*.js',
	lessFiles: './less/**/*.less',
	sassFiles: './scss/**/*.scss',
	cssFiles: './leadpages-template/css/*.css',
	imageFiles: './leadpages-template/img/*'
};

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload. ', function () {

  	gulp.watch([paths.htmlFiles], ['html']);

  	gulp.watch([paths.imageFiles], ['images']);

	gulp.watch([paths.lessFiles], ['less']);
	gulp.watch([paths.sassFiles], ['sass']);

	gulp.watch([paths.cssFiles], ['css']);

	gulp.watch([paths.scriptFiles], ['lint']);
	gulp.watch([paths.scriptFiles], ['concat']);

	//Runs copy, mincss & uglify
	gulp.watch([paths.templateFiles], ['zip']);

});