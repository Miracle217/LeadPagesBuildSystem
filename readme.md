#LeadPages&trade; Template Build System

The LeadPages&trade; Template Build System is a workflow automation tool for template authoring for the [LeadPages&trade; Marketplace](https://market.leadpages.net).

You can use this build system on either new, or existing LeadPages&trade; templates. The installation script will create a skeleton `leadpages-template` folder if you don't already have one (and ignore your existing one if you do). It will also initialize a clean git repository, if you don't have one already. 

##Installation

###Requirements

1. **Bash Terminal**
	* **Mac** Installed by default on OSX. Just hit `command+space` and type `terminal` and hit `enter` to launch it
	* **Windows**
	  Download and install [Git SCM](http://git-scm.com/download/win)
2. [NodeJS](http://nodejs.com)

### New Template or Existing Template *without* Git ###

If you are starting fresh, try our [yeoman generator](https://github.com/LeadPages/LeadPagesYeoman), which includes the LeadPages&trade; Build System!

1. `cd` into your **root** directory where you have the `leadpages-template` folder
2. execute `git clone https://github.com/LeadPages/LeadPagesBuildSystem .` (Don't forget the **.** at the end!)
 * Or download a [zip file here](https://github.com/LeadPages/LeadPagesBuildSystem/archive/master.zip), and unzip in your root template folder (same directory that contains your `leadpages-template` folder)
3. In the terminal, run `./install`
5. Done!

### Existing Template *with* Git

We've created a separate set of instructions if you already have git installed, to ensure we don't overwrite any of your stuff.

1. `cd` into your **root** directory where you have the `leadpages-template` folder
2. execute `git clone https://github.com/LeadPages/LeadPagesBuildSystem`
 * Or download a copy of the [zip file here](https://github.com/LeadPages/LeadPagesBuildSystem/archive/master.zip) and unzip and copy the contents over
3. execute `cd LeadPagesBuildSystem && ./install`
4. execute `cd ..` (even after the folders were deleted, Bash can only executes in the current directory so it can't `cd` up one level.)
5. execute `npm install`
6. Done!


##Available Gulp Tasks

1. `gulp` (default) : `connect` & `watch`
2. `gulp concat` : Concatenate JS files
3. `gulp html` : Minify html & watch with LiveReload
4. `gulp sass` : Compile SASS files into `style.css` and output to `/leadpages-template/css/` folder
4. `gulp less` : Compile LESS files into `style.css` and output to `/leadpages-template/css/` folder
5. `gulp watch` : Watch files, compile SASS/LESS, minify html and watch for changes with LiveReload
	* **Note:** If you are using less, modify `gulp/tasks/watch.js` to use `less` instead of `sass`
6. `gulp zip` : Zip up the `leadpages-template` folder for easy upload!

##Questions? Issues? Comments?

Please report them using this repo's [Issues Tracker](https://github.com/LeadPages/LeadPagesBuildSystem/issues).

##Contribute

Don't have all the stuff you want? You can always fork a branch!

1. Fork a feature branch
2. Write the C0dez
3. Submit a Pull Request
4. Thank you for helping out! You're awesome!
