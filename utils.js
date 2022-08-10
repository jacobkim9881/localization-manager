const translate = require('translate-google')
const writeFile = require('write-file')
const {lineFeedChange, lineFeedToMark, removeTagsInStr, isOnlySpace, putPathTagToValue} = require('./utils-misc')

module.exports = {
  writeJson: function writeJson(path, cont) {
    writeFile(path, cont, function (err) {
      if (err) return console.log(err)
      console.log('file is written');	
    })
  }
  ,
  localizeObj: async function localizeObj(content, lang) {
    let except = []
    //console.log(content)
    //should split content if content length is too many to execute translate
    //return content
    console.log('Target language: ', lang)
    return await translate(content, {to: lang, except: except}).then(res => {
    	//console.log('res: ', res)
      return res
    })
      .catch(async err => {
        console.log('error while localize: ', err)
        return undefined
      })
  }
  ,
  addStr: function addStr(targetObj, tagName, arrayOfStringsWithTagPath) {
	  //arrayOfStringsWithTagPath
    Object.entries(targetObj).forEach(([tagNumber, value]) => {

      let strPath = tagName ? tagName + '/' + tagNumber : tagNumber
      if (typeof value === 'string') {
      //console.log('key value: ', value)
        const strRemovedTag = removeTagsInStr(value)    
          , arrayOfTags = strRemovedTag.split('\t')
          , isValueArray= arrayOfTags.length > 1 ? true : false   
          , isValueStr	= arrayOfTags.length === 1 ? true : false   
        //const { targetStr, multipleValue, isValueArray, isValueStr } = removeTagsInStr(value)
        //console.log('strPath: ', strPath)
        if (isValueArray) {
          arrayOfTags.forEach((val, idx) => {
	       let hasOnlySpace = isOnlySpace(val)          
            //console.log( 'is empty: ', val.match(onlySpace))
            if (hasOnlySpace) return

            let valueWithPathTag = putPathTagToValue(val, idx, strPath, arrayOfStringsWithTagPath)
		 //console.log('value with path tag: ', valueWithPathTag)
            arrayOfStringsWithTagPath.push(valueWithPathTag)
          })
        } else if (isValueStr) {
          let keyValue = strPath + '\t' + strRemovedTag
          arrayOfStringsWithTagPath.push(keyValue)
        //console.log('key value: ', keyValue)
        }
        //console.log('strRemovedTag: ', strRemovedTag)
        //console.log('array of html tags text without tag: ', arrayOfTags)
        //console.log('array which have strings added each tag path: ', arrayOfStringsWithTagPath)
        //console.log('key value: ', value)
        targetObj[tagNumber] = value 
        return
      } else if (typeof value === 'object') {
      //console.log('targetObj : ', targetObj, tagNumber)
        targetObj[tagNumber] = {}
        return targetObj[tagNumber] = addStr(value, strPath, arrayOfStringsWithTagPath)
      } 
      return
    })
    //console.log('targetObj in func: ', targetObj, targetObjKey, localObj)
    return targetObj
  }
  ,
  makeKeyPathReturnSrc: function makeKeyPathReturnSrc(localStr, srcStr, keyArr, keyObj) {
    let lastNonTag = ''
    localStr.forEach((val, idx) => {
    //console.log(idx, val)
      let [splitedTag, splitedVal] = val.split('\t')
      function logSplitedTag(splitedTag, splitedVal) {    
        console.log('splited Tag:', splitedTag)    
        console.log('splited value:', splitedVal)    
      }
      //logSplitedTag(splitedTag, splitedVal)    
	    splitedVal = lineFeedToMark(splitedVal)
      keyArr.push(splitedTag)
      srcStr = localStr[idx +1] ? srcStr + splitedVal + '\n' : srcStr + splitedVal 
      localStr[idx] = splitedVal
      if(splitedTag.includes('tag0')) {
        lastNonTag = splitedTag.replace('/tag0', '')
        keyObj[lastNonTag] = [splitedVal]
      } else if (splitedTag.includes('tag') && !splitedTag.includes('tag0')) {
      //push value
      //console.log('keyObj[lastNonTag] :', keyObj[lastNonTag])
        let isLastNonTagArray = typeof keyObj[lastNonTag] === 'object' ? true : false
        if (isLastNonTagArray) { 
          keyObj[lastNonTag] = [...keyObj[lastNonTag], splitedVal]
        } else {
        //console.log('typeof keyObj[lastNonTag] :', typeof Object.values(keyObj[lastNonTag])[0])
          keyObj[lastNonTag] = [keyObj[lastNonTag], splitedVal]
        }
      //console.log('typeof keyObj[lastNonTag] :', typeof Object.values(keyObj[lastNonTag])[0])
      //console.log('length of keyObj[lastNonTag] :', keyObj[lastNonTag].length)
      //console.log('keyObj[lastNonTag] :', keyObj[lastNonTag])
      //console.log('lastNonTag: ', lastNonTag)
      }  else {
        keyObj[splitedTag] = splitedVal 
      }
      return	  
    })
    return srcStr	
  }
  ,
  objValWithKeyPath: function objValWithKeyPath(targetStr, keyObj, keyArr) {
    //	console.log('keyObj before function: ', keyObj)
    let lastNonTag = ''
    //console.log('targetStr after poping empty str: ', targetStr)
    //console.log('targetStr length after poping empty str: ', targetStr.length)
    targetStr.forEach((val, idx) => {
    //console.log('idx at targetStr each: ', idx)
    //console.log('val at targetStr each: ', val)
    //console.log('key arr[idx] : ', keyArr[idx])
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
      //console.log('typeof keyObj[lastNonTag] :', typeof Object.values(keyObj[lastNonTag])[0])
      //console.log('length of keyObj[lastNonTag] :', keyObj[lastNonTag].length)
      //console.log('keyObj[lastNonTag] :', keyObj[lastNonTag])
      } else {
      }
      keyObj[keyArr[idx]] = val	
      return	
    })
    //console.log('keyObj after function: ', keyObj)
    return
  }

  ,
  putStrIn: function putStrIn(targetObj, targetObjKey, keyObj, srcObj) {
    Object.entries(targetObj).forEach(([key, value]) => {
	 let strPath = targetObjKey ? targetObjKey + '/' + key : key
      if (typeof value === 'string') {
	    let replaceTarget = ''
	    , isKeyObjArray = typeof keyObj[strPath] === 'object' ? true : false
        // console.log(' value: ', value)
        //console.log('str path : ', strPath)
        //console.log('found value: ', keyObj[strPath])

	    //console.log('type of each keyObj[strPath] :', typeof keyObj[strPath])
        //console.log('scrObj: ', srcObj)
	    //console.log('each keyObj[strPath] :', keyObj[strPath])
        if(isKeyObjArray) {
          keyObj[strPath].forEach((eachStr, keyObjIdx) => {
          //console.log('localized eachStr: ', eachStr)
          //	console.log('target str arr: ', srcObj[strPath])
          //console.log('target str : ', srcObj[strPath][keyObjIdx])
          	//console.log('src str: ', value)
  	    replaceTarget = srcObj[strPath][keyObjIdx]
	    replaceTarget = replaceTarget.includes('()') ? lineFeedChange(replaceTarget) : replaceTarget 
	    eachStr = replaceTarget.includes('()') ? lineFeedChange(eachStr) : eachStr
            targetObj[key] = keyObjIdx === 0 ? value.replace(replaceTarget, eachStr) : targetObj[key].replace(replaceTarget, eachStr)
 	    //console.log('put targetObj[key]: ', targetObj[key])
          })
        } else {
          replaceTarget = srcObj[strPath]
	    replaceTarget = replaceTarget.includes('()') ? lineFeedChange(replaceTarget) : replaceTarget 
	    keyObj[strPath] = replaceTarget.includes('()') ? lineFeedChange(keyObj[strPath]) : keyObj[strPath]
          targetObj[key] = value.replace(replaceTarget, keyObj[strPath])
        //console.log('srcObj[strPath]: ', srcObj[strPath])		
        }
        //console.log('put targetObj[key]: ', targetObj[key])
        return
      } else if (typeof value === 'object') {
      // console.log('targetObj : ', targetObj, key)
	 targetObj[key] = {}
        // console.log('after recursive: ', putStrIn(value, strPath, keyObj))
        return targetObj[key] = putStrIn(value, strPath, keyObj, srcObj)
      } 
      return
    })
    return targetObj
  }


}
