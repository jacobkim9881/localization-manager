//
let txt = 'txt'

txt = txt + 1

//expecting : txt1
console.log(txt)

function test(txt) {
txt = txt + 1
return
}

test(txt)
//expecting : txt1
console.log(txt)

function test2(txt) {
txt = txt + 2

//expecting : txt12
console.log(txt)
return
}

test2(txt)
//expecting : txt1
console.log(txt)

function test3() {
txt = txt + 1
return
}

test3()
//expecting : txt11
console.log(txt)
