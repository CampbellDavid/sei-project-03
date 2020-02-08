/* global api, describe, it, expect, beforeEach, afterEach */

const Event = require('../../models/event')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testEvent = {
  teamName: 'Inquizitors',
  entryFee: '£2',
  quizDay: 'Tuesday',
  quizTime: '18:30'
  
}

const testUserCode = {
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}


describe('POST /pubs/:id/events', () => {

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
      .then(() => Event.deleteMany())
      .then(() => done())
  })

  it('should return error code 401 with no token', done => {
    api.post('/api/pubs/:id/events')
      .send(testEvent)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return success code 201 with token', done => {
    api.post('/api/pubs/:id/events')
      .set('Authorization', `Bearer ${token}`)
      .send(testEvent)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/pubs/:id/events')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return correct fields', done => {
    api.post('/api/pubs/:id/events')
      .set('Authorization', `Bearer ${token}`)
      .send(testEvent)
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
    api.post('/api/pubs/:id/events')
      .set('Authorization', `Bearer ${token}`)
      .send(testEvent)
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

})