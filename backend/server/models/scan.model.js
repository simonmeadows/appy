'use strict'

// const RestHapi = require('rest-hapi')
// const errorHelper = require('../utilities/error-helper')

module.exports = function(mongoose) {
  var modelName = 'scan'
  var Types = mongoose.Schema.Types
  var Schema = new mongoose.Schema({
    StartMHZ: Number,
    StopMHZ: Number,
    Time: Date,
    Scanner_id: String,
    Event_id: String,
    Site_id: String,
    GPS: {
      Lat: Number,
      Lon: Number
    },
    ScanData: {
      type: Types.ObjectId,
      ref: 'scandata'
    }
  })
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      policies: {},
      associations: {
        scandata:{
          type: 'ONE_ONE',
          model: 'scandata'
        }
      },
      permissions: {}
    }
  }

  return Schema
}
