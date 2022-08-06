const fs = require('fs');
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const { writeJson, localizeObj, addStr, makeKeyPathReturnSrc, objValWithKeyPath, putStrIn } = require('./utils')


let localObj
  , languageIdx

process.argv.forEach(function (valArg, indexArg) {

  if (indexArg == 2) languageIdx = valArg
  if (indexArg !== 3) return;

  localObj = JSON.parse(fs.readFileSync(valArg))



  let localStr = [] 
    , aPath = `_locales/`
    , srcToLocalize = {}
  srcToLocalize[langs[languageIdx]] = {}

  localObj = addStr(localObj, undefined, localStr)




  let srcStr = ""
    , keyArr = []
    , keyObj = {}
    , srcObj = {}

  srcStr = makeKeyPathReturnSrc(localStr, srcStr, keyArr, srcObj)










  //ex
  //splited:  [ 'SMALL/1/tag4', '. NortainVPN\n' ]
  //splited:  [ 'LI/0', 'What is VPN' ]
  //
	
  localizeObj(srcStr, langs[languageIdx])
    .then((localizedStr) => {
      let targetStr = localizedStr.split('\n')


      objValWithKeyPath(targetStr, keyObj, keyArr)

      localObj = putStrIn(localObj, undefined, keyObj, srcObj)


      writeJson(aPath + langs[languageIdx]  + `/` + valArg , JSON.stringify(localObj, null, 4));  	
      return
    })





})
