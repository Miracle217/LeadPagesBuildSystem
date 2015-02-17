var gulp = require('gulp-help')(require('gulp'));
var open = require('gulp-open');

gulp.task('open', 'Launch the default browser', function(){
	var opts = {
		url: 'http://localhost:8080',
		app: 'google chrome'
	};
	gulp.src('./leadpages-template/index.html')
	.pipe(open('', opts));
});