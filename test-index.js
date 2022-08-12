var assert = require('assert');

module.exports = {
  testLanguageIdx: function(value) {
    try {
      value = parseInt(value)    
      const isValNaN = isNaN(value)    
	assert.equal(isValNaN, false)    
    } catch(err) {
      console.log('Target variable\'s type should be number: ', err)
    }
    if (value < 0 || value > 102) {
    console.log('Language index should be between 0 and 102 \n Language index: ', value)
    }
    return
  },
  testJsonData: function(value) {
    try {
      value = JSON.parse(value)
      const typeOfValue = typeof value	
      assert.equal(typeOfValue, 'object')
    } catch(err) {
      console.log('Target variable\'s type should be object: ', err)
    }
    return
  },
  testTargetObj: function(value) {
    try {
      const typeOfValue = typeof value	
      assert.equal(typeOfValue, 'object')
    } catch(err) {
      console.log('Target variable\'s type should be object: ', err)
    }
    return
  },
  testStr: function(value) {
    try {
      const typeOfValue = typeof value	
      assert.equal(typeOfValue, 'string')
    } catch(err) {
      console.log('Target variable\'s type should be string: ', err)
    }
    return
  }


}
