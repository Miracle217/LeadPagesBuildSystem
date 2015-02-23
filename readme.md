#LeadPages&trade; Template Build System

The LeadPages&trade; Template Build System is for templates authoring to be sold on the [LeadPages&trade; Marketplace](https://market.leadpages.net).

This Build System will work for both existing or new LeadPages&trade; templates. If you are concern that this will overwrite your existing project, don't worry. The following installation script will check if you have an existing `leadpages-template` folder, if it does, it'll leave your `leadpages-template` alone and just grab the necessary build system files. Otherwise, it'll grab a new skeleton `leadpages-template` for you. Lastly, it'll also initialized a clean git repository for you.

##Installation

###Requirements

1. **Bash Terminal**
	* **Mac**
	It comes with all Mac's. Just hit `command+space` and type `terminal` and hit `enter` to launch it
	* **Windows**
	  Download and install [Git SCM](http://git-scm.com/download/win)
2. [NodeJS](http://nodejs.com)

### New Template or Existing Template *without* Git ###

If you are starting fresh, try our [yeoman generator](https://github.com/LeadPages/LeadPagesYeoman) that it comes with the LeadPages&trade; Build System!

1. `cd` into your **root** directory where you have the `leadpages-template` folder
2. `git clone https://github.com/LeadPages/LeadPagesBuildSystem .` (The **.** at the end is important!)
 * Or download a [zip file here](https://github.com/LeadPages/LeadPagesBuildSystem/archive/master.zip) and unzip to **outside** of `leadpages-template` folder
3. In the terminal, run `./install`
5. Done!

### Existing Template *with* Git

Why have a separate set of instructions? This is one way to make sure we don't overwrite any of your stuff.

1. `cd` into your **root** directory where you have the `leadpages-template` folder
2. `git clone https://github.com/LeadPages/LeadPagesBuildSystem`
 * Or download a copy of the [zip file here](https://github.com/LeadPages/LeadPagesBuildSystem/archive/master.zip) and unzip and copy the contents over
3. `cd LeadPagesBuildSystem && ./install`
4. `cd ..` Even after the folders were deleted, Bash script can only executes in the current directory so it can't `cd` up one level.
5. `npm install`
6. Done!


##Available Gulp Tasks

1. `gulp help` : Show available gulp tasks
1. `gulp` (default) : `connect`, `open` (the default browser), `watch`
2. `gulp concat` : Concatenate JS files inside `leadpages-template/js/*.js` and wrap them with jQuery `docready` and `window.load`.
3. `gulp html` : `LiveReload` the `index.html` if there are changes
4. `gulp jshint`: Run JSHint on JS files
5. `gulp jsonlint`: Lint template.json
4. `gulp sass` : Compile & minify SASS files from `/scss/` folder and output to `/leadpages-template/css/style.css`. Also `liveReload` if page is already opened.
4. `gulp less` : Compile & minify LESS files from `/less/` folder and output to `/leadpages-template/css/style.css`. Also `liveReload` if page is already opened.
5. `gulp watch` : Watch changes on html, SASS/Less and `LiveReload`, as well as `zip` up `leadpages-template.zip` if changes are detected in `/meta/template.json`.
   * **Note:** The `watch` task watches changes from both the `scss` and `less` folders. Obviously, you don't need both SASS & Less, just delete one of folders. The task will ignore the one that doesn't exist.
6. `gulp zip` : Zip up the `leadpages-template` folder for easy upload! <br>(**Note:** you would still need to manually update the `notes` and `version` in `template.json` if you uploading updates.)

##Folders Structure Notes

````
Your Template Folder
| --- gulp
| --- gulfile.js
| --- leadpages-template/
|     | --- css/
|     | 	| --- style.css (Compiled from either the "scss" or "less" folder)
|     | --- fonts/
|     | --- img/
|     | --- js/
|     | 	| --- html5shiv.js (required by LeadPages)
|     | 	| --- functions.js (output from the "scripts/app" folder)
|     | 	| --- vendor.js (output from the "scripts/vendor" folder)
|     | --- meta/
|     | 	| --- template.json
| --- less (You can delete this if you prefer less)
| 	  | --- _settings.colors.less (Base colors: font colors, background etc...)
|	  | --- _settings.global.less (variables for fonts etc...)
|	  | --- mixins/
|	  | 	| --- css3.less (Mixins examples)
|	  | --- template.less (Put your custom css here or import others in here.)
|     | --- vendor/ (Put plugins css in here such as bootstrap.min.css/scss. output as vendor.css)
| --- node_modules
| --- package.json
| --- scripts/
|	  | --- app/ (JS in here will output to `leadpages-template/js/functions.js`)
|	  |	    | --- something.js
|     | --- vendor/ (JS in here will output to `leadpages-template/js/vendor.js`)
|     |     | --- jquery.1.9.1.min.js (And other 3rd party scripts)
| --- scripts-footer.js (Do not remove! Use for wrapping `function.js`)
| --- scripts-header.js (Do not remove! Use for wrapping `function.js`)
| --- scss/ (You can delete this if you prefer less)
| 	  | --- _settings.colors.scss (Base colors: font colors, background etc...)
|	  | --- _settings.global.scss (variables for fonts etc...)
|	  | --- mixins/
|	  | 	| --- css3.scss (Mixins examples)
|	  | --- template.scss (Put your custom css here or import others in here.)
|     | --- vendor/ (Put plugins css in here such as bootstrap.min.css/scss. output as vendor.css)
````

###Important note on `leadpages-template/css/style.css`

If you have a `style.css` in `leadpages-template/css` already, you might want to rename it to something else because if you use `gulp sass` or `gulp less` this file **will be overwritten**!

##Questions? Issues? Comments?

Please report them using this repo's [Issues Tracker](https://github.com/LeadPages/LeadPagesBuildSystem/issues).

##Contribute

Don't have all the stuff you want? You can always fork a branch!

1. Fork a feature branch
2. Code
3. Submit a Pull Request
4. Thank you for helping out! You're awesome!

##Important notes for the `yeoman` branch

Please note that this branch is meant for using with the [Yeoman generator](https://github.com/LeadPages/LeadPagesYeoman) that MAKE SURE you create a **local yeoman** branch and do a Pull Request *with this branch ONLY*. The difference is that the `yeoman` branch *has* the `leadpages-template` folder and minor readme details like this one.

If you are pulling changes from `master` from other branches (such as updating the gulp tasks), *make sure* you **keep** the `leadpages-template` folder otherwise you'd break the `./install` script on `master`. How? `git co [commit before your merge hash] leadpages-template` to bring it back.

**Best practice:** merge your test changes on a separate branch.
