var gulp = require('gulp-help')(require('gulp'));

var path = './build/dist/leadpages-template/**/*';
var destination = './build/dist/leadpages-template';

gulp.task('copy', 'Make a temp copy of leadpages-template for zipping', function(cb){
	gulp.src(path)
		.pipe(gulp.dest(destination));
	cb();
});