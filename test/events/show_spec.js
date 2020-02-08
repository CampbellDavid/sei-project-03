/* global api, describe, it, expect, beforeEach, afterEach */

const Event = require('../../models/event')
const User = require('../../models/user')

describe('GET /pubs/:id/events/:id', () => {

  let event

  beforeEach(done => {
    User.create({
      username: 'test',
      email: 'test@email',
      password: 'test',
      passwordConfirmation: 'test'
    })
      .then(user => {
        return event.create({
          teamName: 'Inquizitors',
          entryFee: '£2',
          quizDay: 'Tuesday',
          quizTime: '18:30', // discover time format
          user
        })
      })
      .then(createEvent => {
        event = createEvent 
        done()
      })
  })
  afterEach(done => {
    User.deleteMany()
      .then(() => Event.deleteMany())
      .then(() => done())
  })


  it('should return a 404 not found for an invalid pubs id', done => {
    api.get('/api/pubs/events/1234')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })


  it('should return a 200 response', done => {
    api.get(`/api/pubs/events/${event._id}`) 
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/pubs/events/${event._id}`) 
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return correct fields', done => {
    api.get(`/api/pubs/:id/events${event._id}`)
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
    api.get(`/api/pubs/:id/events${event._id}`)
    
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
