var gulp = require('gulp-help')(require('gulp'));
var uglify = require('gulp-uglify');
var debug = require('gulp-debug');
var handleErrors = require('../util/handleErrors');

/**
 * NOTE: Excluding vendor.js from minifying. Weird stuff could happen
 */
var paths = {
	js: ['./leadpages-template/js/*.js', '!./leadpages-template/js/vendor.js', '!./leadpages-template/js/html5shiv.js'],
	dest: './build/leadpages-template/js'
};

gulp.task('uglify', 'Uglify JS files', function(doneMinJS) {
	//Race condition work around
	setTimeout(function(){
		gulp.src(paths.js)
			.pipe(debug({ title: 'Uglifying...' }))
			.pipe(uglify())
				.on('error', handleErrors)
			.pipe(gulp.dest(paths.dest));
		doneMinJS();
	}, 1000);
});
