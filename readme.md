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

1. `gulp` (default) : `connect` & `watch`
2. `gulp concat` : Concatenate files
3. `gulp html` : Minify html & watch with LiveReload
4. `gulp sass` : Compile SASS files and output to `/leadpages-template/css/` folder
4. `gulp less` : Compile LESS files and output to `/leadpages-template/css/` folder
5. `gulp watch` : Watch files, compile SASS, minify html and watch for changes with LiveReload
	* **Note:** If you are using less. You can run the watch task with `--less` flag like this: `gulp watch --less`
6. `gulp zip` : Zip up the `leadpages-template` folder for easy upload!

##Questions? Issues? Comments?

Please report them using this repo's [Issues Tracker](https://github.com/LeadPages/LeadPagesBuildSystem/issues).

##Contribute

Don't have all the stuff you want? You can always fork a branch!

1. Fork a feature branch
2. Code
3. Submit a Pull Request
4. Thank you for helping out! You're awesome!
