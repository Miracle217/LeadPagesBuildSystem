var gulp = require('gulp-help')(require('gulp'));
var templateFiles = './leadpages-template/**/*';

gulp.task('watch', 'Watch for html/scss/less changes and refresh with LiveReload', function () {
  	gulp.watch('./html/index.html', ['html']);
	gulp.watch(templateFiles, ['zip']);

	gulp.watch(['./less/vendor/*.css', './less/vendor/*.scss', './scss/vendor/*.css', './less/vendor/*.less'], ['vendorcss'])
	gulp.watch(['./less/**/*.less'], ['less']);
	gulp.watch(['./scss/**/*.scss'], ['sass']);

	gulp.watch(['./scripts/**/*.js'], ['lint']);
	gulp.watch(['./scripts/**/*.js'], ['concat']);

	gulp.watch(['./leadpages-template/meta/template.json'], ['zip']);
});