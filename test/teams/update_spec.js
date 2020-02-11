/* global api, describe, it, expect, beforeEach, afterEach */

const Pub = require('../../models/pub')
const User = require('../../models/user')
const Team = require('../../models/team')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')


describe('PUT /pubs/:id/teams/:id', () => {
  let token, incorrectToken, pub, team

  beforeEach(done => {
    User.create({
      username: 'Test',
      email: 'test@email',
      password: 'word',
      passwordConfirmation: 'word'
    }, {
      username: 'TestTwo',
      email: 'testtwo@email',
      password: 'wordtwo',
      passwordConfirmation: 'wordtwo'
    })
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Pub.create({
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
          user: users[0]
        })
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
      .then(createdTeam => {
        team = createdTeam
        done()
      })
  })


  afterEach(done => {
    User.deleteMany()
      .then(() => Pub.deleteMany())
      .then(() => Team.deleteMany())
      .then(() => done())
  })


  
  it('should return a 401 response without a token', done => {
    api.put(`/api/pubs/${pub._id}/teams/${team._id}`)
      .send({ teamName: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 response with a token', done => {
    api.put(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ teamName: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ teamName: 'Test' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.put(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ teamName: 'Test' })
      .end((err, res) => {
        expect(res.body).to.contains.keys([  
          '_id',
          'captain',
          'teamName',
          'members',
          'user'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.put(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ teamName: 'Test' })
      .end((err, res) => {
        const team = res.body
        expect(team._id).to.be.a('string')
        expect(team.captain).to.be.an('object')
        expect(team.teamName).to.be.a('string')
        expect(team.members).to.be.an('array')
        expect(team.user).to.be.an('object')
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.put(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .send({ teamName: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})