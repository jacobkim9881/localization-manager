const translate = require('translate-google')
const writeFile = require('write-file')
const {lineFeedChange, lineFeedToMark, addStrToSrc, removeTagsInStr, isOnlySpace, putPathTagToValue, makeStringPath} = require('./utils-misc')
const {testLanguageIdx, testJsonData, testTargetObj, testStr, testArr, testTagName} = require('../test/test-utils')

module.exports = {
  writeJson: function writeJson(path, content) {
    testStr(path)	  
    testStr(content)	  
    writeFile(path, content, function (err) {	    
      if (err) return console.log(err)
      console.log('file is written');	
    })
  }
  ,
  localizeObj: async function localizeObj(content, lang) {
    let except = []
    testStr(content)	  
    testStr(lang)	  
    //console.log(content)
    //should split content if content length is too many to execute translate
    //return content
    console.log('Target language: ', lang)
    return await translate(content, {to: lang, except: except}).then(res => {
      testStr(res)	  
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
	  testTargetObj(targetObj)
	  testTagName(tagName, arrayOfStringsWithTagPath)
	  testArr(arrayOfStringsWithTagPath)
    Object.entries(targetObj).forEach(([tagIndex, value]) => {
      const strPath = makeStringPath(tagName, tagIndex) 
        , valueType = typeof value
//console.log('valueType: ', valueType)
        //console.log('key value: ', value)
      switch (valueType) {   
      case 'object': 
      //console.log('targetObj : ', targetObj, tagIndex)
        targetObj[tagIndex] = {}
        return targetObj[tagIndex] = addStr(value, strPath, arrayOfStringsWithTagPath)
        break

      default: // case as 'string'		
        //console.log('targetObj : ', targetObj, tagIndex)
        //console.log('key value: ', value)
        const strRemovedTag = removeTagsInStr(value)    
          , arrayOfTags = strRemovedTag.split('\t')
	      // change to Array.isArray(val) 
	      // and test it
          , isValueArray= arrayOfTags.length > 1 ? true : false   
          , isValueStr	= arrayOfTags.length === 1 ? true : false  
        //console.log('isValueArry: ', isValueArray, 'isValStr: ', isValueStr)	
        //console.log('strPath: ', strPath)
        arrayOfTags.forEach((val, idx) => {
	       let hasOnlySpace = isOnlySpace(val)          
            if (hasOnlySpace && isValueArray) return

          const valueWithPathTag = isValueArray ? putPathTagToValue(val, idx, strPath, arrayOfStringsWithTagPath) : strPath + '\t' + strRemovedTag
		 //console.log('value with path tag: ', valueWithPathTag)
          arrayOfStringsWithTagPath.push(valueWithPathTag)
        })

        //console.log('strRemovedTag: ', strRemovedTag)
        //console.log('array of html tags text without tag: ', arrayOfTags)
        //console.log('array which have strings added each tag path: ', arrayOfStringsWithTagPath)
        //console.log('key value: ', value)
        targetObj[tagIndex] = value 
        return
        break		
      }
	    
      return
    })
    //console.log('targetObj in func: ', targetObj)
    return targetObj
  }
  ,
  makeKeyPathReturnSrc: function makeKeyPathReturnSrc(targetObj, srcStr, keyArr, keyObj) {	
	  testTargetObj(targetObj)
	  testTargetObj(keyObj)
	  testArr(keyArr)
	  testStr(srcStr)
    let lastNonTag = ''
    targetObj.forEach((val, idx) => {
    //console.log(idx, val)
      let [splitedTag, splitedVal] = val.split('\t')
	    , mark = '()'
      function logSplitedTag(splitedTag, splitedVal) {    
        console.log('splited Tag:', splitedTag)    
        console.log('splited value:', splitedVal)    
      }
      //logSplitedTag(splitedTag, splitedVal)    
	    splitedVal = lineFeedToMark(splitedVal, mark)
      keyArr.push(splitedTag)
      srcStr = addStrToSrc(targetObj[idx +1], srcStr, splitedVal) 
      testStr(srcStr)	    
      targetObj[idx] = splitedVal
      if(splitedTag.includes('tag0')) {
        lastNonTag = splitedTag.replace('/tag0', '')
	      testStr(lastNonTag)
        keyObj[lastNonTag] = [splitedVal]
      } else if (splitedTag.includes('tag') && !splitedTag.includes('tag0')) {
      //push value
      //console.log('keyObj[lastNonTag] :', keyObj[lastNonTag])
        keyObj[lastNonTag] = Array.isArray(keyObj[lastNonTag]) ? [...keyObj[lastNonTag], splitedVal] : [keyObj[lastNonTag], splitedVal]
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
  objValWithKeyPath: function objValWithKeyPath(targetArr, keyObj, keyArr) {
	  testArr(targetArr)
	  testTargetObj(keyObj)
	  testArr(keyArr)
    //	console.log('keyObj before function: ', keyObj)
    let lastNonTag = ''
    //console.log('targetArr after poping empty str: ', targetArr)
    //console.log('targetArr length after poping empty str: ', targetArr.length)
    targetArr.forEach((val, idx) => {
    //console.log('idx at targetArr each: ', idx)
    //console.log('val at targetArr each: ', val)
    //console.log('key arr[idx] : ', keyArr[idx])
	  if (keyArr[idx].includes('tag0')) { 
        lastNonTag = keyArr[idx].replace('/tag0', '')
        keyObj[lastNonTag] = [val]
	  } else if (keyArr[idx].includes('tag') && !keyArr[idx].includes('tag0')) {
      //push value
          keyObj[lastNonTag] = Array.isArray(keyObj[lastNonTag]) ? [...keyObj[lastNonTag], val] : [keyObj[lastNonTag], val]
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
	  testTargetObj(targetObj)
	  testTagName(targetObjKey)
	  testTargetObj(keyObj)
	  testTargetObj(srcObj)

    Object.entries(targetObj).forEach(([key, value]) => {
      const strPath = makeStringPath(targetObjKey, key) 
	    , typeofValue = typeof value
      testStr(strPath)  

      switch(typeofValue) {
      case 'object': 
      // console.log('targetObj : ', targetObj, key)
	 targetObj[key] = {}
        // console.log('after recursive: ', putStrIn(value, strPath, keyObj))
        return targetObj[key] = putStrIn(value, strPath, keyObj, srcObj)
        break

      default: 
        let replaceTarget = ''
	      , mark = '()'
	    , isKeyObjArray = Array.isArray(keyObj[strPath])
        //console.log(' value: ', value)
        //console.log('str path : ', strPath)
        //console.log('found value: ', keyObj[strPath])
	    //console.log('type of each keyObj[strPath] :', typeof keyObj[strPath])
        //console.log('scrObj: ', srcObj)
	    //console.log('each keyObj[strPath] :', keyObj[strPath])
        if(isKeyObjArray) {
          keyObj[strPath].forEach((eachStr, keyObjIdx) => {
            testStr(eachStr)	  
            //console.log('localized eachStr: ', eachStr)
            //	console.log('target str arr: ', srcObj[strPath])
            //console.log('target str : ', srcObj[strPath][keyObjIdx])
          	//console.log('src str: ', value)
  	    replaceTarget = srcObj[strPath][keyObjIdx]
            replaceTarget = lineFeedChange(replaceTarget, mark)  
            targetObj[key] = keyObjIdx === 0 ? value.replace(replaceTarget, eachStr) : targetObj[key].replace(replaceTarget, eachStr)
 	    //console.log('put targetObj[key]: ', targetObj[key])
          })
        } else {
          replaceTarget = srcObj[strPath]
          //console.log(srcObj)
          //console.log(strPath)
          //console.log(replaceTarget)
          replaceTarget = lineFeedChange(replaceTarget, mark)  

          targetObj[key] = value.replace(replaceTarget, keyObj[strPath])
        //console.log('srcObj[strPath]: ', srcObj[strPath])		
        }
        testStr(replaceTarget)      
        //console.log('put targetObj[key]: ', targetObj[key])
        return
        break
      }
      return
    })
    return targetObj
  }


}
