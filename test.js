//
let arr = [1, 2]
, txt = 'txt'

arr.forEach((val) => {
txt = txt + 1
})

//expecting : txt11
console.log(txt)

function test(arr, txt) {
arr.forEach((val) => {
txt = txt + 1
})
return
}

test(arr, txt)
//expecting : txt11
console.log(txt)

function test2(txt) {
txt = txt + 2

//expecting : txt112
console.log(txt)
return
}

test2(txt)
//expecting : txt11
console.log(txt)

function test3(arr) {
txt = txt + 1
return
}

test3(arr)
//expecting : txt111
console.log(txt)
