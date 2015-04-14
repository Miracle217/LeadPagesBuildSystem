var gulp = require('gulp-help')(require('gulp'));
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');

var imgSrc = './images';
var imgDest = '/leadpages-template/img';

// Minify any new images
gulp.task('images', 'Optimize images', function() {

  // Add the newer pipe to pass through newer images only
  return gulp.src(imgSrc)
      .pipe(newer(imgDest))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDest));
});