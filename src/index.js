const fs = require('fs');
const { writeJson, localizeObj, addStr, makeKeyPathReturnSrc, objValWithKeyPath, putStrIn } = require('./utils')
const {testLanguageIdx, testJsonData, testTargetObj, testStr, testArr} = require('../test/test-index')
var assert = require('assert');

let localObj
  , languageKey

process.argv.forEach(function (valArg, indexArg) {
  console.log(indexArg, ': ' , valArg)
  if (indexArg == 2) languageKey = valArg
  if (indexArg !== 3) return;
  testStr(languageKey)	
  testJsonData(fs.readFileSync(valArg))

  localObj = JSON.parse(fs.readFileSync(valArg))
  //console.log('localObj : ', localObj)
  let tagPathStrings = [] 
    , aPath = `_locales/`
    , srcToLocalize = {}
  srcToLocalize[languageKey] = {}

  localObj = addStr(localObj, undefined, tagPathStrings)
  //console.log('localObj after recursive: ', localObj)
  //console.log('after loop tagPathStrings: ', tagPathStrings)
  testTargetObj(localObj)
  //console.log('localObj : ', localObj)
  let srcStr = ""
    , keyArr = []
    , keyObj = {}
    , srcObj = {}
  
  srcStr = makeKeyPathReturnSrc(tagPathStrings, srcStr, keyArr, srcObj)
  testStr(srcStr)
  //console.log('tagPathStrings after makeKeyPath... func: ', tagPathStrings)
  //console.log('src Str : ', srcStr)
  //console.log('src Obj : ', srcObj)

  //console.log('src key : ', keysStr)
  //console.log('src key : ', keyArr)
  //console.log('src keys length : ', keyArr.length)

  //ex
  //splited:  [ 'SMALL/1/tag4', '. NortainVPN\n' ]
  //splited:  [ 'LI/0', 'What is VPN' ]
  //
	
  localizeObj(srcStr, languageKey)
    .then((localizedStr) => {
      testStr(localizedStr)    
      let targetStr = localizedStr.split('\n')
      testArr(targetStr)    
      //console.log('targetStr after localize: ', targetStr)
      //console.log('targetStr length after localize: ', targetStr.length)
      objValWithKeyPath(targetStr, keyObj, keyArr)

      localObj = putStrIn(localObj, undefined, keyObj, srcObj)
      testTargetObj(localObj)
      //console.log('localized source: ', localObj)
      writeJson(aPath + languageKey  + `/` + valArg , JSON.stringify(localObj, null, 4));  	
      return
    })

  //console.log('srcToLozalize: ', srcToLocalize)
  //console.log('process argv', indexArg + ': ' + valArg);

})
