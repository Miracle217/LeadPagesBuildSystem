var gulp = require('gulp-help')(require('gulp'));
var debug = require('gulp-debug');

var paths = {
	scriptFiles: './scripts/**/*.js',
	lessFiles: './less/**/*.less',
	sassFiles: './scss/**/*.scss',
	imageFiles: './leadpages-template/img/*'
};

gulp.task('build', 'Run `images`, `less` or `sass`, `lint`, `contact`, and `htmltojson` tasks', function(){

	console.log('Running `build` task...');
	gulp.watch([paths.imageFiles], ['images']);

	gulp.watch([paths.lessFiles], ['less']);
	gulp.watch([paths.sassFiles], ['sass']);

	gulp.watch([paths.scriptFiles], ['lint']);
	gulp.watch([paths.scriptFiles], ['concat']);

});
