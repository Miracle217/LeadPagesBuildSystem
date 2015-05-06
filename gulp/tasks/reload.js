var gulp = require('gulp');
//var connect = require('gulp-connect');
var browsersync = require('browser-sync');
var browsersyncConnect = require('connect-browser-syn');

var path = {
	src: './leadpages-template/**/*'
};

gulp.task('reload', 'Reload files for changes', function(){
	gulp.src(path.src)
		.pipe(connect.reload());
});