const { verify } = require('jwt')
const UnauthorizedError = require('../errors/UnauthorizedError')

/* eslint-disable consistent-return */
async function authorizeRequest(req, res, next) {
  let token

  if (req.headers && req.headers.authorization) {
    const { authorization } = req.headers
    const parts = authorization.split(' ')
    if (parts.length === 2) {
      const [scheme, credentials] = parts
      if (/^Bearer$/i.test(scheme)) {
        token = credentials
      } else {
        return next(
          new UnauthorizedError('credentials_bad_scheme', {
            message: 'Format is Authorization: Bearer [token]'
          })
        )
      }
    } else {
      return next(
        new UnauthorizedError('credentails_bad_format', {
          message: 'Format is Authorization: Bearer [token]'
        })
      )
    }
  }

  if (!token) {
    return next(
      new UnauthorizedError('credentials_required', { message: 'No authorization token was found' })
    )
  }

  try {
    req.user = await verify(token)
    next()
  } catch (err) {
    return next(new UnauthorizedError('invalid_token', err))
  }
}

module.exports = authorizeRequest
