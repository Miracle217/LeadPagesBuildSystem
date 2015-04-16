var gulp = require('gulp-help')(require('gulp'));

var path = {
	src: './leadpages-template/**/*',
	dest: './build/dist/leadpages-template'
};

gulp.task('copy', 'Make a temp copy of leadpages-template for zipping', function(cb){
	gulp.src(path.src)
		.pipe(gulp.dest(path.dest));
	cb();
});