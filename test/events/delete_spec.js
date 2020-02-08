/* global api, describe, it, expect, beforeEach, afterEach */

const Event = require('../../models/event')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')


const testUserData = [{ // creating two users here for this test, will use the second user to test that they cannot update an pub they did not create, will also do the same with delete
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


describe('DELETE /pubs/:id/events/:id', () => {
  let token = null
  let incorrectToken = null
  let event = null

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
    api.delete(`/api/pubs/events${event._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/pubs/events${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return no data', done => {
    api.delete(`/api/pubs/events${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/pubs/events${event._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})

