'use strict'

const Joi = require('joi')
const Chalk = require('chalk')
const RestHapi = require('rest-hapi')
const errorHelper = require('../utilities/error-helper')

// const Config = require('../../config')

module.exports = function (server, mongoose, logger) {
  // FreqSweep POST New sweep
  ;
  (function () {
    const Log = logger.bind(Chalk.magenta('ScanData'))

    Log.note('Generating ScanData Endpoint')

    const scanDataHandler = async function (request, h) {
      try {
        const ScanData = mongoose.model('scandata')

        let found = await RestHapi.list(ScanData, {
          _id: request.params._id
        }, Log)
        found.docs[0].Data = found.docs[0].Data.concat(request.payload.Data)
        let result = RestHapi.update(ScanData, request.params._id, found.docs[0], Log)
        return result
      } catch (err) {
        errorHelper.handleError(err, Log)
      }
    }

    server.route({
      method: 'PUT',
      path: '/scandata/data/{_id}',
      config: {
        handler: scanDataHandler,
        description: 'Add data to a scan',
        tags: ['api', 'Scan'],
        validate: {
          params: {
            _id: Joi.string().required()
          },
          payload: {
            Data: Joi.array().items(
              Joi.array().items(
                Joi.number()
              ).length(2)
            )
          }
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [{
                code: 200,
                message: 'Success'
              },
              {
                code: 400,
                message: 'Bad Request'
              },
              {
                code: 404,
                message: 'Not Found'
              },
              {
                code: 500,
                message: 'Internal Server Error'
              }
            ]
          }
        }
      }
    })
  })()
}
