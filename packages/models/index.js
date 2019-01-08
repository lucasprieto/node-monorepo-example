const mongoose = require('mongoose')
const Promise = require('bluebird')

const User = require('./user')

mongoose.Promise = Promise

const isConnected = () => mongoose.connection.readyState === 1

const connect = async mongoUri => {
  return mongoose.connect(mongoUri)
}

const disconnect = () => {
  mongoose.disconnect()
}

const models = {
  User
}

module.exports = {
  connect,
  disconnect,
  models,
  isConnected,
  oid: str => new mongoose.Types.ObjectId(str)
}
