var gulp = require('gulp');
var connect = require('gulp-connect');

var path = {
	src: './leadpages-template/js/**/*.js'
};

gulp.task('js', 'Watch JS files for changes and reload them', function(){
	gulp.src(path.src)
		.pipe(connect.reload());
});