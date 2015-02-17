var gulp = require('gulp-help')(require('gulp'));
var args = require('yargs').argv;
var gulpif = require('gulp-if');
var templateFiles = './leadpages-template/**/*';

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload', function () {
  	gulp.watch('./html/index.html', ['html']);
	gulp.watch(templateFiles, ['zip']);

	gulp.watch(['./less/**/*.less'], ['less']);
	gulp.watch(['./scss/**/*.scss'], ['sass']);

	gulp.watch(['./scripts/**/*.js'], ['concat']);
});