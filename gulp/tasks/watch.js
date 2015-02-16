var gulp = require('gulp');
var args = require('yargs').argv;
var gulpif = require('gulp-if');
var templateFiles = './leadpages-template/**/*';

var isLESS = args.type === 'less';

gulp.task('watch', function () {
  	gulp.watch('./html/index.html', ['html']);
	gulp.watch(templateFiles, ['zip']);

	//Allow passing in --less flag as an option
	gulpif(isLESS,
			gulp.watch(['./less/**/*.less'], ['less']),
			gulp.watch(['./scss/**/*.scss'], ['sass'])
	);

	gulp.watch(['./scripts/**/*.js'], ['concat']);
});