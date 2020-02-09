//! DONE FOR NOW. CHECK AGAIN LATER. 


const express = require('express')
const mongoose = require('mongoose') 
const bodyParser = require('body-parser')
const app = express()

const { port, dbURI } = require('./config/environment')
const logger = require('./lib/logger')
const router = require('./config/router')
const errorHandler = require('./lib/errorHandler')


mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true }, (err) => {
  if (err) return console.log(err)
  console.log('Mongo Connected')
})

app.use(bodyParser.json())

app.use(logger)

app.use('/api', router)

app.use(errorHandler)

app.listen(port, () => console.log(`Express running on ${port}`))

module.exports = app