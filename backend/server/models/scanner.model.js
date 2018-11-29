'use strict'

// const RestHapi = require('rest-hapi')
// const errorHelper = require('../utilities/error-helper')

module.exports = function (mongoose) {
  var modelName = 'scanner'
  // var Types = mongoose.Schema.Types
  var Schema = new mongoose.Schema({
    Name: String,
    Event_id: String,
    Site_id: String,
    GPS: {
      Lat: Number,
      Lon: Number
    },
    StartMHZ: Number,
    StopMHZ: Number,
    Steps: Number,
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
