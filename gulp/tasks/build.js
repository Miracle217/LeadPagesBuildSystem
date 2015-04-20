var gulp = require('gulp');
var debug = require('gulp-debug');

var paths = {
	scriptFiles: './scripts/**/*.js',
	lessFiles: './less/**/*.less',
	sassFiles: './scss/**/*.scss',
	imageFiles: './leadpages-template/img/*'
};

gulp.task('build', ['images', 'less', 'sass', 'lint', 'concat'] function(){

	console.log('Running `build` task...');

});
