var gulp = require('gulp-help')(require('gulp'));
var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
  gulp.src('./build/js/src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./leadpages-template/js'))
});