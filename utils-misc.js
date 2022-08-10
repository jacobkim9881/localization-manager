//
module.exports= {
		lineFeedChange: function lineFeedChange(value) {
    return value.replace('()', '\n');
},
lineFeedChange1: function lineFeedChange(value, otherVal) {
  if (value.includes('()')) {
    value = value.replace('()', '\n');
    otherVal = otherVal.replace('()', '\n')
  }
  return [value, otherVal]
},

removeTagsInStr: function removeTagsInStr(value) {
  let regx = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g
    , targetStr = value.replace(regx, '\t').trim()
    , multipleValue = targetStr.split('\t')
    , isValueArray	= multipleValue.length > 1 ? true : false   
    , isValueStr	= multipleValue.length === 1 ? true : false   
  //console.log('targetStr: ', targetStr)
  // /H1\tabc
  //console.log('multiple value: ', multipleValue)
  //console.log('check multiple value: ', isValueArray)

  return {
    targetStr,
    multipleValue,
    isValueArray,
    isValueStr	
  }
},

isOnlySpace: function isOnlySpace(val) {
  const onlySpace = /[^\s|^\n|^\t]/g
  return val.match(onlySpace) === null ? true : false
},

putPathTagToValue: function putPathTagToValue(val, idx, strPath, localStr) {
  let tempVal = ''
  tempVal = strPath + '/tag' + idx + '\t' + val	+ '\n'
  console.log('tempVal : ', tempVal)
  return tempVal
},

splitValueAsTag: function splitValueAsTag(val) {
  let splited = val.split('\t')
  //splited[1] = splited[1].trim()
  splited[1] = splited[1].trim().replace('\n', '()')
  //console.log('val :', val)
  //console.log('splited : ', splited[1])
  //console.log('typeof splited : ', typeof splited[1])
  //keysStr = keysStr + splited[0] + '\n'
  //console.log('splited at localStr: ', splited)
  //console.log('splited: ', splited)
  let splitedTag = splited[0]
    , splitedVal = splited[1]
  return {
    splitedTag, splitedVal
  }
}
}
