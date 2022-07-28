//
const writeFile = require('write-file')
let path = 'selector.html'
, langCode = require('./lang_code.js')
, cont = `<select name="country">`
for(const [key, val] of Object.entries(langCode)) {
let optTag = `<option value="${key}">${val}</option>`
cont = cont + '\n\t' + optTag
}
cont = cont + '\n</select>' 
writeFile(path, cont, (err) => {
console.log('fin')
})

