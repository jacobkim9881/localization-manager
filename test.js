const { appendFile } = require('fs')
const path = require('path')
const writeFile = require('write-file')
console.log(process.env)


let aPath = path.normalize(process.env.HOME + '/tailing-mouse-footprint/localization-manager' + '/test1.js')
writeFile(aPath, '1', function (err) {
    if (err) return console.log(err)
    console.log('file is written');	
  })
console.log(aPath)
console.log(__dirname)