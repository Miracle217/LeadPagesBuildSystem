var gulp = require('gulp');
var fs = require('fs');
var cheerio = require('gulp-cheerio');
var jeditor = require('gulp-json-editor');
var chalk = require('chalk');
var readJSON = require('read-json-sync');
var writeJson = require('write-json');

var paths = {
    htmlFiles : ['./leadpages-template/*.html'],
    jsonFile : './leadpages-template/meta/template.json',
    dest : './leadpages-template/meta'
};

//TODO: check for duplicate id's and report it out
var checkDuplicatesID = function(elements) {

    elements = elements.sort();
    elements.filter(function(element, index, arr){
        if( index > 0 && element.id === arr[index-1].id ) {
            //console.log(element.id)
            return element.id
        }
    });
};


//TODO: clean up codes

gulp.task('tojson', function () {

    //a template object to build the elements and variables
    var templateJson = {
        elements: [],
        variables: {}
    };

    //Objects group to be push to the templateJson object above
    var elementGroup = null;

    var that = this;
        totalMissingNames = 0,
        whichMissing = [];

    gulp.src(paths.htmlFiles)

        .pipe(
            cheerio(function($, file, done){
                $('[data-lead-id]').each(function(){
                    var _this = $(this),
                        elementId = _this.data('lead-id'),
                        elementIdRegex,
                        elementName,
                        variableName;

                    elementGroup = {};

                    elementGroup.id = elementId;

                    if(!!_this.data('lead-name')){
                        elementGroup.name = _this.data('lead-name');
                    }


                    //Check if data-lead-type exists
                    if(!!$(this).data('lead-type')){

                        elementGroup.type = _this.data('lead-type');

                        //Grab element's name to use with variable name below
                        elementName = $(this).data('lead-id');

                    } else if(!!elementId.match(/--/)) {

                        elementIdRegex = elementId.match(/(.*?)(--)(.*)/);

                        elementGroup.id = elementIdRegex[3];
                        elementGroup.type = elementIdRegex[1];

                        //Assign the last part as name if no data-lead-name is found
                        elementGroup.name = elementIdRegex[3];

                        //Grab element's name to use with variable name below
                        elementName = elementIdRegex[3];

                    } else {
                        elementGroup.type = '';
                        elementGroup.name = '';

                        console.warn(
                            chalk.bold.yellow('WARNING!')+
                            chalk.cyan(' No ')+
                            chalk.yellow('Data Type')+
                            chalk.white(' defined in ')+
                            chalk.magenta('data-lead-type ')+chalk.white('or')+
                            chalk.magenta(' data-lead-id')+
                            chalk.white(' for ') +
                            chalk.yellow('data-lead-id="'+elementId+'"') +
                            chalk.white(' in your html!!')
                        );
                    }

                    //A template for the `variables` object
                    if(elementGroup.type === 'dynamic'){

                        elementGroup.data = {};

                        variableName = elementName+'-src';

                        elementGroup.data["variables"] = [variableName];

                        templateJson.variables[variableName] = {};
                        templateJson.variables[variableName].variable = variableName;
                        templateJson.variables[variableName].default = "";
                        templateJson.variables[variableName].name = "Instructions on how to use this";

                    }
                    templateJson.elements.push(elementGroup);

                }); //$.each

                //TODO: Check duplicate ID's
                var dups = checkDuplicatesID(templateJson.elements);
                //console.log(findDups);

                //Make sure cheerio is finished writing
                done();

                //Make a copy of the template.json
                var writeObj = readJSON(paths.jsonFile);

                //Empty out the elements and variables objects first
                writeObj.elements = [];
                writeObj.variables = {};

                //console.log(writeObj);

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

                    //Report errors
                    /*var isAre = totalMissingNames > 1 ? 's are missing the ' : ' is missing a ';
                    console.warn(
                        chalk.yellow('WARNING! ')+
                        chalk.red(totalMissingNames+' row'+isAre)+
                        chalk.cyan('data-lead-name. ')+
                        chalk.white('Please check the following ')+
                        chalk.yellow('data-lead-id:\n')+
                        chalk.cyan('\t'+whichMissing.join('\n'))
                    );*/

            })//Cheerio
        ) //Pipe

});
