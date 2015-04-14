var gulp = require('gulp-help')(require('gulp'));
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');

var indexHTML = './leadpages-template/index.html',
	scriptFiles = './scripts/app/**/*.js',
	lessFiles = './less/**/*.less',
	sassFiles = './scss/**/*.scss',
	imageFiles = './images/**/*',
	templateFiles = './leadpages-template/**/*';

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload. ', function () {

  	 gulp.watch([indexHTML], ['html']);

  	gulp.watch(['./images/*'], ['images']);

	gulp.watch([lessFiles], ['less']);
	gulp.watch([sassFiles], ['sass']);

	gulp.watch([scriptFiles], ['lint']);
	gulp.watch([scriptFiles], ['concat']);

	gulp.watch(templateFiles, ['zip']);

	gulp.watch(templateFiles, ['zip']);

});