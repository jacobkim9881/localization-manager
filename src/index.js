const fs = require('fs');
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const { writeJson, localizeObj, addStr, makeKeyPathReturnSrc, objValWithKeyPath, putStrIn } = require('./utils')
const {testLanguageIdx, testJsonData, testTargetObj, testStr, testArr} = require('../test/test-index')
const LocalizeObject = require('./module.js')
var assert = require('assert');

let localObj
  , languageIdx

process.argv.forEach(function (valArg, indexArg) {
  console.log(indexArg, ': ' , valArg)
  if (indexArg == 2) languageIdx = valArg
  if (indexArg !== 3) return;
  testLanguageIdx(languageIdx)	
  testJsonData(fs.readFileSync(valArg))

  localObj = JSON.parse(fs.readFileSync(valArg))

  localObj = LocalizeObject(localObj, languageIdx)	
  let aPath = `_locales/`
      writeJson(aPath + langs[languageIdx]  + `/` + valArg , JSON.stringify(localObj, null, 4));  	
      return

  //console.log('langs length: ', langs.length)
  //console.log('srcToLozalize: ', srcToLocalize)
  //console.log('process argv', indexArg + ': ' + valArg);

})
