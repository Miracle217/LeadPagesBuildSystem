var gulp = require('gulp');
var yargs = require('yargs').argv;
var watch = require('gulp-watch');
var argv = require('yargs').argv;
var fs = require('fs');
var debug = require('gulp-debug');
var connect = require('gulp-connect');

var paths = {
	all: './leadpages-template/**/*',
	html: './leadpages-template/*.html',
	js: './leadpages-template/js/*.js',
	css: './leadpages-template/css/*.css',
	sass: './scss/**/*.scss',
	less: './less/**/*.less',
	scripts: './scripts/app/*.js'
};

var refresh = function(glob){
	gulp.src(glob)
		.pipe(debug({title: 'Reloading: '}))
		.pipe(watch(glob))
		.pipe(connect.reload());
};

gulp.task('watch',  ['connect'], function(){
	if(argv.htmltojson){
		watch(paths.html, function(){
			gulp.start('htmltojson');
		});
	}

	watch(paths.sass, function(){
		gulp.start('sass');

		refresh(paths.css);
	});

	watch(paths.less, function(){
		gulp.start('less');

		refresh(paths.css);
	});

	watch(paths.scripts, function(){
		gulp.start('concat');
		refresh(paths.js);
	});

	watch(paths.js, function(){
		gulp.start('lint');
	});

	watch(paths.html, function(){
		refresh(paths.html);
	});

	watch(paths.all, function(){
		gulp.start('zip');
	});

});