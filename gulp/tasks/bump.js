var gulp = require('gulp');
var bump = require('gulp-bump');


gulp.task('bump', function(){
  gulp.src('./leadpages-template/meta/template.json')
  .pipe(bump())
  .pipe(gulp.dest('./leadpages-template/meta/template.json'));
