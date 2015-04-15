var gulp = require('gulp-help')(require('gulp'));
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');

var htmlFiles = './leadpages-template/*.html',
	tmpLPFolder = './build/src/**/**/*',
	tmpCSS = './build/src/leadpages-template/css/*.css',
	tmpJS = './build/src/leadpages-template/js/*.js',
	scriptFiles = './scripts/app/**/*.js',
	lessFiles = './less/**/*.less',
	sassFiles = './scss/**/*.scss',
	imageFiles = './images/**/*',
	templateFiles = './leadpages-template/**/*';

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload. ', function () {

  	gulp.watch([htmlFiles], ['html']);

  	gulp.watch(['./leadpages-template/img/*'], ['images']);

	gulp.watch([lessFiles], ['less']);
	gulp.watch([sassFiles], ['sass']);

	gulp.watch([scriptFiles], ['lint']);
	gulp.watch([scriptFiles], ['concat']);

	//gulp.watch([templateFiles], ['copy']);

	gulp.watch([tmpJS], ['uglify']);
	gulp.watch([tmpCSS], ['minCSS']);
	gulp.watch([tmpLPFolder], ['zip']);

});