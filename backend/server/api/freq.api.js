'use strict'

const Joi = require('joi')
const Chalk = require('chalk')
const errorHelper = require('../utilities/error-helper')

// const Config = require('../../config')

module.exports = function(server, mongoose, logger) {
  // FreqSweep Get Sweep
  ;(function() {
    const Log = logger.bind(Chalk.magenta('FreqSweep'))

    Log.note('Generating FreqSweep Endpoint')

    const freqSweepGetHandler = async function(request, h) {
      try {
        const FreqScan = mongoose.model('freqscan')

        return FreqScan.find()
      } catch (err) {
        errorHelper.handleError(err, Log)
      }
    }

    server.route({
      method: 'GET',
      path: '/freqsweep',
      config: {
        handler: freqSweepGetHandler,
        description: 'Get all a frequency sweeps',
        tags: ['api', 'FreqSweep'],
        validate: {},
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              { code: 200, message: 'Success' },
              { code: 400, message: 'Bad Request' },
              { code: 404, message: 'Not Found' },
              { code: 500, message: 'Internal Server Error' }
            ]
          }
        }
      }
    })
  })()
  // FreqSweep POST New sweep
  ;(function() {
    const Log = logger.bind(Chalk.magenta('FreqSweep'))

    Log.note('Generating FreqSweep Endpoint')

    const freqSweepHandler = async function(request, h) {
      try {
        const FreqScan = mongoose.model('freqscan')
        let thisFreqScan = new FreqScan(request.payload)
        await thisFreqScan.save()

        return FreqScan.find()
      } catch (err) {
        errorHelper.handleError(err, Log)
      }
    }

    server.route({
      method: 'POST',
      path: '/freqsweep',
      config: {
        handler: freqSweepHandler,
        description: 'Submit a frequency sweep',
        tags: ['api', 'FreqSweep'],
        validate: {
          payload: {
            StartMHZ: Joi.number(),
            StopMHZ: Joi.number(),
            ScanTime: Joi.date(),
            ScanData: Joi.array().items(Joi.array().items(Joi.number()))
          }
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              { code: 200, message: 'Success' },
              { code: 400, message: 'Bad Request' },
              { code: 404, message: 'Not Found' },
              { code: 500, message: 'Internal Server Error' }
            ]
          }
        }
      }
    })
  })()
  // FreqSweep Delete sweep
  ;(function() {
    const Log = logger.bind(Chalk.magenta('FreqSweep'))

    Log.note('Generating FreqSweep Endpoint')

    const freqSweepRemoveAllHandler = async function(request, h) {
      try {
        const FreqScan = mongoose.model('freqscan')
        if (request.payload.id === 'all') {
          await FreqScan.remove(function() {})
        }

        return FreqScan.find()
      } catch (err) {
        errorHelper.handleError(err, Log)
      }
    }

    server.route({
      method: 'DELETE',
      path: '/freqsweep',
      config: {
        handler: freqSweepRemoveAllHandler,
        description: 'Remove all frequency sweeps',
        tags: ['api', 'FreqSweep'],
        validate: {
          payload: { id: Joi.string().allow(null) }
        },
        plugins: {
          'hapi-swagger': {
            responseMessages: [
              { code: 200, message: 'Success' },
              { code: 400, message: 'Bad Request' },
              { code: 404, message: 'Not Found' },
              { code: 500, message: 'Internal Server Error' }
            ]
          }
        }
      }
    })
  })()
}
