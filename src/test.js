const una = require('./index')
const testUna = (text, result) => expect(eval(una(text)).toString().trim()).toEqual(result.trim())

test('=', () => {
  testUna(
    `
= a 1
a    
`,
    '1'
  )
})

test('+', () => {
  testUna('+ 2 3', '5')
})

test('->', () => {
  testUna(
    `
= func -> x
  + x 1 
func 2
    `,
    '3'
  )
})

test('regular expressions', () => {
  testUna(
    `= regexp new RegExp 'foo*'
regexp.test 'table football'
`,
    'true'
  )
})

test('..', () => {
  testUna(
    `
= func -> ((.. x 1))
  (+ x 1)
func ()
`,
    '2'
  )
})
