const translate = require('translate-google')
async function localizeObj(content, lang) {
	console.log(content)
return await translate(content, {to: lang, except: []}).then(res => {
	console.log('res: ', res)
return res

})

return
}

localizeObj('', 'ko')
