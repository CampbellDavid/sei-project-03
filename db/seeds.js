const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Pub = require('../models/pub')
const User = require('../models/user')
const Event = require('../models/event')
const Team = require('../models/team')
const Profile = require('../models/profile')
const PubObjs = require('./pubObjs')

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, 
  (err, db) => {
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
        return Event.create([
          {
            teamName: 'Inquizitours',
            entryFee: '£2',
            quizDay: 'Tuesday',
            quizTime: '20:00',
            user: createdUsers[0]
          }
        ])
      })
      .then(createdEvents => {
        console.log(`${'🍺'.repeat(createdEvents.length)} events created`)
        return Team.create([
          {
            teamName: 'Inquizitours',
            member: ''
          }
        ])
      })
      .then(createdTeams => {
        console.log(`${'🍺'.repeat(createdTeams.length)} teams created`)
        return Profile.create([
          {
            favouriteDrinks: [0],
            personalityType: 'INFJ',
            bio: 'I am so good at pub quizzes',
            age: 22,
            gender: 'male',
            quizStrengths: ''
          }
        ])
      })
      .then(createdProfile => {
        console.log(`${'🍺'.repeat(createdProfile.length)} teams created`)
        return Pub.create(PubObjs)
      })
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  })




