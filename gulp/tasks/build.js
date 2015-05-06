var gulp = require('gulp-help')(require('gulp'));
var debug = require('gulp-debug');
var argv = require('yargs').argv;

var paths = {
	scriptFiles: './scripts/**/*.js',
	indexFile: './leadpages-template/index.html',
	lessFiles: './less/**/*.less',
	sassFiles: './scss/**/*.scss',
	imageFiles: './leadpages-template/img/*'
};

gulp.task('build', 'Run `images`, `less` or `sass`, `lint`, `contact`, and `htmltojson` tasks', function(){

	console.log('Running `build` task...');
	gulp.watch([paths.imageFiles], ['images']);

	if(argv.htmltojson){
		gulp.watch([paths.indexFile], ['htmltojson']);
	}

	gulp.watch([paths.lessFiles], ['less']);
	gulp.watch([paths.sassFiles], ['sass']);

	gulp.watch([paths.scriptFiles], ['lint']);
	gulp.watch([paths.scriptFiles], ['concat']);

});
