const translate = require('translate-google')
const writeFile = require('write-file')
const fs = require('fs');
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const { writeJson, localizeObj, addStr, makeKeyPathReturnSrc, objValWithKeyPath, lineFeedChange, putStrIn } = require('./utils')


let localObj
, languageIdx

process.argv.forEach(function (valArg, indexArg, arrayArg) {
  console.log(indexArg, ': ' , valArg)
  if (indexArg == 2) languageIdx = valArg
  if (indexArg !== 3) return;

  localObj = JSON.parse(fs.readFileSync(valArg))

  console.log('localObj : ', localObj)
  //console.log(langs)
  let localStr = [] 
  , aPath = `_locales/`
  , srcToLocalize = {}
  , promiseArr = []
  srcToLocalize[langs[languageIdx]] = {}

  let targetObj = srcToLocalize[langs[languageIdx]] 
  //console.log('targetObj srcTOlocalize: ', targetObj)
  targetObj = addStr(localObj, localObj, undefined, localStr)
//console.log('targetObj after recursive: ', targetObj)
  //console.log('after loop local str: ', localStr)

  console.log('localObj : ', localObj)
  let srcStr = ""
    , keyArr = []
    , keyObj = {}
    , srcObj = {}

  srcStr = makeKeyPathReturnSrc(localStr, srcStr, keyArr, srcObj)

  //	console.log('localStr after makeKeyPath... func: ', localStr)
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
      let targetStr = localizedStr.split('\n')
        , valAsOne = ''
      //console.log('targetStr after localize: ', targetStr)
      //console.log('targetStr length after localize: ', targetStr.length)
      objValWithKeyPath(targetStr, keyObj, keyArr)

      targetObj = putStrIn(targetObj, undefined, keyObj, srcObj)

      //console.log('localized source: ', targetObj)
      writeJson(aPath + langs[languageIdx]  + `/` + valArg , JSON.stringify(targetObj, null, 4));  	
      return
    })

  //console.log('langs length: ', langs.length)
  //console.log('srcToLozalize: ', srcToLocalize)
  //console.log('process argv', indexArg + ': ' + valArg);

})
