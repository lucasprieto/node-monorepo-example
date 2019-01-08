const jwt = require('jsonwebtoken')
const { privateKey, publicKey } = require('./keys.json')

const issuer = 'lucasprieto'
const audience = 'https://lukeprieto.com'

/**
 * Generate JSON Web Token for User.
 * @function
 * @param {object} user - User Model.
 */
const generateToken = ({ email }) => {
  // Signing Options
  const signOptions = {
    issuer,
    audience,
    subject: email,
    expiresIn: '360 days',
    algorithm: 'RS256'
  }

  const signAsync = (payload, key, opt) =>
    new Promise((res, rej) => {
      jwt.sign(payload, key, opt, (err, token) => {
        if (err) {
          rej(err)
        } else {
          res(token)
        }
      })
    })

  return signAsync(
    {
      email
    },
    privateKey,
    signOptions
  )
}

const verify = token => {
  const verifyOptions = {
    issuer,
    audience,
    algorithms: ['RS256']
  }

  const verifyAsync = (t, key, opt) =>
    new Promise((res, rej) => {
      jwt.verify(t, key, opt, (err, payload) => {
        if (err) {
          rej(err)
        } else {
          res(payload)
        }
      })
    })

  return verifyAsync(token, publicKey, verifyOptions)
}

const decode = token => {
  return jwt.decode(token, { complete: true })
}

module.exports = {
  generateToken,
  verify,
  decode
}
