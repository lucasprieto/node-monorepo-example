function UnauthorizedError(code, error) {
  // Message configuration
  this.name = 'Unauthorized'
  this.message = error.message

  // Stack configuration
  Error.call(this, error.message)
  Error.captureStackTrace(this, this.constructor)

  // Payload configuration
  this.code = code
  this.status = 401
  this.inner = error
}

UnauthorizedError.prototype = Object.create(Error.prototype)
UnauthorizedError.prototype.constructor = UnauthorizedError

module.exports = UnauthorizedError
