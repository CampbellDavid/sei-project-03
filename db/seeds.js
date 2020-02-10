const mongoose = require('mongoose')
const { dbURI } = require('../config/environment')
const Pub = require('../models/pub')
const User = require('../models/user')
const Event = require('../models/event')
const Team = require('../models/team')

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
            passwordConfirmation: '1',
            favouriteDrinks: [],
            personalityType: 'ABCD',
            bio: 'Bio for user 1',
            age: 30,
            gender: 'Female',
            quizStrengths: []
          },
          {
            username: '2',
            email: '2@email.com',
            password: '2',
            passwordConfirmation: '2',
            favouriteDrinks: [],
            personalityType: 'EFGH',
            bio: 'Bio for user 2',
            age: 25,
            gender: 'Male',
            quizStrengths: []
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
            member: [],
            user: 'user'
          }
        ])
      })
      .then(createdTeams => {
        console.log(`${'🍺'.repeat(createdTeams.length)} teams created`)
<<<<<<< HEAD
        return Profile.create([
          {
            favouriteDrinks: ['gin and tonic', 'pina colada'],
            personalityType: 'INFJ',
            bio: 'I am so good at pub quizzes',
            age: 22,
            gender: 'male',
            quizStrengths: ''
          }
        ])
      })
      .then(createdProfile => {
        console.log(`${'🍺'.repeat(createdProfile.length)} profiles created`)
=======
>>>>>>> bdb2458aa52a96e3d21d06561a06be264ab056b9
        return Pub.create([
          {
            name: 'Abbey Bar',
            image: 'http://www.pubquizzers.com/images/pubs/abbey-bar_560.jpg',
            city: 'London',
            streetName: 'Tower Hill',
            postcode: 'EC3N 1DD',
            phone: '020 7488 1918',
            website: 'abbey-bar.co.uk',
            description: 'Join us at Abbey for our Legendary pub quiz. The winning team will walk away with a £250 bar tab to use at Abbey, as well as a trophy to keep until the next quiz. Entry is FREE and complimentary nibbles are provided throughout the evening.',
            maxTeamSize: 8,
            quizDay: 'Tuesday',
            quizTime: '18:30', // discover time format
            starRating: [1, 2, 3, 4, 5, 5, 5, 5],
            averagePintCost: '£6.50',
            reviews: ['This was great', 'great service', 'quiz was awesome'],
            user: 'user'
          }
        ])
      })
      .then(createdPub => {
        console.log(`${'🍺'.repeat(createdPub.length)} pubs created`)
      })
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  })