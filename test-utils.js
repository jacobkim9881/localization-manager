var assert = require('assert');

module.exports = {
  testLanguageIdx: function(value) {
    try {
      value = parseInt(value)    
      const isValNaN = isNaN(value)    
	assert.equal(isValNaN, false)    
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m','Target variable\'s type should be number: ', err)
    }
    if (value < 0 || value > 102) {
    console.log('\x1b[31m%s\x1b[0m','Language index should be between 0 and 102 \n Language index: ', value)
    }
    return
  },
  testJsonData: function(value) {
    try {
      value = JSON.parse(value)
      const typeOfValue = typeof value	
      assert.equal(typeOfValue, 'object')
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m','Target variable\'s type should be object: ', err)
    }
    return
  },
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
testTagName: function(value, path) {
    try {
      const typeOfValue = typeof value	
	, isString = typeOfValue === 'string' ? true : false
	, isUndefined = value === undefined ? true : false

	   if (isUndefined) {
		   console.log('Tag name is undefined at: ', path)
		  // console.log('Tag name chould be undefined at first recursive function or it could be err.')
	   }
	    else {
      assert.equal(typeOfValue, 'string')
	    }
    } catch(err) {
      console.log('\x1b[31m%s\x1b[0m','Target variable\'s type should be string: ', err)
    }
    return
  },

}
