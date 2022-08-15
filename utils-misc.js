const {testStr, testIdx } = require('./test-misc')

module.exports= {
  lineFeedChange: function lineFeedChange(value) {
    testStr(value)	  
    return value.replace('()', '\n');
  },
  removeTagsInStr: function removeTagsInStr(value) {
    testStr(value)	  
    return value.replace(/(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g, '\t').trim()
  },
  isOnlySpace: function isOnlySpace(value) {
    testStr(value)	  
    return value.match(/[^\s|^\n|^\t]/g) === null ? true : false
  },

  putPathTagToValue: function putPathTagToValue(value, idx, strPath) {
    testStr(strPath)	  
    testIdx(idx)	  
    testStr(value)	  
    return strPath + '/tag' + idx + '\t' + value + '\n'
  },

  lineFeedToMark: function(value) {
    testStr(value)	  
    return value.trim().replace('\n', '()');
  } 
}
