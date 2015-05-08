var gulp = require('gulp-help')(require('gulp'));
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var handleErrors = require('../util/handleErrors');
var logger = require('gulp-logger');

var paths = {
	sassFiles: './scss/template.scss',
	fileName: 'style.css',
	dest: './leadpages-template/css'
};

gulp.task('sass', 'Compile template.scss into `leadpages-template/css/style.css`', function () {
	gulp.src(paths.sassFiles)
		.pipe(
			logger({
				before: 'Compiling style.css',
				after: 'Finished compiling style.css',
				basename: 'style',
				extname: '.css',
				display: 'name',
				dest: paths.dest,
				showChange: true
			})
		)
		.pipe(sass())
    		.on('error', handleErrors)
		.pipe(concat(paths.fileName))
			.on('error', handleErrors)
		.pipe(gulp.dest(paths.dest))
});