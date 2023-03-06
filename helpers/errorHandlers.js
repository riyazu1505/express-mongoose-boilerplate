const logger = require('../utils/loggers')


exports.unexpectedErrorHandler = (err) => {
  logger.error(err)
}


exports.apiErrorHandler = (err, req, res, next) => {
  logger.error(err)
  const {
    status = (err.status || 500),
    statusText = (err.message || 'Internal server error')
  } = err?.response || {}

  res.status(status).send({
    err: {
      status: status,
      message: statusText
    }
  })
}
