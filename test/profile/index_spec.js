/* global api, describe, it, expect, beforeEach, afterEach */

const Profile = require('../../models/profile')
const User = require('../../models/user')

describe('GET /profiles', () => {

  beforeEach(done => {
    User.create({
      username: 'UserOne',
      email: 'email@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Profile.create([
          {
            personalityType: 'INFJ',
            bio: 'Fun, outgoing and great at quizzes.',
            age: 26,
            gender: 'Female',
            user: user
          }
          // {
          //   favouriteDrinks: ['Beer', 'Red Wine', 'Bud'],
          //   personalityType: 'UCLA',
          //   bio: 'Charming and charismatic.',
          //   age: 24,
          //   gender: 'Male',
          //   quizStrengths: ['Latin', 'Science', 'GenEd'],
          //   user
          // }
        ])
      })
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Profile.deleteMany())
      .then(() => done())
  })

  it('should return a 200 response', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an array', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return an array of objects', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        res.body.forEach(profile => {
          expect(profile).to.be.an('object')
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        res.body.forEach(profile => {
          expect(profile).to.contains.keys([
            '_id',
            'favouriteDrinks',
            'personalityType',
            'bio',
            'age',
            'gender',
            'quizStrengths',
            'user'
          ])
        })
        done()
      })
  })

  it('should return an array of objects with the correct fields and types of values', done => {
    api.get('/api/profiles')
      .end((err, res) => {
        res.body.forEach(profile => {
          expect(profile._id).to.be.a('string')
          expect(profile.favouriteDrinks).to.be.an('array')
          expect(profile.personalityType).to.be.a('string')
          expect(profile.bio).to.be.a('string')
          expect(profile.age).to.be.a('number')
          expect(profile.gender).to.be.a('string')
          expect(profile.quizStrengths).to.be.an('array')
          expect(profile.user).to.be.an('object')
        
        })
        done()
      })
  })




})