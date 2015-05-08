var gulp = require('gulp-help')(require('gulp'));
var debug = require('gulp-debug');
var argv = require('yargs').argv;
var fs = require('fs');
var watch = require('gulp-watch');

var paths = {
	scriptFiles: './scripts/**/*.js',
	appJS: './scripts/app/*.js',
	functionJS: './leadpages-template/js/*.js',
	indexFile: './leadpages-template/index.html',
	lessFiles: './less/**/*.less',
	sassFiles: './scss/**/*.scss',
	imageFiles: './leadpages-template/img/*',
	cssFiles: './leadpages-template/css/*.css'
};

gulp.task('build', 'Run `images`, `less` or `sass`, `lint`, `contact`, and `htmltojson` tasks if --htmltojson flag is passed', function(){

	console.log('Running `build` task...');

	gulp.start('images');

	if(fs.existsSync('./scss/')){
		gulp.start('sass');
	}

	if(fs.existsSync('./less/')){
		gulp.start('less');
	}

	if(fs.existsSync('./scripts/')){
		gulp.start('concat');
	}

	gulp.start('lint');


});
