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
  addStr: function addStr(targetObj, tagName, srcObj) {
	  testTargetObj(targetObj)
    Object.entries(targetObj).forEach(([tagIndex, value]) => {
      const strPath = makeStringPath(tagName, tagIndex) 
        , valueType = typeof value
//console.log('valueType: ', valueType)
        //console.log('key value: ', value)
      switch (valueType) {   
      case 'object': 
      //console.log('targetObj : ', targetObj, tagIndex)
        targetObj[tagIndex] = {}
        return targetObj[tagIndex] = addStr(value, strPath, srcObj)
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
	console.log('arrayOfTags: ', arrayOfTags)		    
        arrayOfTags.forEach((val, idx) => {
	       let hasOnlySpace = isOnlySpace(val)          

            //console.log( 'is empty: ', hasOnlySpace)
            if (hasOnlySpace && isValueArray) return
//console.log('has idx 1: ', arrayOfTags[idx + 1])
        if (idx === 0 && arrayOfTags[idx + 1]) srcObj[strPath] = []
		//console.log('val: ', srcObj[strPath])
		//console.log('path: ', strPath)
		//console.log('objl: ', srcObj)
	if (isValueArray) {
	let testPath = putPathTagToValue(val, idx, strPath)
		//srcObj[testPath] = val
		//srcObj[testPath].push(val) 		

		srcObj[strPath].push(val) 

	} else {
		srcObj[strPath] = val
		} 
        })

        //console.log('strRemovedTag: ', strRemovedTag)
        //console.log('array of html tags text without tag: ', arrayOfTags)
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
  makeKeyPathReturnSrc: function makeKeyPathReturnSrc(srcStr, keyArr, keyObj) {
	  //console.log('keyObj at makeKeyPathReturnSrc: ', keyObj)
  //makeKeyPathReturnSrc: function makeKeyPathReturnSrc(targetObj, srcStr, keyArr, keyObj) {	
	  //testTargetObj(targetObj)
	  testTargetObj(keyObj)
	  testArr(keyArr)
	  testStr(srcStr)
	let tEntries = Object.entries(keyObj)
	  console.log('tEntries: ', tEntries)
	  tEntries.forEach( (arr, idx) => {
	  //for (const [key, val] of Object.entries(keyObj)) {
//    targetObj.forEach((val, idx) => {
    console.log('makeKeyPathReturnSrc idx and arr: ', idx, arr)
      //let [splitedTag, splitedVal] = val.split('\t')
      let [splitedTag, splitedVal] = [arr[0], arr[1]]
      //let [splitedTag, splitedVal] = [key, val]
	    , mark = '()'
		  , tagMark = '[]'
      function logSplitedTag(splitedTag, splitedVal) {    
        console.log('splited Tag:', splitedTag)    
        console.log('splited value:', splitedVal)    
      }
      //logSplitedTag(splitedTag, splitedVal)    
	 if (Array.isArray(splitedVal)) {
		 let multiTag = ''
		 , putMark = ''
		 splitedVal.forEach((valu, indx) => {
			 multiTag = multiTag + 'tag'
			 putMark = splitedVal[indx + 1] ? putMark + valu + tagMark : putMark + valu
//keyArr.push(putPathTagToValue(valu, indx, splitedTag))
			 console.log('pushed key: at makeKeyP: ', putPathTagToValue(valu, indx, splitedTag))
		 })
		 splitedTag = splitedTag + multiTag
//keyArr.unshift(putPathTagToValue(valu, indx, splitedTag))
keyArr.push(splitedTag)
		splitedVal = putMark
		 //splitedVal = splitedVal.join(' ') 
	 } else { splitedVal = lineFeedToMark(splitedVal, mark)
      keyArr.push(splitedTag)
		 //unshift for right order
      //keyArr.unshift(splitedTag)
			 console.log('pushed key: at makeKeyP: ', splitedTag)
	 }
    console.log('key arr after push : ', keyArr)
      //srcStr = addStrToSrc(targetObj[idx +1], srcStr, splitedVal) 
      srcStr = addStrToSrc(tEntries[idx +1], srcStr, splitedVal) 
		  //console.log('srcStr: ', srcStr)
      testStr(srcStr)	    
      //targetObj[idx] = splitedVal
          return	  
   // }
    })
    return srcStr	
  }
  ,
  objValWithKeyPath: function objValWithKeyPath(targetArr, keyObj, keyArr) {
	  testArr(targetArr)
	  testTargetObj(keyObj)
	  testArr(keyArr)
    	console.log('keyObj before function: ', keyObj)
    let lastNonTag = ''
    console.log('targetArr after poping empty str: ', targetArr)
    //console.log('targetArr length after poping empty str: ', targetArr.length)
    targetArr.forEach((val, idx) => {
    //console.log('idx at targetArr each: ', idx)
    //console.log('val at targetArr each: ', val)
    console.log('key arr[idx] : ', keyArr[idx])
	    //values with tags do not have tag0 string
	  if (keyArr[idx].includes('tag')) {
	 	let arrTranslated = keyObj[lastNonTag].split('[]')
		  keyObj[lasgNontag] = arrTranslated
	  }
	 /* if (keyArr[idx].includes('tag0')) { 
        lastNonTag = keyArr[idx].replace('/tag0', '')
		  console.log('arr created: ', lastNonTag)
        keyObj[lastNonTag] = [val]
	  } else if (keyArr[idx].includes('tag') && !keyArr[idx].includes('tag0')) {
      //push value
          keyObj[lastNonTag] = Array.isArray(keyObj[lastNonTag]) ? [...keyObj[lastNonTag], val] : [keyObj[lastNonTag], val]
	      //console.log('typeof keyObj[lastNonTag] :', typeof Object.values(keyObj[lastNonTag])[0])
      //console.log('length of keyObj[lastNonTag] :', keyObj[lastNonTag].length)
      console.log('keyObj[lastNonTag] :', keyObj[lastNonTag])
      }*/
	    else {
      keyObj[keyArr[idx]] = val	
      }
      return	
    })
    console.log('keyObj after function: ', keyObj)
    return
  }

  ,
  putStrIn: function putStrIn(targetObj, targetObjKey, keyObj, srcObj) {
	  testTargetObj(targetObj)
	  testTagName(targetObjKey)
	  testTargetObj(keyObj)
	  testTargetObj(srcObj)
	  //for some value of keyObj should have each array
	//console.log('keyObj: ', keyObj)
	  //srcObj has an error
	  //console.log('srcObj: ', srcObj)
	  //console.log('targetObjKey : ', targetObjKey)
	  //
	  //
	  //should have pass if keyObj's key has tag0 some value.
	  //
    Object.entries(targetObj).forEach(([key, value]) => {
       //console.log('targetObj : ', targetObj, key)
      const strPath = makeStringPath(targetObjKey, key) 
	    , typeofValue = typeof value
      testStr(strPath)  
//console.log('strPath: ', strPath)
      switch(typeofValue) {
      case 'object': 
      // console.log('targetObj : ', targetObj, key)
		  //console.log('objs value: ', value)
	 targetObj[key] = {}
         //console.log('after recursive: ', putStrIn(value, strPath, keyObj, srcObj))
        return targetObj[key] = putStrIn(value, strPath, keyObj, srcObj)
        break

      default: 
        let replaceTarget = ''
	      , mark = '()'
	    , isKeyObjArray = Array.isArray(keyObj[strPath])
        //console.log(' value: ', value)
        //console.log('str path : ', strPath)
        //console.log('found value: ', keyObj[strPath])
        console.log('keyObj: ', keyObj)
	    //console.log('type of each keyObj[strPath] :', typeof keyObj[strPath])
        console.log('scrObj: at 206 ', srcObj)
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
          console.log('replaceTarget: ', replaceTarget)

	  if(Array.isArray(replaceTarget)) {
	  let tempArr = []
	  replaceTarget.forEach((val, idx) => {
	  tempArr.push(lineFeedChange(val, mark))  	  
	  })
	  replaceTarget = tempArr	  
	  } else {
          replaceTarget = lineFeedChange(replaceTarget, mark)  
	  }
          targetObj[key] = value.replace(replaceTarget, keyObj[strPath])
        //console.log('srcObj[strPath]: ', srcObj[strPath])		
        }
        //console.log('put targetObj[key]: ', targetObj[key])
        return
        break
      }
      return
    })
    return targetObj
  }


}
