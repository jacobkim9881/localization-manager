const translate = require('translate-google')
const writeFile = require('write-file')
const fs = require('fs');
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);


function writeJson(path, cont) {
  writeFile(path, cont, function (err) {
    if (err) return console.log(err)
    console.log('file is written');	
  })
}

async function localizeObj(content, lang) {
  let except = []
  //console.log(content)
  //should split content if content length is too many to execute translate
  return content
  console.log('Target language: ', lang)
  return await translate(content, {to: lang, except: except}).then(res => {
    	//console.log('res: ', res)
    return res
  })
    .catch(async err => {
      console.log('error while localize: ', err)
      return undefined
    })
  return
}

function addStr(localObj, newObj, newObjKey, localStr) {
  Object.entries(localObj).forEach(([key, value], idx, arr) => {

    let strPath = newObjKey ? newObjKey + '/' + key : key
    if (typeof value === 'string') {
      //console.log('key value: ', value)
      let regx = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g
      , targetStr = value.replace(regx, '\t').trim()
      , multipleValue = targetStr.split('\t')
      //console.log('targetStr: ', targetStr)
      // /H1\tabc
      //console.log('strPath: ', strPath)
      if (multipleValue.length > 1) {
        let tempVal = ''
        , onlySpace = /[^\s|^\n|^\t]/g
        multipleValue.forEach((val, idx) => {
          //console.log( 'is empty: ', val.match(onlySpace))
          if (val.match(onlySpace) === null) return
          tempVal = strPath + '/tag' + idx + '\t' + val	+ '\n'
          //console.log('tempVal : ', tempVal)
          localStr.push(tempVal)
        })
        //multipleValue = tempVal	
        //targetStr = multipleValue	
      } else if (multipleValue.length === 1) {
        let keyValue = strPath + '\t' + targetStr
	localStr.push(keyValue)
        //console.log('key value: ', keyValue)
      }
      //console.log('targetStr: ', targetStr)
      //console.log('multiple value: ', multipleValue)
      //console.log('local str: ', localStr)
      //console.log('key value: ', value)
      newObj[key] = value 
      return
    } else if (typeof value === 'object') {
      //console.log('newObj : ', newObj, key)
      newObj[key] = {}
      return newObj[key] = addStr(value, newObj[key], strPath, localStr)
    } 
    return
  })
  //console.log('newObj in func: ', newObj, newObjKey, localObj)
  return newObj
}

function makeKeyPathReturnSrc(localStr, srcStr, keyArr, keyObj) {
  let lastNonTag = ''
  localStr.forEach((val, idx) => {
    //console.log(idx, val)
    let splited = val.split('\t')
    //splited[1] = splited[1].trim()
    splited[1] = splited[1].trim().replace('\n', '()')
  //console.log('val :', val)
  //console.log('splited : ', splited[1])
  //console.log('typeof splited : ', typeof splited[1])
    //keysStr = keysStr + splited[0] + '\n'
    keyArr.push(splited[0])
    //console.log('splited at localStr: ', splited)
    srcStr = localStr[idx +1] ? srcStr + splited[1] + '\n' : srcStr + splited[1] 
    //console.log('splited: ', splited)
    localStr[idx] = splited[1]
    if(splited[0].includes('tag0')) {
      lastNonTag = splited[0].replace('/tag0', '')
      keyObj[lastNonTag] = [splited[1]]
    } else if (splited[0].includes('tag') && !splited[0].includes('tag0')) {
      //push value
      if (typeof keyObj[lastNonTag] === 'object') { 
        keyObj[lastNonTag] = [...keyObj[lastNonTag], splited[1]]
      } else {
        //console.log('typeof keyObj[lastNonTag] :', typeof Object.values(keyObj[lastNonTag])[0])
        keyObj[lastNonTag] = [keyObj[lastNonTag], splited[1]]
      }
      //console.log('typeof keyObj[lastNonTag] :', typeof Object.values(keyObj[lastNonTag])[0])
      //console.log('length of keyObj[lastNonTag] :', keyObj[lastNonTag].length)
      //console.log('keyObj[lastNonTag] :', keyObj[lastNonTag])
      //console.log('lastNonTag: ', lastNonTag)
    }  else {
      keyObj[splited[0]] = splited[1] 
    }
    return	  
  })
  return srcStr	
}

