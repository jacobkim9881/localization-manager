const fs = require('fs');
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const { writeJson, localizeObj, addStr, makeKeyPathReturnSrc, objValWithKeyPath, putStrIn } = require('./utils')
const {testLanguageIdx, testJsonData, testTargetObj, testStr} = require('./test-index')
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
  //console.log('localObj : ', localObj)
  //console.log(langs)
  let arrayOfStringsWithTagPath = [] 
    , aPath = `_locales/`
    , srcToLocalize = {}
  srcToLocalize[langs[languageIdx]] = {}

  localObj = addStr(localObj, undefined, arrayOfStringsWithTagPath)
  //console.log('localObj after recursive: ', localObj)
  //console.log('after loop arrayOfStringsWithTagPath: ', arrayOfStringsWithTagPath)
 testTargetObj(localObj)
  //console.log('localObj : ', localObj)
  let srcStr = ""
    , keyArr = []
    , keyObj = {}
    , srcObj = {}
  
  srcStr = makeKeyPathReturnSrc(arrayOfStringsWithTagPath, srcStr, keyArr, srcObj)
  testStr(srcStr)
  //	console.log('arrayOfStringsWithTagPath after makeKeyPath... func: ', arrayOfStringsWithTagPath)
  //console.log('src Str : ', srcStr)

  //console.log('src Str : ', srcStr)

  //console.log('src key : ', keysStr)
  //console.log('src key : ', keyArr)
  //console.log('src keys length : ', keyArr.length)

  //ex
  //splited:  [ 'SMALL/1/tag4', '. NortainVPN\n' ]
  //splited:  [ 'LI/0', 'What is VPN' ]
  //
	
  localizeObj(srcStr, langs[languageIdx])
    .then((localizedStr) => {
	testStr(localizedStr)    
      let targetStr = localizedStr.split('\n')
      //console.log('targetStr after localize: ', targetStr)
      //console.log('targetStr length after localize: ', targetStr.length)
      objValWithKeyPath(targetStr, keyObj, keyArr)

      localObj = putStrIn(localObj, undefined, keyObj, srcObj)

      //console.log('localized source: ', localObj)
      writeJson(aPath + langs[languageIdx]  + `/` + valArg , JSON.stringify(localObj, null, 4));  	
      return
    })

  //console.log('langs length: ', langs.length)
  //console.log('srcToLozalize: ', srcToLocalize)
  //console.log('process argv', indexArg + ': ' + valArg);

})
