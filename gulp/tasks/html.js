var gulp = require('gulp-help')(require('gulp'));
var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('html', 'Watch index.html with LiveReload', function () {
  var opts = {comments:true,spare:true};

  gulp.src('./leadpages-template/index.html')
    .pipe(connect.reload())
});
