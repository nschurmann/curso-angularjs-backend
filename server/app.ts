import express = require('express')
import mongoose = require('mongoose')
import config from './config/environment'
import http = require('http')

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options)
mongoose.connection.on('error', (err: any) => {
  console.error('MongoDB connection error: ' + err)
  process.exit(-1)
})

// Populate databases with sample data
if (config.seedDB) require('./config/seed')

// Setup server
let app = express()
const server = http.createServer(app)
require('./config/express')(app)
require('./routes')(app)

// Start server
function startServer() {
  server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'))
  })
}

setImmediate(startServer)


// Expose app
export default app
