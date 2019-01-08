const repl = require('repl')
const { connect, models } = require('models')
const jwt = require('jwt')

const mongoUri = ''

connect(mongoUri).then(() => {
  const replServer = repl.start()

  replServer.context.User = models.User

  replServer.context.jwt = jwt
})
