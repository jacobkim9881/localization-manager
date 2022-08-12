var assert = require('assert');
const {writeJson, localizeObj} = require ('./utils')

function testWriteJson() {
writeJson('1.js', '1')

	return
}

async function testLocalizeObj() {
  try {
  let value = await localizeObj('apple', 'af')
  , typeOfValue = typeof value	
  console.log('Testing localizeObj()')	  
  assert.equal(typeOfValue, 'string')
  } catch(err) {
  console.log('test localizeObj err: ', err)
  }
	return
}

testLocalizeObj()

