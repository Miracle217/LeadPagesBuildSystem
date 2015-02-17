var gulp = require('gulp-help')(require('gulp'));
var minify = require('gulp-minify-html');
var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('html', 'Minify index.html and LiveReload on the browser', function () {
  var opts = {comments:true,spare:true};

  gulp.src('./leadpages-template/index.html')
    .pipe(connect.reload())
});
