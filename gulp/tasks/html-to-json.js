var gulp = require('gulp-help')(require('gulp'));
var fs = require('fs');
var cheerio = require('gulp-cheerio');
var jeditor = require('gulp-json-editor');
var chalk = require('chalk');
var readJSONSync = require('read-json-sync');
var writeJson = require('write-json');
var notifier = require('node-notifier');

var paths = {
    htmlFiles : ['./leadpages-template/*.html'],
    jsonFile : './leadpages-template/meta/template.json',
    dest: './leadpages-template/meta'
};

/**
 * Compare the object.id then return an array of the duplicates
 * @param  {array} elements Array of objects
 * @return {array}          Get the ID's of the objects
 */
var findDuplicatesID = function(elements) {
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

var toTitleCase = function(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

var validDataTypes = ["image", "image-link", "link", "text", "container", "dynamic", "background-image", "video", "countdown", "embed", "facebook-button", "facebook-comments", "twitter-button", "google-button"];


var isValidDataType = function(str) {
    return validDataTypes.indexOf(str) !== -1 ? true : false;
};

//TODO: clean up codes
gulp.task('htmltojson', 'Convert data-lead-id or data-lead-type into template.json elements', function () {

    //a template object to build the elements and variables
    var writeObj = {
        elements: [],
        variables: {}
    };

    //Objects group to be push to the writeObj object above
    var elementGroup = null;

    var rowsMissingNames = [],
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

                    //Look for custom leadpages data
                    if(!!_this.data('lead-data')){
                        elementGroup.data = _this.data('lead-data');
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
                            elementGroup.name = toTitleCase(elementIdRegex[3].replace(/\W/g, ' '));
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

                        writeObj.variables[variableName] = {};
                        writeObj.variables[variableName].variable = variableName;
                        writeObj.variables[variableName].default = "";
                        writeObj.variables[variableName].name = "Instructions on how to use this";

                    }

                    writeObj.elements.push(elementGroup);

                }); //$.each

                //Make sure cheerio is finished writing
                done();

                //Find duplicate data-lead-id's
                var dups = findDuplicatesID(writeObj.elements);
                if(dups.length > 0){
                    console.log(
                        chalk.bold.yellow('ERROR! ')+
                        chalk.bold.red('DUPLICATE data-lead-id found: ')+
                        chalk.white(dups.join(', '))
                    );
                }

                //Missing data type
                if(rowsMissingDataType.length > 0){
                    console.log(
                        chalk.bold.yellow('WARNING! ')+
                        chalk.bold.red(rowsMissingDataType.length+' MISSING DATA TYPE! ')+
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
                        chalk.white('To customize the names shown in the builder, please add ')+
                        chalk.white.inverse('data-lead-name')+
                        chalk.white(' to these ')+
                        chalk.yellow('data-lead-id ')+
                        chalk.gray('(OPTIONAL):\n')+
                        chalk.cyan('\t'+rowsMissingNames.join(', '))+
                        chalk.gray.italic('\nEx: data-lead-name="Main Container"')

                    );
                }

                //Write to template.json only if important errors are cleared
                if(dups.length === 0 && rowsMissingDataType.length === 0 && rowsWithInvalidTypes.length === 0){

                    //Read template.json
                    var templateJSON = readJSONSync(paths.jsonFile);

                    //Empty out the elements and variables objects first
                    templateJSON.elements = [];
                    templateJSON.variables = {};

                    writeJson(paths.jsonFile, templateJSON, function(err) {
                        if (err) console.log(err);
                    });

                    gulp.src(paths.jsonFile)
                        .pipe(
                            jeditor({
                                "elements": writeObj.elements,
                                "variables": writeObj.variables
                            },
                            {
                                'indent_char': '\t',
                                'indent_size': 1,
                            })
                        )
                        .pipe(gulp.dest(paths.dest));
                } else {
                    notifier
                        .notify({
                            title: "ERROR",
                            message: 'Please check your console for more info!',
                            sound: 'Submarine',
                            wait: true
                        });
                }


            })//Cheerio
        ) //Pipe
});
