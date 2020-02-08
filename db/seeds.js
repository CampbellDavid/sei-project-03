const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Pub = require('../models/pub')
const User = require('..models/user')
const PubObjs = require('./pubObjs')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err) return console.log(err)
  db.dropDatabase()
    .then(() => {
      return User.create([
        {
          username: '1',
          email: '1@email.com',
          password: '1',
          passwordConfirmation: '1'
        }, 
        {
          username: '2',
          email: '2@email.com',
          password: '2',
          passwordConfirmation: '2'
        }
      ])
    })
    .then(createdUsers => {
      console.log(`${'🍺'.repeat(createdUsers.length)} users created`)
      return Pub.create(PubObjs)
    })
    .then(createdPubs => console.log(`${'🍺'.repeat(createdPubs.length)} pubs created `))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})


