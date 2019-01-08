const express = require('express')
const bodyParser = require('body-parser')
const { connect } = require('models')
const { connection } = require('config').get('database')
// routes
const routes = require('./routes')
// middleware
const allowCrossDomain = require('./middlewares/cors')
const errorHandling = require('./middlewares/errorHandling')

// Create Server
const app = express()

// Set up Middlewares
app.use(allowCrossDomain)
app.use(bodyParser.json())

// Configure routes
app.get('/api/version', (req, res) => res.status(200).send('Node API - Version 1.0.0'))

app.use('/api', routes)

app.use(errorHandling)

const startServer = async () => {
  await connect(connection)
  app.listen(3000)
}

startServer()
