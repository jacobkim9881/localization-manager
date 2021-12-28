const translate = require('translate-google')
const writeFile = require('write-file')
const path = require('path')
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
let aPath = path.normalize(`../_locales/`)

, appName = "Cursor Tails"
, appName1 = "Animations for your mouse"
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
 let rPath = path.normalize(aPath + lang + `/messages.json`);
 writeJson(rPath, JSON.stringify(messages));  	 
 }).catch(err => {
  console.log(err);
 })	
}

for (let i = 0; i < langs.length; i++) {
 let localName = appName;
 nameWithLocalize(localName + ' - ', appName1, langs[i])	
  .then((res) => putLocalInMessage(langs[i], messages, appDesc, res));
}
