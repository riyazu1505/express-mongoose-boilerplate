exports.unexpectedErrorHandler = (reason) => {
  console.log('unhandledRejection: ', reason?.response?.data?.error?.message || reason?.message || reason)
}


exports.apiErrorHandler = (err, req, res, next) => {
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
