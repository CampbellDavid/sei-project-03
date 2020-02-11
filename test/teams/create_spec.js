/* global api, describe, it, expect, beforeEach, afterEach */

const Team = require('../../models/team')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testPub = {
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
  averagePintCost: '£6.50'
}

const testTeam = {
  captain: 'userOne',
  teamName: 'Team',
  members: ['userTwo', 'userThree', 'userFour']
}

const testUserCode = {
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /pubs/:id/teams', () => {

  let token

  beforeEach(done => {
    User.create(testUserCode)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Team.deleteMany())
      .then(() => done())
  })

  it('should return error code 401 with no token', done => {
    api.post('/api/pubs/:id/teams')
      .send(testTeam)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return success code 201 with token', done => {
    api.post('/api/pubs/:id/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(testTeam)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/pubs/:id/teams')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return correct fields', done => {
    api.post('/api/pubs/:id/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(testTeam)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'teamName',
          'member',
          'user'
        ])
        done()
      })
  })


  it('should return correct data types', done => {
    api.post('/api/pubs/:id/teams')
      .set('Authorization', `Bearer ${token}`)
      .send(testTeam)
      .end((err, res) => {
        const team = res.body

        expect(team._id).to.be.a('string')
        expect(team.teamName).to.be.a('string')
        expect(team.member).to.be.an('array')
        expect(team.user).to.be.an('object')

        done()
      })
  })


})