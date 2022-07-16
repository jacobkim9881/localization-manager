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

let aPath = `/home/kim/tailing-mouse-footprint/_locales/`

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
// writeJson(aPath + langs[i] + `/messages.json`, JSON.stringify(messages));  	 
 }).catch(err => {
  console.log(err);
 })	
}

async function localizeObj(content, lang, key) {
return await translate(content, {to: lang, except: []}).then(res => {
	console.log(res)
	key = res
return res

})

return
}

async function findString(newObj, lang, localObj) {
Object.entries(localObj).forEach(async ([key, value], idx, arr) => {
	//for (const [key, value, idx] of Object.entries(localObj)) {
 newObj[key] = {}
//	console.log('idx: ', idx)
 if (typeof value === 'string') {
  newObj[key] = await localizeObj(value, lang, newObj[key])
 } else if (typeof value === 'object') {
   findString(newObj, lang, value)
 } else {
   newObj[key] = value
 }
//}
	//
if (idx === (arr.length - 1)) {
console.log('localized fin : ', newObj)
}
		
})
	return
}


for (let i = 0; i < 1; i++) {
let newObj = {}
	findString(newObj, langs[i], localObj)
	console.log(newObj)
	
setTimeout(() => console.log(newObj), 5000)
}
/*
for (let i = 0; i < 1; i++) {
 let localName = appName;
 nameWithLocalize(localName + ' - ', appName1, langs[i])	
  .then((res) => putLocalInMessage(langs[i], messages, appDesc, res));
}
*/
