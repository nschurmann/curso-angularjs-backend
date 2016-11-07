import path = require('path')
import _ = require('lodash')

let all = {
  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  root: path.normalize(__dirname + '/../../..'),

  secrets: {
    session: 'curso-angularjs'
  },

  seedDB: false,
}
// Export the config object based on the NODE_ENV
// ==============================================

export default _.merge(
  all,
  require('./' + process.env.NODE_ENV) || {})