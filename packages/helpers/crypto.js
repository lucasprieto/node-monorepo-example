const crypto = require('crypto')

/**
 * Generat Salt of desired Length - recommended 16
 * @function
 * @param {number} length - Length of the random string.
 */
const generateSalt = len =>
  crypto
    .randomBytes(Math.ceil(len / 2))
    .toString('hex')
    .slice(0, len)

/**
 * Hash password with sha512.
 * @function
 * @param {string} password - User password.
 * @param {string} salt - Salt to be used.
 */
const sha512 = (password, salt) => {
  const hash = crypto.createHmac('sha512', salt) /** Hashing algorithm sha512 */
  hash.update(password)
  return hash.digest('hex')
}

module.exports = {
  generateSalt,
  sha512
}
