const translate = require('translate-google')
const writeFile = require('write-file')
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const localObj = require('./local_obj')

function writeJson(path, cont) {
  writeFile(path, cont, function (err) {
    if (err) return console.log(err)
    console.log('file is written');	
  })
}

async function localizeObj(content, lang) {
  let except = []
  //console.log(content)
return content
  return await translate(content, {to: lang, except: except}).then(res => {
    	console.log('res: ', res)
    return res
  })
  .catch(async err => {
  console.log('error while localize: ', err)
	 // localizeObj(content, lang)
  return undefined
  })
	return
}

function addStr(localObj, newObj, newObjKey, localStr) {

  Object.entries(localObj).forEach(([key, value], idx, arr) => {
	 let strPath = newObjKey ? newObjKey + '/' + key : key
	if (typeof value === 'string') {
	 if (value === '') {
		 //console.log('empty string')
        return
	 }
      let regx = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g
      let targetStr = value.replace(regx, '\t').trim()
      //console.log(targetStr)
	 if (targetStr === '') {
		 //console.log('empty string')
        return
	 }
		// /H1\tabc
		let multipleValue = targetStr.split('\t')
		if (multipleValue.length > 1) {
			let tempVal = ''
			let onlySpace = /[^\s|^\n|^\t]/g
	multipleValue.forEach((val, idx) => {
	//	console.log( 'is empty: ', val.match(onlySpace))
		if (val.match(onlySpace) === null) return
	tempVal = strPath + '/tag' + idx + '\t' + val	+ '\n'
		localStr.push(tempVal)
	})
//	multipleValue = tempVal	
		//targetStr = multipleValue	
		} else if (multipleValue.length === 1) {
	let keyValue = strPath + '\t' + targetStr
	    localStr.push(keyValue)

//		console.log('key value: ', keyValue)
		}
//console.log('targetStr: ', targetStr)
	    		//console.log('multiple value: ', multipleValue)
	    //console.log('local str: ', localStr)
		//console.log('key value: ', value)
	 newObj[key] = ''
		return
    } else if (typeof value === 'object') {
      //		 console.log('newObj : ', newObj, key)
	 newObj[key] = {}
      return newObj[key] = addStr(value, newObj[key], strPath, localStr)
    } 
	  return
  })
	//console.log('newObj in func: ', newObj, newObjKey, localObj)
return newObj
}

function makeKeyPath(localStr, srcStr, keyArr) {
localStr.forEach((val, idx) => {

//	console.log(idx, val)
let splited = val.split('\t')
splited[1] = splited[1].replace('\n', '')
//keysStr = keysStr + splited[0] + '\n'
keyArr.push(splited[0])
//keyObj[splited[0]] = ''
//console.log('splited at localStr: ', splited)
srcStr = localStr[idx +1] ? srcStr + splited[1] + '\n' : srcStr + splited[1] 
//console.log('splited: ', splited)
})
return srcStr	
}

function objValWithKeyPath(targetStr, keyObj, keyArr) {
//	console.log('keyObj before function: ', keyObj)
targetStr.forEach((val, idx) => {
//console.log('val at targetStr each: ', val)
console.log('key arr[idx] : ', keyArr[idx])
keyObj[keyArr[idx]] = val	
return	
})
	console.log('keyObj after function: ', keyObj)
return
}

function putStrIn(newObj, newObjKey, keyObj) {
  Object.entries(newObj).forEach(([key, value], idx, arr) => {
	 let strPath = newObjKey ? newObjKey + '/' + key : key
	if (typeof value === 'string') {
//   console.log(' value: ', value)
		//console.log('str path : ', strPath)
		//console.log('found value: ', keyObj[strPath])
		newObj[key] = keyObj[strPath]
	    return
    } else if (typeof value === 'object') {
      //		 console.log('newObj : ', newObj, key)
	 newObj[key] = {}
//	    console.log('after recursive: ', putStrIn(value, strPath, keyObj))
      return newObj[key] = putStrIn(value, strPath, keyObj)
    } 
		return

})
	return newObj
}

process.argv.forEach(function (valArg, indexArg, arrayArg) {

if (indexArg !== 2) return;

let localStr = [] 
//console.log(langs)
let aPath = `_locales/`

let srcToLocalize = {}
  let promiseArr = []
  srcToLocalize[langs[valArg]] = {}

  let newObj = srcToLocalize[langs[valArg]] 
//console.log('newObj srcTOlocalize: ', newObj)
newObj = addStr(localObj, newObj, undefined, localStr)

//console.log('after loop local str: ', localStr)

let 	srcStr = ""
, keyArr = []
, keyObj = {}

srcStr = makeKeyPath(localStr, srcStr, keyArr)

//console.log('src Str : ', srcStr)
//

//srcStr = writeJson(aPath + langs[valArg], srcStr)
//localizeObj(srcStr, langs[valArg])

//console.log('src Str : ', srcStr)

//console.log('src key : ', keysStr)
console.log('src key : ', keyArr)

//ex
//splited:  [ 'SMALL/1/tag4', '. NortainVPN\n' ]
//splited:  [ 'LI/0', 'What is VPN' ]
	//
	//
	
localizeObj(srcStr, langs[valArg])
.then((localizedStr) => {
let targetStr = localizedStr.split('\n')
, valAsOne = ''

objValWithKeyPath(targetStr, keyObj, keyArr)

newObj = putStrIn(newObj, undefined, keyObj)

console.log('localized source: ', newObj)
    writeJson(aPath + langs[valArg]  + `/local_obj.js`, JSON.stringify(newObj));  	
	return
})

//console.log('langs length: ', langs.length)
//console.log('srcToLozalize: ', srcToLocalize)

  //console.log('process argv', indexArg + ': ' + valArg);

})
