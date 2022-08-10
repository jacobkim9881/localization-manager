//
module.exports= {
		lineFeedChange: function lineFeedChange(value) {
    return value.replace('()', '\n');
},
removeTagsInStr: function removeTagsInStr(value) {
  let regx = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g
    return value.replace(regx, '\t').trim()
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
