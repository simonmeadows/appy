var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SERVER_URI: '"http://simon-laptop:8080"',
  WEBSOCKET_URI: '"ws://simon-laptop:8080"',
  APP_URI: '"http://simon-laptop:3000"'
  // APP_URI: '"https://appyapp.io"'
})
