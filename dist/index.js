
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./app-info-parser-dist.cjs.production.min.js')
} else {
  module.exports = require('./app-info-parser-dist.cjs.development.js')
}
