var assert = require('assert');

module.exports = {
 testTargetObj: function(value) {
    try {
      const typeOfValue = typeof value	
      assert.equal(typeOfValue, 'object')
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m','Target variable\'s type should be object: ', err)
    }
    return
  },
  testStr: function(value) {
    try {
      const typeOfValue = typeof value	
      assert.equal(typeOfValue, 'string')
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m','Target variable\'s type should be string: ', err)
    }
    return
  },
  testArr: function(value) {
    try {
      const isArray = Array.isArray(value) 
      assert.equal(isArray, true)
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m','Target variable\'s type should be array: ', err)
    }
    return
  },
	  testIdx: function(value) {
    try {
      const typeOfValue = typeof value
	, isNumber = typeOfValue === 'number' ? true : false
	, isString = typeOfValue === 'string' ? true : false
        , isNumberOrString = isNumber && !isNaN(value) || isString 
      assert.equal(isNumberOrString, true)
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m','Target variable\'s type should be string or number: ', err)
    }
    return
  },
}
