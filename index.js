const translate = require('translate-google')
const writeFile = require('write-file')
const langsExplain = require('./lang_code')
const langs = Object.keys(langsExplain);
const localObj = require('./local_obj')

console.log(langs)
///home/kim/tailing-mouse-footprint/_locales/en
/*
writeFile('foo/bar/baz/qux.txt', 'some contents', function (err) {
  if (err) return console.log(err)
  console.log('file is written')
})
*/

//let aPath = `/home/kim/tailing-mouse-footprint/_locales/`
let aPath = `Users/mac/localization-manager/_locales/`

, appName = "Cursor Tails"
, appName1 = "Object Animation for mouse cursor"
, appDesc = "Adding funny effects whenever you move your mouse. This extension make your mouse moving create fun effects." 
, messages = {
 "appName": {
   "message": "",
   "description": "The title of the application, displayed in the web store."
 },
 "appDesc": {                  
   "message": "",
   "description": "The description of the application, displayed in the web store."
 }
}

function writeJson(path, cont) {
writeFile(path, cont, function (err) {
  if (err) return console.log(err)
  console.log('file is written');	
})
}

async function nameWithLocalize(name, cont, lang) {
 return await translate(cont, {to: lang, except: []}).then(res => {
 name = name + res;	
	 console.log(name)
 return name;	 
 })
  .catch(err => {
  console.log(err);
 })
}

async function putLocalInMessage(lang, obj, cont1, cont2) {
 await translate(cont1, {to: lang, except: []}).then(res => {
 obj.appName.message = cont2;
 obj.appDesc.message = res;
 console.log(obj);	 
 writeJson(aPath + langs[i] + `/local_obj.js`, JSON.stringify(messages));  	 
 }).catch(err => {
  console.log(err);
 })	
}

async function localizeObj(content, lang) {
	//(?:<style.+?>.+?</style>|<script.+?>.+?</script>|<(?:!|/?[a-zA-Z]+).*?/?>)
	///(\?:<style\.\+\?>\.\+\?<\/style>\|<script\.\+\?>\.\+\?<\/script>\|<\(\?:!\|\/\?\[a-zA-Z\]\+\)\.\*\?\/\?>)/i
	let except = []
	let tag = '?:<style.+?>.+?</style>|<script.+?>.+?</script>|<(?:!|/?[a-zA-Z]+).*?/?>'
	, slashs = '(\.'
	except = []
		//[tag]
		//[tag, slashs]
	console.log(content)
return await translate(content, {to: lang, except: except}).then(res => {
//	console.log('res: ', res)
return res

})

return
}

async function findString(lang, localObj) {
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
		 ///(?:<style.+?>.+?</style>|<script.+?>.+?</script>|<(?:!|/?[a-zA-Z]+).*?/?>)/g
  let targetStr = value.replace(regx, '').trim()
		 //value.match(regx) 
//console.log(targetStr)
	 if (targetStr === '') {
		 //console.log('empty string')
	return
	 }
	 let aPromise = new Promise((resolve, reject) => {
	 let resultStr = await localizeObj(targetStr, lang)
  //localObj[key] = await localizeObj(targetStr, lang)
  localObj[key] = value.replace(targetStr, resultStr)
		 resolve()
	 })
	 promiseArr.push(aPromise)
 } else if (typeof value === 'object') {
  return localObj[key] = await findString(lang, value)
 } else {
   localObj[key] = value
 }
if (idx === (arr.length - 1)) {
//console.log('localized fin : ', localObj)
}
		
})
	return localObj
}


for (let i = 0; i < 1; i++) {
	let promiseArr = []
let newObj = {}
	findString(langs[i], localObj)

//localizeObj(localObj, langs[i])	
	
PromiseAll(promiseArr).then(() => {
 writeJson(aPath + langs[i] + `/local_obj.js`, JSON.stringify(messages));  	 
//	return localObj 
})
}

/*
for (let i = 0; i < 1; i++) {
 let localName = appName;
 nameWithLocalize(localName + ' - ', appName1, langs[i])	
  .then((res) => putLocalInMessage(langs[i], messages, appDesc, res));
}
*/
