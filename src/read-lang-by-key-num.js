const langCode = require('./lang_code')
let inputIndex = process.argv[2]
console.log(Object.keys(langCode)[inputIndex])
