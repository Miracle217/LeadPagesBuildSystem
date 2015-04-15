var gulp = require('gulp-help')(require('gulp'));
var connect = require('gulp-connect');
var debug = require('gulp-debug');

var destination = './build/dist/leadpages-template'

gulp.task('html', 'Watch index.html with LiveReload', function () {
  var opts = {comments:true,spare:true};

  gulp.src('./leadpages-template/*.html')
  	.pipe(debug({title: 'Reloading: '}))
    .pipe(connect.reload())
    .pipe(debug({title: 'Copying: '}))
    .pipe(destination);
});
