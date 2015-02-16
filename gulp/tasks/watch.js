var gulp = require('gulp');
var templateFiles = './leadpages-template/**/*';

gulp.task('watch', function () {
  	gulp.watch('./html/index.html', ['html']);
	gulp.watch(templateFiles, ['zip']);
	gulp.watch(['./scss/**/*.less'], ['less']);
	gulp.watch(['./scss/**/*.scss'], ['sass']);
	gulp.watch(['./scripts/**/*.js'], ['concat']);
});