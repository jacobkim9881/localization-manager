## Localization Manager
This repository helps users to make localized json file(to 102 countries language based on google translator API) from a json file.

Countries list which can be with localizing json are in `lang_code.js`.

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
- Change number at line 6 of `exe.sh` file which are number of countries to localize(For example, if you want to localize json file into african then put `num=0` at line 8 and put `0` at line 10 in `exe.sh` file.  
- Then execute `exe.sh <json_file_you_to_localize>` file by typing `./exe.sh test.json` on current directory on terminal.

## Localize multiple json file
You can localize multiple josn files. 

- Execute `exe.sh <json_file_you_to_localize1> <json_file_you_to_localize2>` file by typing `./exe.sh test1.json test2.json` on current directory on terminal.

### Localize json files which contains html tags
It localize texts without html tag files. Also texts inside of more than 2 tags can be localized.  
