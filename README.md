![gif](./etc/ezgif.com-gif-maker.gif)

## Localization Manager
This repository helps users to make localized json file(to 102 countries language based on google translator API) from a json file.

The countries available for localization are listed in `./src/lang_code.js`. You can decide which countries you want to translate in the file by adding countries of `langsExplain`object to `langsToTranslate` array. The countries list is referenced [here](https://github.com/shikar/NODE_GOOGLE_TRANSLATE/blob/master/languages.js). 

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
- Install node modules by typing `npm install` at the repository directory `./`. 
- Open `./src/lang_code.js`. At the bottom of the file, add countries to the `langsToTranslate` array from the `langsExplain` object. The countries within `langsToTranslate` array will be the countries you want to target for translating. Leaving `langsToTranslate` empty will translate to every langauge by default.
- Then execute `exe.sh <json_file_you_to_localize>` file by typing `./exe.sh test.json` on current directory on terminal.

Here is already an example .json file, so we can execute translating without preparing .json file. `local_obj.json` is an example json file to test the repository. Type for example,

```

./exe local_obj.json

```

### Example adding countries to `langsToTranslate` array in `lang_code.js` 
 The file is at `./src`. You can add,

```js

// lang_code.js

const langsToTranslate = [langsExplain.fr, langsExplain.ko /*add more languages from langsExplain here*/]

```

or you can leave `langsToTranslate` empty to translate all langauges,

```js

// lang_code.js

const langsToTranslate = []

```


### Localize multiple json file
You can localize multiple josn files. 

- Execute `exe.sh <json_file_you_to_localize1> <json_file_you_to_localize2>` file by typing `./exe.sh test1.json test2.json` on current directory on terminal.

### Localize json files which contains html tags
It localize texts without html tag files. Also texts inside of more than 2 tags can be localized. 

## Briefing about how the program works
Short briefing orders the program executed.

1. Command takes into `exe.sh`. `exe.sh` execute `index.js` file. 
- ex) `./exe.sh local_obj.json`
2. .json file is parsed at `index.js`. Parsed json is like,
`{"key": {"key1": "value"}}`
3. Each key and value is joined and pushed in an array by `addStr` function in utils.js.
- ex) `['key/key1 \t value']` 
4. With the array at 3, each value is pushed in an array by `makeyKeyPathReturnSrc` function. Also each key is pushed in other array as same order. The reason will be explained later order. Array of value is like,
`['value1', 'value2']
and array of key is like,
`['key/key1', 'key/key2']
The point is that orders of the two arrays are same.
5. With keys array and values array at 4, each set is made into an object.
- ex) `{"key/key1" : value}` 
6. With the values at 4, an string that all values are joined is made. 
- ex) `'value1 /n value2'` 
7. With the string at 6, translate module translates it.
- ex) `'frenchValue1 \n frenchValue2'`
8. With the translated string at 7, it will splited by line feed. For this array, the orders of it are same to orders at 4.
- ex) `['frenchValue1', 'frenchValue2']`
9. With each line at 7, it replaces each value of the object at 5 by `objValWithKeyPath` function and make new object. In case of complicated example, `frenchValue2` will be omitted and `frenchValue1` will be replaced to `frenchValue`.
- ex) `{"key/key1" : frenchValue}` 
10. With the object at 9, its each key will read each one of the object at 2 and replace each value to translated one by `putStrIn` function.
- ex) `{"key": {"key1": "frenchValue"}}`
11. With the object at 10, new json file is written.

By orders above, each json key and value are splited and rejoined. It is because for avoiding request traffic error of google translate module. Whenever translating each values with short term like 0.01 seconds, the google server shuts down the requests from same IP. So all values are joined as one string and translated and then splited. 
