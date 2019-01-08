const express = require('express')
const bodyParser = require('body-parser')
const { connect } = require('models')
const config = require('config')
// routes
const routes = require('./routes')
// middleware
const allowCrossDomain = require('./middlewares/cors')
const errorHandling = require('./middlewares/errorHandling')

// Configs
const { connection } = config.get('database')
const { port } = config.get('server')

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
  app.listen(port)
}

startServer()
