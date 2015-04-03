var gulp = require('gulp-help')(require('gulp'));
var templateFiles = './leadpages-template/**/*';
var yargs = require('yargs').argv;
var gulpif = require('gulp-if');

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload. ', function () {
  	gulp.watch('./html/index.html', ['html']);

	gulp.watch(['./less/**/*.less'], ['less']);
	gulp.watch(['./scss/**/*.scss'], ['sass']);

	gulp.watch(['./scripts/app/**/*.js'], ['lint']);
	gulp.watch(['./scripts/app/**/*.js'], ['concat']);
	gulp.watch(['./build/js/src/functions.js'], ['uglify']);

	gulp.watch(templateFiles, ['zip']);

});