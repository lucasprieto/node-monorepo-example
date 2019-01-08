const { User } = require('models').models
const { generateSalt, sha512 } = require('helpers/crypto')

const createUser = async (email, cmd) => {
  const { password } = cmd
  // check if user does not exist already exists
  const exists = await User.findOne({ email })
  if (exists) {
    throw new Error('User already exists.')
  }

  const salt = generateSalt(16)
  const hash = sha512(password, salt)

  const user = new User({
    email,
    password: {
      hash,
      salt
    }
  })
  await user.save()

  return 'User created successfully.'
}

module.exports = {
  createUser
}
