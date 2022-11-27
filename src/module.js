const fs = require('fs');
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const { writeJson, localizeObj, addStr, makeKeyPathReturnSrc, objValWithKeyPath, putStrIn } = require('./utils')
const {testLanguageIdx, testJsonData, testTargetObj, testStr, testArr} = require('../test/test-index')
var assert = require('assert');

function localizeObject(localObj, languageIdx) {
  //console.log('localObj : ', localObj)
  //console.log(langs)
  let tagPathStrings = [] 
    , aPath = `_locales/`
    , srcToLocalize = {}
  srcToLocalize[langs[languageIdx]] = {}

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
	
 return localizeObj(srcStr, langs[languageIdx])
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
	    return localObj
})

}

module.exports = localizeObject
