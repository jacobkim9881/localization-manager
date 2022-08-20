## Localization Manager
This repository helps users to make localized json file(to 102 countries language based on google translator API) from a json file.

Countries list which can be with localizing json are in `lang_code.js`. You can decide which countries you want to translate in the file by deleting or adding countries of `langsExplain object`. This countries list is referenced [here](https://github.com/shikar/NODE_GOOGLE_TRANSLATE/blob/master/languages.js). 

### Environment
- Linux like OS
- Node.js

This repo is only working on Linux os based machine. On Windows with terminal it may not work because some bash commands will not work on Windows OS which don't have. Node.js should be installed before to run. 

### Setup repository
After download this repository, in the directory node modules should be installed. Type

```

npm install

```

### Quick Start
- Install node modules by typing `npm install` at the repository directory. 
- Add or delete countries of `langsExplain` object in `lang_code.js` for deciding which countries you want to target for translating.
- Then execute `exe.sh <json_file_you_to_localize>` file by typing `./exe.sh test.json` on current directory on terminal.

### Example adding / deleting countries of `langsExplain` object in `lang_code.js` 
 The file is at `./`. You can add,

```js

// lang_code.js

const langsExplain = {
  af: 'Afrikaans',
  sq: 'Albanian',
// add countries
  nl: 'Dutch',
)

```

or you can delete countries in the list,

```js

// lang_code.js

const langsExplain = {
  af: 'Afrikaans',
// delete countries
)

```


### Localize multiple json file
You can localize multiple josn files. 

- Execute `exe.sh <json_file_you_to_localize1> <json_file_you_to_localize2>` file by typing `./exe.sh test1.json test2.json` on current directory on terminal.

### Localize json files which contains html tags
It localize texts without html tag files. Also texts inside of more than 2 tags can be localized.  
