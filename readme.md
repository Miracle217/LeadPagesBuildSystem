#LeadPages&trade; Template Build System

The LeadPages&trade; Template Build System is for templates authoring to be sold on the [LeadPages&trade; Marketplace](https://market.leadpages.net).

This Build System will work for both existing or new LeadPages&trade; templates. If you are concern that this will overwrite your existing project, don't worry. The following installation script will check if you have an existing `leadpages-template` folder, if it does, it'll leave your `leadpages-template` alone and just grab the necessary build system files. Otherwise, it'll grab a new skeleton `leadpages-template` for you. Lastly, it'll also initialized a clean git repository for you.

##IMPORTANT: Before You Begin

If you are installing this build system as a _standalone_ (meaning not using Yeoman):

### /leadpages-template/css/style.css

If you _are_ using either sass or less **with** your _existing_ template, either copy the contents of `/leadpags-template/css/style.css` into `template.scss/less` or make a copy to include it in `template.scss/less`. Because `gulp start` **will overwrite** your `/leadpages-template/css/style.css`!!

### JS files in `/leadpages-template/js/`

Very much the same reason as `style.css` above. If you _don't_ want to have all of your JS inside the `scripts` folder, you can just remove the `scripts` folder. If you _do_, **make sure** you move the contents in `functions.js` to `scripts/app/somefile.js`.

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

1. Open up your Terminal or GitSCM Bash Terminal (Windows)
1. `cd` into your **root** directory where you have the `leadpages-template` folder
2. `git clone https://github.com/LeadPages/LeadPagesBuildSystem .` (The **.** at the end is important!)
 * Or download a [zip file here](https://github.com/LeadPages/LeadPagesBuildSystem/archive/master.zip) and unzip to **outside** of `leadpages-template` folder
3. In the terminal, run `./install`
6. **Before** you type `gulp start`, please read the **IMPORTANT: Before You Begin** section
4. Type `gulp start` in the terminal to start
	* If your default browser doesn't launch automatically. Point your browser to `http://localhost:8080`
5. Done!

### Existing Template *with* Git

Why have a separate set of instructions? This is one way to make sure we don't overwrite any of your stuff.

1. `cd` into your **root** directory where you have the `leadpages-template` folder
2. `git clone https://github.com/LeadPages/LeadPagesBuildSystem`
 * Or download a copy of the [zip file here](https://github.com/LeadPages/LeadPagesBuildSystem/archive/master.zip) and unzip and copy the contents over
3. `cd LeadPagesBuildSystem && ./install`
4. `cd ..` Even after the folders were deleted, Bash script can only executes in the current directory so it can't `cd` up one level.
5. `npm install`
6. **Before** you type `gulp start`, please read the notes in **IMPORTANT: Before You Begin** section
6. Type `gulp start` in the terminal to start coding
  * If your default browser doesn't launch automatically. Point your browser to `http://localhost:8080`
7. Done!


##Available Gulp Tasks

1. `gulp` or `gulp help` : Show available gulp tasks
2. `gulp start` : `connect`, `open` (the default browser), `watch`
	* If your default browser doesn't launch automatically. Point your browser to `http://localhost:8080`
3. `gulp build` :
 	* Compile `functions.js` from `scripts/app/*.js` if `.scripts` folder exists and wrap them with jQuery `docready` and `window.load`
 	* Compile `vendor.js` from `scripts/vendor/**/*.js` if `.scripts` folder exists. jquery-1.9.1.min.js is always included first, you can also delete it if you don't want jQuery
4. `gulp zip` : Make a copy of `leadpages-template`, then minify css/js before zipping up the `leadpages-template.zip` folder for easy upload! <br>(**Note:** you would still need to manually update the `notes` and `version` in `template.json`.)

##Folders Structure Notes

To give you a better idea how to work this build system, please refer below for the files structure. But in general:

* You would edit `index.html` directly inside `./leadpages-template/` folder
* If you are *not* using **less or sass**, you would edit `style.css` directly inside the `./leadpages-template` folder
* If you don't want to compile JS into a single file or `scripts` folder doesn't exist, you would edit `functions.js` or your desired JS files directly.
* SASS, LESS, and JS have their respective folders and see below for more explanations if you answered 'y' to the Yeoman prompts.
* _All_ css/js within `/leadpages-template/` files will be minify regardless of the above options before zipping.

````
Your Template Folder
| --- index.html
| --- build/ (A temp folder generated by the `copy` task for debugging purpose and minifications before zipping)
| --- images/ (All images below this folder will be optimized & copied to `./leadpages-template/img/`)
| --- gulp/
| --- tasks/
|	  | --- (Files within here are all of the gulp tasks. You can customize to fit your work flow!)
| --- gulfile.js (DO NOT REMOVE)
| --- leadpages-template/
|     | --- css/
|     | 	| --- style.css (Compiled from either the "scss" or "less" folder OR edit directly if no SASS or LESS is used)
|     | --- fonts/
|     | --- img/
|     | --- js/
|     | 	| --- html5shiv.js (required by LeadPages)
|     | 	| --- functions.js (output from the "scripts/app" folder)
|     | 	| --- vendor.js (output from the "scripts/vendor" folder)
|     | --- meta/
|     | 	| --- template.json
| --- less (You can delete this if you prefer SASS or Yeoman will clean this up for you)
| 	  | --- _settings.colors.less (Base colors: font colors, background etc...)
|	  | --- _settings.global.less (variables for fonts etc...)
|	  | --- mixins/
|	  | 	| --- css3.less (Mixins examples)
|	  | --- template.less (Put your custom css here or import others in here.)
| --- node_modules (Added to .gitignore and DO NOT REMOVE)
| --- package.json (DO NOT REMOVE)
| --- scripts/ (If you prefer NOT to organize your JS files here. Delete it.)
|	  | --- app/ (JS in here will output to `leadpages-template/js/functions.js`)
|	  |	    | --- something.js
|     | --- vendor/ (JS in here will output to `leadpages-template/js/vendor.js`)
|     |     | --- jquery.1.9.1.min.js (And other 3rd party scripts. jQuery will always include first)
| 	  | --- scripts-footer.js (Do not remove! Use for wrapping `function.js`)
|	  | --- scripts-header.js (Do not remove! Use for wrapping `function.js` and you can add `global` variables on top of this file)
| --- scss/ (You can delete this if you prefer LESS or Yeoman will clean this up for you)
| 	  | --- _settings.colors.scss (Base colors: font colors, background etc...)
|	  | --- _settings.global.scss (variables for fonts etc...)
|	  | --- mixins/
|	  | 	| --- css3.scss (Mixins examples)
|	  | --- template.scss (Put your custom css here or import others in here.)
````

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
