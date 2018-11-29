'use strict'

// const RestHapi = require('rest-hapi')
// const errorHelper = require('../utilities/error-helper')

module.exports = function (mongoose) {
  var modelName = 'site'
  // var Types = mongoose.Schema.Types
  var Schema = new mongoose.Schema({
    Name: String,
    Address: String,
    Event_id: String,
    Expand: Boolean
  })
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      policies: {},
      associations: {},
      permissions: {}
    }
  }

  return Schema
}
