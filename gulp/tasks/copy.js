var gulp = require('gulp-help')(require('gulp'));
var debug = require('gulp-debug');

var path = {
	src: ['./leadpages-template/*.html', './leadpages-template/js/*.js', './leadpages-template/css/*.css', './leadpages-template/img/*', './leadpages-template/meta/*'],
	dest: './build/dist/leadpages-template'
};

gulp.task('copy', 'Make a temp copy of leadpages-template for zipping', function(cb){
	return gulp.src(path.src)
		.pipe(debug({ title: 'Copying..'}))
		.pipe(gulp.dest(path.dest));
	cb();
});