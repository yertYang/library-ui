const sass = require('sass')
const path = require('node:path')
sass.compile(path.join(__dirname, '../styles/index.scss'))
console.log('Component styles compiled successfully')
