var gulp = require('gulp');
var argv = require('yargs').argv;

gulp.task('start', 'Connect, open, watch tasks. Pass in --htmltojson to also run `htmltojson` task', ['connect', 'open', 'watch'], function(){

	if(argv.htmltojson){
		gulp.watch(['./leadpages-template/*.html'], ['htmltojson']);
	}
});
