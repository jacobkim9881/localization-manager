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

lineFeedToMark: function(value) {
    return value.trim().replace('\n', '()');
} 
}
