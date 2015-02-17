var gulp = require('gulp-help')(require('gulp'));
var jeditor = require("gulp-json-editor");

var incrementMinorVer = function (ver) {
	var currentVer = ver.split('.');
	var minorVer = currentVer.pop().split('');

	minorVer.push(parseInt(minorVer.pop(), 10) + 1);
	currentVer.push(minorVer.join(''));
	return currentVer.join('.');
};

var incrementNotes = function (notes, oldVersion, newVersion) {
	var index = notes.indexOf(oldVersion);

	return (index > -1) ?
		notes.replace(oldVersion, newVersion) :
		notes += " " + newVersion;
};

gulp.task('edit-json', 'Auto-increment the version in `/leadpages-template/meta/template.json`', function () {
	gulp.src("./leadpages-template/meta/template.json")
		.pipe(jeditor(function (json) {
			var cachedVersion = json.version;
			json.version = incrementMinorVer(json.version);
			json.notes = incrementNotes(json.notes, cachedVersion, json.version);
			return json;
		}))
		// this will throw EEXIST error.
		.pipe(gulp.dest("./leadpages-template/meta/template.json"));
});