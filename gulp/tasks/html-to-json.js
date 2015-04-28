var gulp = require('gulp-help')(require('gulp'));
var fs = require('fs');
var cheerio = require('gulp-cheerio');
var jeditor = require('gulp-json-editor');
var chalk = require('chalk');
var readJSONSync = require('read-json-sync');
var writeJson = require('write-json');

var paths = {
    htmlFiles : ['./leadpages-template/*.html'],
    jsonFile : './leadpages-template/meta/template.json',
    dest : './leadpages-template/meta'
};

var checkDuplicatesID = function(elements) {
    var els = [];
    elements.map(function(element, index, arr){
        return element.id;
    }).filter(function(item, index, arr){
        arr = arr.sort();
        if( item === arr[index-1] && els.indexOf(item) === -1) {
            els.push(item);
        }
    });

    return els;
};

var validDataTypes = ["image", "image-link", "link", "text", "container", "dynamic", "background-image", "video", "countdown", "embed", "facebook-button", "facebook-comments", "twitter-button", "google-button"];


var isValidDataType = function(str) {
    return validDataTypes.indexOf(str) !== -1 ? true : false;
};

//TODO: clean up codes
gulp.task('htmltojson', 'Convert data-lead-id or data-lead-type into template.json elements', function () {

    //a template object to build the elements and variables
    var templateJson = {
        elements: [],
        variables: {}
    };

    //Objects group to be push to the templateJson object above
    var elementGroup = null;

    var that = this;
        rowsMissingNames = [],
        rowsMissingDataType = [],
        rowsWithInvalidTypes = [],
        foundInvalidTypes = [];

    gulp.src(paths.htmlFiles)

        .pipe(
            cheerio(function($, file, done){
                $('[data-lead-id]').each(function(){
                    var _this = $(this),
                        elementId = _this.data('lead-id'),
                        elementIdRegex,
                        elementIdText, //The text after --
                        variableName;

                    elementGroup = {};

                    elementGroup.id = elementId;

                    elementGroup.name = _this.data('lead-name') || '';

                    if(elementGroup.name === ''){
                        rowsMissingNames.push(elementId);
                    }

                    //Look for data-lead-type
                    if(!!_this.data('lead-type')){

                        elementGroup.type = _this.data('lead-type');

                        //Grab element's name to use with variable name below
                        elementIdText = _this.data('lead-id');

                    } else if(!!elementId.match(/--/)) {

                        //Look for the -- for type in data-lead-id
                        elementIdRegex = elementId.match(/(.*?)(--)(.*)/);

                        elementGroup.type = elementIdRegex[1];

                        //Grab element's name to use with variable name below for Dynamics
                        elementIdText = elementIdRegex[3];

                        //Assign the last part as name if no data-lead-name is found
                        if(elementGroup.name === ''){
                            elementGroup.name = elementIdText;
                        }

                    } else {
                        elementGroup.type = '';

                        rowsMissingDataType.push(elementId);
                    }

                    if(elementGroup.type !== '' && isValidDataType(elementGroup.type) === false){
                        rowsWithInvalidTypes.push(elementId);
                        foundInvalidTypes.push(elementGroup.type);
                    }

                    //A template for the `variables` object
                    if(elementGroup.type === 'dynamic'){

                        elementGroup.data = {};

                        variableName = elementIdText+'-src';

                        elementGroup.data["variables"] = [variableName];

                        templateJson.variables[variableName] = {};
                        templateJson.variables[variableName].variable = variableName;
                        templateJson.variables[variableName].default = "";
                        templateJson.variables[variableName].name = "Instructions on how to use this";

                    }
                    templateJson.elements.push(elementGroup);

                }); //$.each

                //Make sure cheerio is finished writing
                done();

                //Read template.json
                var writeObj = readJSONSync(paths.jsonFile);

                //Empty out the elements and variables objects first
                writeObj.elements = [];
                writeObj.variables = {};


                writeJson(paths.jsonFile, writeObj, function(err) {
                    if (err) console.log(err);
                });

                //Write to template.json
                gulp.src(paths.jsonFile)
                    .pipe(
                        jeditor({
                            "elements": templateJson.elements,
                            "variables": templateJson.variables
                        },
                        {
                            'indent_char': '\t',
                            'indent_size': 1,
                        })
                    )
                    .pipe(gulp.dest(paths.dest));

                //Find duplicate data-lead-id's
                var dups = checkDuplicatesID(templateJson.elements);
                if(dups.length > 0){
                    console.log(
                        chalk.bold.yellow('IMPORTANT! ')+
                        chalk.bold.red('DUPLICATE data-lead-id found for: ')+
                        chalk.white(dups.join(', '))
                    );
                }

                //Missing data type
                if(rowsMissingDataType.length > 0){
                    console.log(
                        chalk.bold.yellow('WARNING! ')+
                        chalk.bold.red(rowsMissingDataType.length+' MISSING DATA TYPE FOUND! ')+
                        chalk.white('No Data Type defined in ')+
                        chalk.white.inverse('data-lead-type')+chalk.white(' OR ')+
                        chalk.white.inverse('data-lead-id')+
                        chalk.white(' for the following ') +
                        chalk.yellow('data-lead-id: \n') +
                        chalk.cyan('\t'+rowsMissingDataType.join(', '))+
                        chalk.gray.italic('\nEx: data-lead-id="image--main-image" OR data-lead-type="image"')
                    );
                }

                //Invalid data types found
                if(rowsWithInvalidTypes.length > 0){
                    console.warn(
                        chalk.bold.yellow('WARNING! ')+
                        chalk.red.bold(rowsWithInvalidTypes.length+' INVALID TYPE FOUND! ')+
                        chalk.white('Please correct ')+
                        chalk.white.inverse(foundInvalidTypes.join(', '))+
                        chalk.white(' data type found in these ')+
                        chalk.yellow('data-lead-id:\n')+
                        chalk.cyan('\t'+rowsWithInvalidTypes.join(', '))+
                        chalk.gray.italic('\nValid types are: '+validDataTypes.join(', '))
                    );
                }

                //Missing data-lead-name
                if(rowsMissingNames.length > 0){
                    var isAre = rowsMissingNames.length > 1 ? ' items are missing the' : ' item is missing a';
                    console.log(
                        chalk.bold.green('NOTICE: ')+
                        chalk.blue.bold(rowsMissingNames.length+isAre+' data-lead-name! ')+
                        chalk.white('To show more legible names in the builder, please add ')+
                        chalk.white.inverse('data-lead-name')+
                        chalk.white(' to these ')+
                        chalk.yellow('data-lead-id ')+
                        chalk.gray('(OPTIONAL):\n')+
                        chalk.cyan('\t'+rowsMissingNames.join(', '))+
                        chalk.gray.italic('\nEx: data-lead-name="Main Container"')

                    );
                }

            })//Cheerio
        ) //Pipe
});