function objValWithKeyPath(targetStr, keyObj, keyArr) {
//	console.log('keyObj before function: ', keyObj)
  let lastNonTag = ''
  /*
  for (let i = targetStr.length; i > 0; i--) {
  if (targetStr[i] === '') {
    targetStr.splice(i, 1)
  }
  }
	*/
  //console.log('targetStr after poping empty str: ', targetStr)
  //console.log('targetStr length after poping empty str: ', targetStr.length)
  targetStr.forEach((val, idx) => {
    //console.log('idx at targetStr each: ', idx)
    //console.log('val at targetStr each: ', val)
    //console.log('key arr[idx] : ', keyArr[idx])
	  if (keyArr[idx].includes('tag0')) { 
      lastNonTag = keyArr[idx].replace('/tag0', '')
      keyObj[lastNonTag] = [val]
	  } else if (keyArr[idx].includes('tag') && !keyArr[idx].includes('tag0')) {
      //push value
      if (typeof keyObj[lastNonTag] === 'object') { 
        keyObj[lastNonTag] = [...keyObj[lastNonTag], val]
      } else {
        keyObj[lastNonTag] = [keyObj[lastNonTag], val]
      }
      //console.log('typeof keyObj[lastNonTag] :', typeof Object.values(keyObj[lastNonTag])[0])
      //console.log('length of keyObj[lastNonTag] :', keyObj[lastNonTag].length)
      //console.log('keyObj[lastNonTag] :', keyObj[lastNonTag])

    } else {
    }
    keyObj[keyArr[idx]] = val	
    return	
  })
  //console.log('keyObj after function: ', keyObj)
  return
}

function putStrIn(newObj, newObjKey, keyObj, srcObj) {
  Object.entries(newObj).forEach(([key, value], idx, arr) => {
	 let strPath = newObjKey ? newObjKey + '/' + key : key
    if (typeof value === 'string') {
	    let replaceTarget = ''
      //   console.log(' value: ', value)
      //console.log('str path : ', strPath)
      //console.log('found value: ', keyObj[strPath])
      //	 console.log('each localObj: ', localObj)

	    //console.log('type of each keyObj[strPath] :', typeof keyObj[strPath])
      //	   console.log('scrObj: ', srcObj)
	    //console.log('each keyObj[strPath] :', keyObj[strPath])
      if(typeof keyObj[strPath] === 'object') {
        keyObj[strPath].forEach((eachStr, keyObjIdx) => {
          //console.log('localized eachStr: ', eachStr)
          //		console.log('target str arr: ', srcObj[strPath])
          //console.log('target str : ', srcObj[strPath][keyObjIdx])
          //		console.log('src str: ', value)
 	if(keyObjIdx === 0) {
            replaceTarget = 	srcObj[strPath][keyObjIdx]
            if (replaceTarget.includes('()')) {
              replaceTarget = replaceTarget.replace('()', '\n');
              eachStr = eachStr.replace('()', '\n')
            }
            newObj[key] = value.replace(replaceTarget, eachStr)
          } else {
            replaceTarget = srcObj[strPath][keyObjIdx]
            if (replaceTarget.includes('()')) {
              replaceTarget = replaceTarget.replace('()', '\n');
              eachStr = eachStr.replace('()', '\n')
            }
            newObj[key] = newObj[key].replace(replaceTarget, eachStr)
          }
	    //console.log('put newObj[key]: ', newObj[key])

        })
      } else {
        replaceTarget = srcObj[strPath]
        if (replaceTarget.includes('()')) {
          replaceTarget = replaceTarget.replace('()', '\n');
          keyObj[strPath] = keyObj[strPath].replace('()', '\n')
        }
        newObj[key] = value.replace(replaceTarget, keyObj[strPath])
        //console.log('srcObj[strPath]: ', srcObj[strPath])		
      }
      //newObj[key] = keyObj[strPath]
      //	    console.log('put newObj[key]: ', newObj[key])
	    return
    } else if (typeof value === 'object') {
      //		 console.log('newObj : ', newObj, key)
	 newObj[key] = {}
      //	    console.log('after recursive: ', putStrIn(value, strPath, keyObj))
      return newObj[key] = putStrIn(value, strPath, keyObj, srcObj)
    } 
    return
  })
  return newObj
}

let localObj
, languageIdx

process.argv.forEach(function (valArg, indexArg, arrayArg) {
  console.log(indexArg, ': ' , valArg)
  if (indexArg == 2) languageIdx = valArg
  if (indexArg !== 3) return;

  localObj = JSON.parse(fs.readFileSync(valArg))

  //console.log(localObj)
  //console.log(langs)
  let localStr = [] 
  , aPath = `_locales/`
  , srcToLocalize = {}
  , promiseArr = []
  srcToLocalize[langs[languageIdx]] = {}

  let newObj = srcToLocalize[langs[languageIdx]] 
  //console.log('newObj srcTOlocalize: ', newObj)
  newObj = addStr(localObj, newObj, undefined, localStr)

  //console.log('after loop local str: ', localStr)

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

      newObj = putStrIn(newObj, undefined, keyObj, srcObj)

      //console.log('localized source: ', newObj)
      writeJson(aPath + langs[languageIdx]  + `/` + valArg , JSON.stringify(newObj, null, 4));  	
      return
    })

  //console.log('langs length: ', langs.length)
  //console.log('srcToLozalize: ', srcToLocalize)
  //console.log('process argv', indexArg + ': ' + valArg);

})
