/* global describe, beforeEach, afterEach, it, api, expect */

const Pub = require('../../models/pub')
const User = require('../../models/user')
const Team = require('../../models/team')

describe('GET /pubs/:id/teams', () => {

  let pub

  beforeEach(done => {
    User.create({
      username: 'UserOne',
      email: 'email@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Pub.create([
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
            averagePintCost: '£6.50',
            user: user
          }
        ])
      })
      .then(createdPub => {
        pub = createdPub
        Team.create([
          {
            captain: createdPub[0].user,
            teamName: 'Inquizitours',
            members: ['userOne', 'userTwo', 'userThree']
          }
        ])
      })
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Pub.deleteMany())
      .then(() => Team.deleteMany())
      .then(() => done())
  })

  it('should return 200 res', done => {
    api.get(`/api/pubs/${pub._id}/teams`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return array', done => {
    api.get(`/api/pubs/${pub._id}/teams`)
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return array of objs', done => {
    api.get(`/api/pubs/${pub._id}/teams`)
      .end((err, res) => {
        res.body.forEach(team => {
          expect(team).to.be.an('object')
        })
        done()
      })
  })

  it('should return array of objs with correct fields and data types', done => {
    api.get(`/api/pubs/${pub._id}/teams`)
      .end((err, res) => {
        res.body.forEach(team => {

          expect(team._id).to.be.a('string')
          expect(team.captain).to.be.an('object')
          expect(team.teamName).to.be.a('string')
          expect(team.members).to.be.an('array')
          expect(team.user).to.be.an('object')

        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', done => {
    api.get(`/api/pubs/${pub._id}/teams`)
      .end((err, res) => {
        res.body.forEach(team => {
          expect(team).to.contains.keys([
            '_id',
            'captain',
            'teamName',
            'members',
            'user'
          ])
        })
        done()
      })
  })

})