//
module.exports= {
		lineFeedChange: function lineFeedChange(value) {
    return value.replace('()', '\n');
},
removeTagsInStr: function removeTagsInStr(value) {
    return value.replace(/(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g, '\t').trim()
},
isOnlySpace: function isOnlySpace(val) {
  return val.match(/[^\s|^\n|^\t]/g) === null ? true : false
},

putPathTagToValue: function putPathTagToValue(val, idx, strPath, localStr) {
  return strPath + '/tag' + idx + '\t' + val + '\n'
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
