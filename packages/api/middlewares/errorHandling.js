/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  res.status(err.status).send({
    error: err.name,
    code: err.code,
    message: err.message
  })
}

module.exports = errorHandler
