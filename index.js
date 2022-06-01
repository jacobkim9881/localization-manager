const translate = require('translate-google')
const writeFile = require('write-file')

const langsExplain = {
  af: 'Afrikaans',
  sq: 'Albanian',
  ar: 'Arabic',
  hy: 'Armenian',
  az: 'Azerbaijani',
  eu: 'Basque',
  be: 'Belarusian',
  bn: 'Bengali',
  bs: 'Bosnian',
  bg: 'Bulgarian',
  ca: 'Catalan',
  ceb: 'Cebuano',
  ny: 'Chichewa',
  'zh-cn': 'Chinese Simplified',
  'zh-tw': 'Chinese Traditional',
  co: 'Corsican',
  hr: 'Croatian',
  cs: 'Czech',
  da: 'Danish',
  nl: 'Dutch',
  en: 'English',
  eo: 'Esperanto',
  et: 'Estonian',
  tl: 'Filipino',
  fi: 'Finnish',
  fr: 'French',
  fy: 'Frisian',
  gl: 'Galician',
  ka: 'Georgian',
  de: 'German',
  el: 'Greek',
  gu: 'Gujarati',
  ht: 'Haitian Creole',
  ha: 'Hausa',
  haw: 'Hawaiian',
  iw: 'Hebrew',
  hi: 'Hindi',
  hmn: 'Hmong',
  hu: 'Hungarian',
  is: 'Icelandic',
  ig: 'Igbo',
  id: 'Indonesian',
  ga: 'Irish',
  it: 'Italian',
  ja: 'Japanese',
  jw: 'Javanese',
  kn: 'Kannada',
  kk: 'Kazakh',
  km: 'Khmer',
  ko: 'Korean',
  ku: 'Kurdish (Kurmanji)',
  ky: 'Kyrgyz',
  lo: 'Lao',
  la: 'Latin',
  lv: 'Latvian',
  lt: 'Lithuanian',
  lb: 'Luxembourgish',
  mk: 'Macedonian',
  mg: 'Malagasy',
  ms: 'Malay',
  ml: 'Malayalam',
  mt: 'Maltese',
  mi: 'Maori',
  mr: 'Marathi',
  mn: 'Mongolian',
  my: 'Myanmar (Burmese)',
  ne: 'Nepali',
  no: 'Norwegian',
  ps: 'Pashto',
  fa: 'Persian',
  pl: 'Polish',
  pt: 'Portuguese',
  ma: 'Punjabi',
  ro: 'Romanian',
  ru: 'Russian',
  sm: 'Samoan',
  gd: 'Scots Gaelic',
  sr: 'Serbian',
  st: 'Sesotho',
  sn: 'Shona',
  sd: 'Sindhi',
  si: 'Sinhala',
  sk: 'Slovak',
  sl: 'Slovenian',
  so: 'Somali',
  es: 'Spanish',
  su: 'Sudanese',
  sw: 'Swahili',
  sv: 'Swedish',
  tg: 'Tajik',
  ta: 'Tamil',
  te: 'Telugu',
  th: 'Thai',
  tr: 'Turkish',
  uk: 'Ukrainian',
  ur: 'Urdu',
  uz: 'Uzbek',
  vi: 'Vietnamese',
  cy: 'Welsh',
  xh: 'Xhosa',
  yi: 'Yiddish',
  yo: 'Yoruba',
  zu: 'Zulu'
}
, langs = Object.keys(langsExplain);


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

const fs = require('fs')
const path = require('path')

let fileName = 'test.json'
let contents = require('./target/en/' + fileName)
async function writeJson(dir, file, cont) {
await fs.promises.mkdir(path.dirname(dir), {recursive: true}).then(x => fs.promises.writeFile(dir + '/' + file, JSON.stringify(cont)))
	/*
writeFile(path, cont, function (err) {
  if (err) return console.log(err)
  console.log('file is written');	
})
	*/
}

async function nameWithLocalize(cont, lang) {
 return await translate(cont, {to: lang, except: []}).then(res => {
//	 console.log('res : ', res)
  return res
 })
  .catch(err => {
  console.log(err);
 })
}

async function loopLocalize(i, langs, result, contents, fileName) {
 for (const [key, value] of Object.entries(contents)) {
  let localized = await nameWithLocalize(value, langs[i])

 result[key] = localized	
	
 }
 let newPath = `./target/${langs[i]}`
 writeJson(newPath, fileName, result)	
 console.log(result)	
return result	
}

async function localizeByLangs() {

for (let i = 0; i < langs.length; i++) {
let result = {}	
result = loopLocalize(i, langs, result, contents, fileName)
// let localName = appName;
// nameWithLocalize(localName + ' - ', appName1, langs[i])	
//  .then((res) => putLocalInMessage(langs[i], messages, appDesc, res));
//console.log(result)	
}
}
localizeByLangs()
