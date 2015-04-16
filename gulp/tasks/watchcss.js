var gulp = require('gulp');
var connect = require('gulp-conncect');

var path = {
	src: './leadpages-template/css/*.css'
};

gulp.task('css', 'Watch for css updates and reload if no sass or less', function(){
	gulp.src(path.src)
		.pipe(connect.reload());
});