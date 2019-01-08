const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
  email: { type: String },
  password: {
    _id: false,
    hash: { type: String },
    salt: { type: String }
  }

  // your user fields down..
})

module.exports = mongoose.model('User', schema)
