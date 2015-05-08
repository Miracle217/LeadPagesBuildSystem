var gulp = require('gulp');
var plumber = require('gulp-plumber');
var zip = require('gulp-zip');
var readJSONSync = require('read-json-sync');

var fs = require('fs');
var exec = require('child_process').exec;

var paths = {
	copiedFiles: ['./build/leadpages-template/**/*'],
	templateJson: './leadpages-template/meta/template.json'
};

var tjson = readJSONSync(paths.templateJson);

gulp.task('zip',['copy', 'cleanDataAttributes', 'uglify', 'mincss'], function () {
	var fileName = 'leadpages-template ' + tjson.version + '.zip';
	var leadPagesTemplateName = './leadpages-template.zip';

	// if the versioned zip file exists, delete it
	if(fs.existsSync('./' + fileName)) {
		console.log('Deleting: ', fileName);
		var command = 'rm -rf ' + '"' + fileName + '"';
		exec(command, function (err) {
			if (err) {
				console.error('Error: ', err);
			}
		});
	}

	// if leadpages-template.zip exists, copy it to leadpages-template {{version}}.zip, and delete leadpages-template.zip
	if(fs.existsSync(leadPagesTemplateName)) {
		exec('cp -R leadpages-template.zip "' + fileName + '"', function (err) {
			if (err) {
				console.log('copy error: ' , err);
			}
		});

		console.log('deleting: ', leadPagesTemplateName);
		var command = 'rm -rf ' + '"' + leadPagesTemplateName + '"';
		exec(command, function (err) {
			if (err) {
				console.error('Error: ', err);
			}
		});
	}

	return gulp.src(paths.copiedFiles, {base: "./build/"})
		.pipe(plumber())
		.pipe(zip(leadPagesTemplateName))
		.pipe(gulp.dest('./'));
});