var gulp = require('gulp-help')(require('gulp'));
var debug = require('gulp-debug');

var path = {
	src: ['./leadpages-template/**'],
	dest: './build/leadpages-template'
};

gulp.task('copy', 'Make a temp copy of leadpages-template for zipping', function(){
	gulp.src(path.src)
		.pipe(debug({ title: 'Copying..'}))
		.pipe(gulp.dest(path.dest, { overwrite: false }));
});