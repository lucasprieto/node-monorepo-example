const { models } = require('models')
const { sha512 } = require('helpers/crypto')
const { generateToken } = require('jwt')

const { User } = models

const login = async (req, res) => {
  const { email, password } = req.body

  // Validate if model is correct
  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).send({ error: 'Bad Request' })
    return
  }

  // fetch user by email
  // and validate that user exists
  const user = await User.findOne({ email })
  if (user === null) {
    res.status(400).send({ error: 'User does not exist.' })
    return
  }

  // generate sha hash based on user's salt and provided password
  // and compare to the hash stored
  const { hash, salt } = user.password
  const passwordHash = sha512(password, salt)
  if (hash === passwordHash) {
    try {
      // generate JWT
      const token = await generateToken(user)
      res.status(200).send({ token })
    } catch (err) {
      res.status(500).send({ error: 'Token generation failed' })
    }
  } else {
    res.status(400).send({ error: 'Invalid Password.' })
  }
}

module.exports = {
  login
}
