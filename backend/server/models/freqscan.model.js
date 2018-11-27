'use strict'

// const RestHapi = require('rest-hapi')
// const errorHelper = require('../utilities/error-helper')

module.exports = function(mongoose) {
  var modelName = 'freqscan'
  // var Types = mongoose.Schema.Types
  var Schema = new mongoose.Schema({
    StartMHZ: Number,
    StopMHZ: Number,
    ScanTime: Date,
    ScannerId: String,
    ScannerLocation: String,
    ScanData: [[Number, Number]]
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
