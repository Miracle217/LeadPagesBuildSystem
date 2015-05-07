var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

var path = {
	root: './leadpages-template/',
	html: this.root+'index.html',
	css: this.root+'css/*.css',
	js: this.root+'js/*.js',
	all: this.root+'**/*'
};

connect.server({
	root: 'leadpages-template',
	livereload: true
});

gulp.task('reload', 'Watch for css updates and reload if no sass or less', function(){
	gulp.src(path.all)
		.pipe(watch(path.index))
		.pipe(connect.reload());
});