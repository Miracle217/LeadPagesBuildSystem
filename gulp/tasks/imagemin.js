var gulp = require('gulp-help')(require('gulp'));
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');
var handleErrors = require('../util/handleErrors');

var imgSrc = './images/**/*';
var imgDest = './leadpages-template/img';

// Minify any new images
gulp.task('images', 'Optimize images', function() {

  // Add the newer pipe to pass through newer images only
  return gulp.src(imgSrc)
      .pipe(newer(imgDest))
      .pipe(
			debug({
				before: 'Optimizing images..',
				after: 'Done optimizing images!',
				display: 'name',
				showChange: true
			})
		)
      .pipe(imagemin())
      	.on('error', handleErrors)
      .pipe(gulp.dest(imgDest));
});