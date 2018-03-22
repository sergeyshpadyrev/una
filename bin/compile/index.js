const parse = require('./parse')
const prettier = require('prettier')
const translate = require('./translate')

module.exports = input => {
  const tree = parse(input)
  const translated = tree.map(translate).join('\n')
  const header = 'require("sova-standard-library");\n\n'
  const complete = `${header}${translated}`

  return prettier.format(complete)
}
