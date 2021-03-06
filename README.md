# Developer environment setup & tips

## Contents
- [VS Code extensions](#vs-code-extensions)
- [VS Code keyboard shortcuts](#vs-code-keyboard-shortcuts)
- [VS Code settings](#vs-code-settings)
- [Cloning repo](#cloning-repo)
- [Branches](#branches)
- [Dependencies](#dependencies)
- [Git in VS Code](#git-in-vs-code)

## VS Code extensions
Install these extensions from VS Code extensions, links to Visual Studio Marketplace

- [**Prettier**](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [**ESLint**](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Optional for code completion and readability

- [**nativeEmmet**](https://marketplace.visualstudio.com/items?itemName=SaugatMaharjan.nativeemmet)
- [**Simple React Snippets**](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
- [**Bracket Pair Colorizer**](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
- [**Monokai Vibrant Theme**](https://marketplace.visualstudio.com/items?itemName=s3gf4ult.monokai-vibrant)

## VS Code keyboard shortcuts
Common keyboard shortcuts to boost productivity

- `Ctrl + J` Toggle integrated terminal.
- `Ctrl + B` Toggle side bar.
- `Ctrl + Shift + P` Open command palette.
- `Ctrl + P` Search or switch between opened files.
- `Ctrl + C or Ctrl + X` Copy/Cut, if you want to copy/cut the entire line you don't need to highlight all the text, just have the cursor on the line and copy/cut
- `Shift + arrow keys` Highlight text with arrow keys. Useful for enclosing something with parentheses, curly braces or brackets. Highlight the text, type the opening parentheses etc. and the highlighted text will be inside it.
- `Ctrl + D` Highlight the word your cursor is on.
- `Ctrl + Shift + K` Delete the entire line.
- `Alt + arrow up/down` Move the line your cursor is on, or a highlighted code block up/down.
- `F2` Refactoring. Want to change a variable/class/component name? Rename refactor makes it easier, rename it once and all instances of it will be automatically refactored. Should work across files if an instance is found.
- `Shift + Alt + arrow down` Duplicate the line your cursor is on or a block of highlighted code below.

## VS Code settings
Settings to be configured

Open settings.json file with `Ctrl + ,`, if this opens the UI settings you can open the JSON file using the command palette `Ctrl + Shift + P` and typing `settings json`, choose `Preferences: Open Settings (JSON)`

Add these into the JSON file

```
// These are all my auto-save configs
"editor.formatOnSave": true,
// Updates imports on file moving or renaming automatically
"javascript.updateImportsOnFileMove.enabled": "always",
// turn formatting off for JS and JSX, we will do this via eslint
"[javascript]": {
  "editor.formatOnSave": false
},
"[javascriptreact]": {
  "editor.formatOnSave": false
},
// show eslint icon at bottom toolbar
"eslint.alwaysShowStatus": true,
// tell the ESLint plugin to run on save
"editor.codeActionsOnSave": {
  "source.fixAll": true
},
// Optional BUT IMPORTANT: If you have the prettier extension enabled for other languages like CSS and HTML, turn it off for JS since we are doing it through Eslint already
"prettier.disableLanguages": ["javascript", "javascriptreact"],
```

## Cloning repo
How to clone the repository to your local machine inside VS Code

- Copy the repo address `https://github.com/petri1807/mobile-programming-project.git`
- Open command palette `Ctrl + Shift + P` and type `clone`. Select `Git: Clone`
- Paste the address in and hit `Enter`
- Select the folder you want to clone this repo into.
- A popup will appear asking you
> Would you like to open the cloned repository, or add it to the current workspace?
- Select Open
- Open the VS Code integrated terminal with `Ctrl + J`
- Run `npm install`

## Branches
Create a local branch in VS Code and connect it to the remote branch in GitHub


1. Open the command palette with `Ctrl + Shift + P` and search for git fetch. Select `Git: Fetch From All Remotes`

![Branch5](/assets/git-instructions/branch5.jpg)


2. Open the command palette with `Ctrl + Shift + P` and search for branch. Select `Git: Create Branch From...`

![Branch1](/assets/git-instructions/branch1.jpg)


3. Give your local branch the SAME NAME that's in the repo

![Branch2](/assets/git-instructions/branch2.jpg)


4. Select your remote branch from the list, `origin/yourname`

![Branch3](/assets/git-instructions/branch3.jpg)


5. Open the command palette again and select `Git: Publish Branch...`

![Branch4](/assets/git-instructions/branch4.jpg)


Test your branch by making a commit, pushing it and see if it pops up in GitHub

## Dependencies
There are two main types of dependencies. Production dependencies (for example `"react": "16.13.1"`) and development dependencies (for example `"prettier": "^2.1.1"`).

If you `npm install` (or `npm i` in short) a new package that we need for the app to run, the `npm install somepackage` command will update the package.json file automatically by adding the new package to production dependencies.

> Example: `npm install react-native-paper`

If you `npm install` a new *developer* dependency that is only needed for the development, but doesn't need to be included for the app to run, use the `--save-dev` or `-D` flag to save it in the devDependencies of package.json.

> Example: `npm install --save-dev prettier`

> Shorter: `npm i -D prettier`

To install the new package(s) someone else added to the project, pull the latest version from git and run `npm install`

This will look through the package.json file and install all new dependencies to your local machine.

## Git in VS Code
General functions for faster, easier commits, pulls, merging etc.

Open the Source Control tab in the activity bar, and you will see all changes made. 

Press the `+` icon to stage changes, write a commit message and commit with `Ctrl + Enter`

![Git](/assets/git-instructions/vscodegit.jpg)

Push commits with `Git: Push` from command palette or the `...` menu

Pulling from remote branch


1. Open the command palette and search pull from, select `Git: Pull from...`

![Pull](/assets/git-instructions/pullfrom.jpg)


2. Select origin

![Pull](/assets/git-instructions/pull2.jpg)


3. Select the remote branch you wish to pull from

![Pull](/assets/git-instructions/pull3.jpg)


Merging is just as easy. Type merge and select `Git: Merge Branch` and select with branch (local or remote) you want to merge from to your current local branch.

Synchronize or pull/push with one button. You can find the icon in the lower left corner of VS Code, this shows how many commits there are to pull and how many commits you have to push. This will pull first to prevent errors, then push your commits.

![sync](/assets/git-instructions/gitsync.JPG)
