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
  return await translate(content, {to: lang, except: except}).then(res => {
    //	console.log('res: ', res)
    return res
  })
  .catch(async err => {
  console.log('error while localize: ', err)
	 // localizeObj(content, lang)
  return undefined
  })
	return
}

async function findString(lang, localObj, newObj, promiseArr, newObjKey, localStr) {
  Object.entries(localObj).forEach(async ([key, value], idx, arr) => {
    //	console.log('idx: ', idx)
    //	console.log('local Obj: ', localObj)
    //		console.log( 'localObj[key]: ', localObj[key])
    //			console.log('value: ', value)
	 let strPath = newObjKey ? newObjKey + '/' + key : key
    if (typeof value === 'string') {
	 if (value === '') {
		 //console.log('empty string')
        return
	 }
      let regx = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g
      let targetStr = value.replace(regx, '').trim()
      //console.log(targetStr)
	 if (targetStr === '') {
		 //console.log('empty string')
        return
	 }
	   // console.log('current path: ', strPath)
	    localStr = localStr ? localStr + '\r' + strPath + '\t' + value : strPath + '\t' + value
	    console.log('local str: ', localStr)
	 let aPromise = new Promise(async (resolve, reject) => {
	 let resultStr = ''
			 //await localizeObj(targetStr, lang)
		 //console.log('newObj and key : ', newObj, key)
		 //console.log('resultStr: ', resultStr)
		 //console.log('targetStr: ', targetStr)
        newObj[key] = value.replace(targetStr, resultStr)
		 //console.log('newObj[key] : ', newObj[key])
		 resolve(1)
		 resolve(lang)
	 })
	 promiseArr.push(aPromise)
    } else if (typeof value === 'object') {
      //		 console.log('newObj : ', newObj, key)
	 newObj[key] = {}
      return newObj[key] = await findString(lang, value, newObj[key], promiseArr, strPath, localStr)
    } else {
      newObj[key] = value
    }
		
  })
  return newObj
}

process.argv.forEach(function (valArg, indexArg, arrayArg) {

if (indexArg !== 2) return;

let localStr = ''
//console.log(langs)
let aPath = `_locales/`

let srcToLocalize = {}
  let promiseArr = []
for (let i = 0; i < 1; i++) {
  srcToLocalize[langs[valArg]] = {}
  let newObj = srcToLocalize[langs[valArg]] 
findString(langs[valArg], localObj, newObj, promiseArr, localStr)
}

Promise.all(promiseArr).then((lang) => {
	for ( const [lang, json] of Object.entries(srcToLocalize)) {
	  //console.log('language at promise all: ', lang)
    writeJson(aPath + lang + `/local_obj.js`, JSON.stringify(json));  	
    //console.log('after promise all: ', json)
	}
    return
  })
//console.log('langs length: ', langs.length)
//console.log('srcToLozalize: ', srcToLocalize)

  //console.log('process argv', indexArg + ': ' + valArg);

})
