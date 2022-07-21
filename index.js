const translate = require('translate-google')
const writeFile = require('write-file')
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const localObj = require('./local_obj')

console.log(langs)
let aPath = `_locales/`

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

async function findString(lang, localObj, newObj, promiseArr) {
  Object.entries(localObj).forEach(async ([key, value], idx, arr) => {
    //	console.log('idx: ', idx)
    //	console.log('local Obj: ', localObj)
    //		console.log( 'localObj[key]: ', localObj[key])
    //			console.log('value: ', value)
    if (typeof value === 'string') {
	 if (value === '') {
		 console.log('empty string')
        return
	 }
      let regx = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g
      let targetStr = value.replace(regx, '').trim()
      //console.log(targetStr)
	 if (targetStr === '') {
		 //console.log('empty string')
        return
	 }
	 let aPromise = new Promise(async (resolve, reject) => {
	 let resultStr = await localizeObj(targetStr, lang)
		 console.log('newObj and key : ', newObj, key)
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
      return newObj[key] = await findString(lang, value, newObj[key], promiseArr)
    } else {
      newObj[key] = value
    }
		
  })
  return newObj
}

let srcToLocalize = {}
  let promiseArr = []
for (let i = 0; i < langs.length; i++) {
  srcToLocalize[langs[i]] = {}
  //let newObj = {} 
  let newObj = srcToLocalize[langs[i]] 
findString(langs[i], localObj, newObj, promiseArr)
/*/	  setTimeout(() =>
		  Promise.all(promiseArr).then(() => {
    writeJson(aPath + langs[i] + `/local_obj.js`, JSON.stringify(newObj));  	
    console.log('after promise all: ', newObj)
console.log('srcToLozalize: ', srcToLocalize)
    return
  })
	  , 100 * i)
*/
}

Promise.all(promiseArr).then((lang) => {
	for ( const [lang, json] of Object.entries(srcToLocalize)) {
	  console.log('language at promise all: ', lang)
    writeJson(aPath + lang + `/local_obj.js`, JSON.stringify(json));  	
    console.log('after promise all: ', json)
	}
    return
  })

console.log('srcToLozalize: ', srcToLocalize)
