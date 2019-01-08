const express = require('express')
const auth = require('./middlewares/jwtAuthorization')

const router = express.Router()

// Controllers
const authController = require('./controllers/authController')

router.post('/auth', authController.login)

router.get('/testjwt', auth, (req, res) => res.status(200).send('OK'))

module.exports = router
