var gulp = require('gulp-help')(require('gulp'));
var cheerio = require('gulp-cheerio');
var notifier = require('node-notifier');

var path = {
	index: './leadpages-template/index.html',
	dest: './build/leadpages-template/'
};

gulp.task('cleanDataAttributes', 'Clean up data-lead-* before zipping', function(){
	gulp.src(path.index)
		.pipe(
			cheerio(function($, file){
				$('[data-lead-id]').removeAttr('data-lead-data').removeAttr('data-lead-name');
			})
		)
		.pipe(gulp.dest(path.dest));
});