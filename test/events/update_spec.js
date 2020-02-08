/* global api, describe, it, expect, beforeEach, afterEach */

const Event = require('../../models/event')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')


const testUserData = [{
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'testTwo',
  email: 'testTwo@email',
  password: 'test',
  passwordConfirmation: 'test'
}]


describe('PUT /pubs/:id/events/:id', () => {
  let token, incorrectToken, event


  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Event.create({
          teamName: 'Inquizitors',
          entryFee: '£2',
          quizDay: 'Tuesday',
          quizTime: '18:30', // discover time format
          user: users[0]
        })
      })
      .then(createdEvent => {
        event = createdEvent
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Event.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.put(`/api/pubs/events${event._id}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 202 response with a token', done => {
    api.put(`/api/pubs/events${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(202)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/pubs/:id/events${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return correct fields', done => {
    api.put(`/api/pubs/:id/events${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id', 
          'teamName',
          'entryFee',
          'quizDay',
          'quizTime', 
          'user'
        ])
        done()
      })
  })

  it('should return correct data types', done => {
    api.put(`/api/pubs/:id/events${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        const event = res.body

        expect(event._id).to.be.a('string')
        expect(event.quizDay).to.be.a('string')
        expect(event.quizTime).to.be.a('string')
        expect(event.teamName).to.be.a('string')
        expect(event.user).to.be.an('object')

        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.put(`/api/pubs/events${event._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .send({ name: 'Test' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })


}) 