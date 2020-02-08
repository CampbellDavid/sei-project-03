/* global describe, beforeEach, afterEach, it, api, expect */
const Event = require('../../models/event')
const User = require('../../models/user')


describe('GET /pubs/:id/events', () => {
  beforeEach( done => {
    User.create({
      username: 'UserOne',
      email: 'email@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Event.create([
          {
            teamName: 'Inquizitors',
            entryFee: '£2',
            quizDay: 'Tuesday',
            quizTime: '18:30', // discover time format
            user
          },
          {
            teamName: 'Coders',
            entryFee: '£3',
            quizDay: 'Monday',
            quizTime: '18:30', // discover time format
            user
          }
        ])
      })
      .then(() => done())
  })
  afterEach(done => {
    User.deleteMany()
      .then(() => Event.deleteMany())
      .then(() => done())
  })

  it('should return 200 res', done => {
    api.get('/api/pubs/:id/events')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return array', done => {
    api.get('/api/pubs/:id/events')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return array of objs', done => {
    api.get('/api/pubs/:id/events')
      .end((err, res) => {
        res.body.forEach(event => {
          expect(event).to.be.an('object')
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', done => {
    api.get('/api/pubs/:id/events')
      .end((err, res) => {
        res.body.forEach(event => {
          expect(event).to.contains.keys([
            '_id',
            'teamName',
            'entryFee',
            'quizDay',
            'quizTime', 
            'user'
          ])
        })
        done()
      })
  })

  it('should return array of objs with correct fields and data types', done => {
    api.get('/api/pubs/:id/events')
      .end((err, res) => {
        res.body.forEach(event => {
          expect(event._id).to.be.a('string')
          expect(event.quizDay).to.be.a('string')
          expect(event.quizTime).to.be.a('string')
          expect(event.teamName).to.be.a('string')
          expect(event.user).to.be.an('object')
        })
        done()
      })
  })

} )