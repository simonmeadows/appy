'use strict'

// const RestHapi = require('rest-hapi')
// const errorHelper = require('../utilities/error-helper')

module.exports = function (mongoose) {
  var modelName = 'scandata'
  var Types = mongoose.Schema.Types
  var Schema = new mongoose.Schema({
    Data: [[Number, Number]],
    Scan: {
      type: Types.ObjectId,
      ref: 'scan'
    }
  })
  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      policies: {},
      associations: {
        scan: {
          type: 'ONE_ONE',
          model: 'scan'
        }
      },
      permissions: {}
    }
  }

  return Schema
}
