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
    const Log = logger.bind(Chalk.magenta('Scan'))

    Log.note('Generating FreqSweep Endpoint')

    const scanHandler = async function (request, h) {
      try {
        const Scan = mongoose.model('scan')

        let found = await RestHapi.list(Scan, {
          _id: request.params._id
        }, Log)
        found.docs[0].Data = found.docs[0].Data.concat(request.payload.Data)
        let result = RestHapi.update(Scan, request.params._id, found.docs[0], Log)
        return result
      } catch (err) {
        errorHelper.handleError(err, Log)
      }
    }

    server.route({
      method: 'PUT',
      path: '/scan/data/{_id}',
      config: {
        handler: scanHandler,
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
