var assert = require('assert');

module.exports = {
  testTargetObj: function(value) {
    try {
      value = JSON.parse(value)
      const typeOfValue = typeof value	
      assert.equal(typeOfValue, 'object')
    } catch(err) {
      console.log('Target variable\'s type should be object')
    }
    return
  }

}
