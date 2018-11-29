'use strict'

// const RestHapi = require('rest-hapi')
// const errorHelper = require('../utilities/error-helper')

module.exports = function(mongoose) {
  var modelName = 'frequency'
  // var Types = mongoose.Schema.Types
  var Schema = new mongoose.Schema({
    Name: String,
    MHZ: Number,
    Bandwidth: Number,
    Power: Number,
    Location_id: String
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
