var gulp = require('gulp');
var argv = require('yargs').argv;
var watch = require('gulp-watch');

gulp.task('start', 'Connect, open, watch tasks. Option: --htmltojson', ['open', 'watch'], function(){

	if(argv.htmltojson){
		watch(['./leadpages-template/index.html'], function(){
			gulp.start('htmltojson');
		});
	}
});
