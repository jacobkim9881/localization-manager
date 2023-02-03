const {testStr, testIdx } = require('../test/test-misc')

module.exports= {
  lineFeedChange: function lineFeedChange(value, mark, to) {
    if (value.includes(mark)) {
      testStr(value)	  
      return value.replace(mark, '\n');
    } else if(to) {
      testStr(to)	    
      return to	
    } else {
      testStr(value)
      return value
    }
  },
  addStrToSrc: function (nextLine, src, newStr) {
  testStr(newStr)	  
  return nextLine ? src + newStr + '\n' : src + newStr
  },
  removeTagsInStr: function removeTagsInStr(value) {
    testStr(value)	  
	let removeTag =  value.replace(/(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g, '\t')
  ,remove2Tabs = removeTag.replace(/[\t]{2,}/g, '\t').trim()

	  return remove2Tabs
  },
  isOnlySpace: function isOnlySpace(value) {
    testStr(value)	  
    return value.match(/[^\s|^\n|^\t]/g) === null ? true : false
  },

  putPathTagToValue: function putPathTagToValue(value, idx, strPath) {
    testStr(strPath)	  
    testIdx(idx)	  
    testStr(value)	  
    return strPath + '/tag' + idx //+ '\t' + value + '\n'

  },

  lineFeedToMark: function(value, mark) {
    testStr(value)	  
    return value.trim().replace('\n', mark);
  },
  makeStringPath: function(tagName, tagIndex) {
    testStr(tagIndex)	  
    const strPath = tagName ? tagName + '/' + tagIndex : tagIndex
    return strPath	  
  }
}
