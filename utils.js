const translate = require('translate-google')
const writeFile = require('write-file')

function lineFeedChange(value, otherVal) {
  if (value.includes('()')) {
    value = value.replace('()', '\n');
    otherVal = otherVal.replace('()', '\n')
  }
  return [value, otherVal]
}

function removeTagsInStr(value) {
  let regx = /(?:<style.+?>.+?<\/style>|<script.+?>.+?<\/script>|<(?:!|\/?[a-zA-Z]+).*?\/?>)/g
    , targetStr = value.replace(regx, '\t').trim()
    , multipleValue = targetStr.split('\t')
    , isValueArray	= multipleValue.length > 1 ? true : false   
    , isValueStr	= multipleValue.length === 1 ? true : false   

  // /H1\tabc



  return {
    targetStr,
    multipleValue,
    isValueArray,
    isValueStr	
  }
}

function isOnlySpace(val) {
  const onlySpace = /[^\s|^\n|^\t]/g
  return val.match(onlySpace) === null ? true : false
}

function putPathTagToValue(val, idx, strPath, localStr) {
  let tempVal = ''
  tempVal = strPath + '/tag' + idx + '\t' + val	+ '\n'

  return tempVal
}

function splitValueAsTag(val) {
  let splited = val.split('\t')
  //splited[1] = splited[1].trim()
  splited[1] = splited[1].trim().replace('\n', '()')



  //keysStr = keysStr + splited[0] + '\n'


  let splitedTag = splited[0]
    , splitedVal = splited[1]
  return {
    splitedTag, splitedVal
  }
}

module.exports = {
  writeJson: function writeJson(path, cont) {
    writeFile(path, cont, function (err) {


    })
  }
  ,
  localizeObj: async function localizeObj(content, lang) {
    let except = []

    //should split content if content length is too many to execute translate
    //return content

    return await translate(content, {to: lang, except: except}).then(res => {

      return res
    })
      .catch(async err => {

        return undefined
      })
  }
  ,
  addStr: function addStr(targetObj, targetObjKey, localStr) {
    Object.entries(targetObj).forEach(([key, value]) => {

      let strPath = targetObjKey ? targetObjKey + '/' + key : key
      if (typeof value === 'string') {

        //const objRemovedTag = removeTagsInStr(value)   
        const { targetStr, multipleValue, isValueArray, isValueStr } = removeTagsInStr(value)

        if (isValueArray) {
          multipleValue.forEach((val, idx) => {
	       let hasOnlySpace = isOnlySpace(val)          

            if (hasOnlySpace) return

            let valueWithPathTag = putPathTagToValue(val, idx, strPath, localStr)
            localStr.push(valueWithPathTag)
          })
        } else if (isValueStr) {
          let keyValue = strPath + '\t' + targetStr
          localStr.push(keyValue)

        }




        targetObj[key] = value 
        return
      } else if (typeof value === 'object') {

        targetObj[key] = {}
        return targetObj[key] = addStr(value, strPath, localStr)
      } 
      return
    })

    return targetObj
  }
  ,
  makeKeyPathReturnSrc: function makeKeyPathReturnSrc(localStr, srcStr, keyArr, keyObj) {
    let lastNonTag = ''
    localStr.forEach((val, idx) => {

	 let {splitedTag, splitedVal} = splitValueAsTag(val)
      //splitedVal = splitedVal.trim()
      keyArr.push(splitedTag)
      srcStr = localStr[idx +1] ? srcStr + splitedVal + '\n' : srcStr + splitedVal 
      localStr[idx] = splitedVal
      if(splitedTag.includes('tag0')) {
        lastNonTag = splitedTag.replace('/tag0', '')
        keyObj[lastNonTag] = [splitedVal]
      } else if (splitedTag.includes('tag') && !splitedTag.includes('tag0')) {
      //push value

        let isLastNonTagArray = typeof keyObj[lastNonTag] === 'object' ? true : false
        if (isLastNonTagArray) { 
          keyObj[lastNonTag] = [...keyObj[lastNonTag], splitedVal]
        } else {

          keyObj[lastNonTag] = [keyObj[lastNonTag], splitedVal]
        }




      }  else {
        keyObj[splitedTag] = splitedVal 
      }
      return	  
    })
    return srcStr	
  }
  ,
  objValWithKeyPath: function objValWithKeyPath(targetStr, keyObj, keyArr) {

    let lastNonTag = ''


    targetStr.forEach((val, idx) => {



	  if (keyArr[idx].includes('tag0')) { 
        lastNonTag = keyArr[idx].replace('/tag0', '')
        keyObj[lastNonTag] = [val]
	  } else if (keyArr[idx].includes('tag') && !keyArr[idx].includes('tag0')) {
      //push value
        if (typeof keyObj[lastNonTag] === 'object') { 
          keyObj[lastNonTag] = [...keyObj[lastNonTag], val]
        } else {
          keyObj[lastNonTag] = [keyObj[lastNonTag], val]
        }



      } else {
      }
      keyObj[keyArr[idx]] = val	
      return	
    })

    return
  }

  ,
  putStrIn: function putStrIn(targetObj, targetObjKey, keyObj, srcObj) {
    Object.entries(targetObj).forEach(([key, value]) => {
	 let strPath = targetObjKey ? targetObjKey + '/' + key : key
      if (typeof value === 'string') {
	    let replaceTarget = ''
	    , isKeyObjArray = typeof keyObj[strPath] === 'object' ? true : false







        if(isKeyObjArray) {
          keyObj[strPath].forEach((eachStr, keyObjIdx) => {




  	    replaceTarget = srcObj[strPath][keyObjIdx]
	    let tempArr = lineFeedChange(replaceTarget, eachStr)
            replaceTarget = tempArr[0]
            eachStr = tempArr[1]
            targetObj[key] = keyObjIdx === 0 ? value.replace(replaceTarget, eachStr) : targetObj[key].replace(replaceTarget, eachStr)

          })
        } else {
          replaceTarget = srcObj[strPath]
          let tempArr = lineFeedChange(replaceTarget, keyObj[strPath])	 
          replaceTarget = tempArr[0]
          keyObj[strPath] = tempArr[1]
          targetObj[key] = value.replace(replaceTarget, keyObj[strPath])

        }

        return
      } else if (typeof value === 'object') {

	 targetObj[key] = {}

        return targetObj[key] = putStrIn(value, strPath, keyObj, srcObj)
      } 
      return
    })
    return targetObj
  }


}
