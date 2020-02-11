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
          },{
            username: '3',
            email: '3@email.com',
            password: '3',
            passwordConfirmation: '3',
            favouriteDrinks: [],
            personalityType: 'IJKL',
            bio: 'Bio for user 3',
            age: 28,
            gender: 'Female',
            quizStrengths: []
          },{
            username: '4',
            email: '4@email.com',
            password: '4',
            passwordConfirmation: '4',
            favouriteDrinks: [],
            personalityType: 'MNOP',
            bio: 'Bio for user 4',
            age: 26,
            gender: 'Male',
            quizStrengths: []
          }
        ])
      })
      .then(createdUsers => {
        console.log(`${'🍺'.repeat(createdUsers.length)} users created`)
        return Team.create([
          {
            captain: createdUsers[0],
            teamName: 'Inquizitours',
            members: [createdUsers[1], createdUsers[2], createdUsers[3]]
          }, {
            captain: createdUsers[1],
            teamName: 'Beijing Team',
            members: [createdUsers[0], createdUsers[2], createdUsers[3]]
          }, {
            captain: createdUsers[2],
            teamName: 'Copenhagen Team',
            members: [createdUsers[0], createdUsers[1], createdUsers[3]]
          }, {
            captain: createdUsers[3],
            teamName: 'London Team',
            members: [createdUsers[0], createdUsers[1], createdUsers[2]]
          }
        ])
      })
      .then(createdTeams => {
        console.log(`${'🍺'.repeat(createdTeams.length)} teams created`)
        return Event.create([
          {
            teams: [createdTeams[0], createdTeams[1]],
            entryFee: '£2',
            quizDay: 'Tuesday',
            quizTime: '18:00',
            user: createdTeams[0].captain
          }, {
            teams: [createdTeams[0], createdTeams[1], createdTeams[2]],
            entryFee: '£3',
            quizDay: 'Wednesday',
            quizTime: '19:00',
            user: createdTeams[0].captain
          }, {
            teams: [createdTeams[1], createdTeams[2], createdTeams[3]],
            entryFee: '£4',
            quizDay: 'Thursday',
            quizTime: '20:00',
            user: createdTeams[1].captain
          }, {
            teams: [createdTeams[2], createdTeams[3]],
            entryFee: '£5',
            quizDay: 'Friday',
            quizTime: '21:00',
            user: createdTeams[2].captain
          }
        ])
      })
      .then(createdEvents => {
        console.log(`${'🍺'.repeat(createdEvents.length)} events created`)
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
            quizTime: '18:30',
            // starRating: [1, 2, 3, 4, 5, 5, 5, 5],
            averagePintCost: '£6.50',
            // reviews: ['This was great', 'great service', 'quiz was awesome'],
            events: [createdEvents[0]],
            user: createdEvents[0].user
          }, {
            name: 'Clapton Hart',
            image: 'https://www.telegraph.co.uk/content/dam/food-and-drink/2018/05/21/ClaptonHart-5_trans_NvBQzQNjv4Bq1AT3Q7Sc9uaffdHBes0nLoAUi_eAXJmjTzXoJ-uDM54.jpg?imwidth=450',
            city: 'London',
            streetName: '231 Lower Clapton Road',
            postcode: 'E5 8EG',
            phone: '020 8985 8124',
            website: 'https://claptonhart.com/',
            description: 'The Clapton Hart is a friendly pub serving the local community.',
            maxTeamSize: 6,
            quizDay: 'Thursday',
            quizTime: '20:00',
            // starRating: [3, 2, 4, 1],
            averagePintCost: '£5.00',
            // reviews: [],
            events: [createdEvents[1]],
            user: createdEvents[1].user
          }, {
            name: 'White Hart',
            image: 'https://cdn.thestage.co.uk/wp-content/uploads/2015/05/White-Hart-700x455.jpg',
            city: 'London',
            streetName: '69 Stoke Newington Highstreet',
            postcode: 'N16 8EL',
            phone: '020 7403 0257',
            website: 'https://whitehartstokenewington.com/',
            description: 'The White Hart is Stoke Newington’s favourite Local in North London’s bohemian and family friendly area. With a massive beer garden out the back, The White Hart is a grand old pub that does what pubs do best ',
            maxTeamSize: 6,
            quizDay: 'Wednesday',
            quizTime: '20:00',
            // starRating: [2, 3, 3, 3, 5],
            averagePintCost: '£5.00',
            // reviews: ['Rollover jackpot to claim!', 'A bit quiet and not much atmosphere'],
            events: [createdEvents[2]],
            user: createdEvents[2].user
          }, {
            name: 'Red Lion',
            image: 'https://media-cdn.tripadvisor.com/media/photo-s/09/9a/34/04/the-red-lion.jpg',
            city: 'London',
            streetName: '48 Parliament Street',
            postcode: 'SW1A 2NH',
            phone: '020 7930 5826',
            website: 'https://redlionwestminster.co.uk/',
            description: 'Westminster pub with elaborate ceiling, politicians\' portraits and illustrious former clientele.',
            maxTeamSize: 5,
            quizDay: 'Wednesday',
            quizTime: '20:00',
            // starRating: [2, 3, 3, 3, 5],
            averagePintCost: '£5.80',
            // reviews: ['Rollover jackpot to claim!', 'A bit quiet and not much atmosphere'],
            events: [createdEvents[3]],
            user: createdEvents[3].user
          }
        ])
      })
      .then(createdPub => {
        console.log(`${'🍺'.repeat(createdPub.length)} pubs created`)
      })
      .catch(err => console.log(err))
      .finally(() => mongoose.connection.close())
  })

// Have removed array of starRating and reviews for purpose of seeding, as each item requires user validation
// for each review and rating - seed file would become too long. Will check when front end is running