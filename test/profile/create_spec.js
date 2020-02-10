/* global api, describe, it, expect, beforeEach, afterEach */

const Profile = require('../../models/profile')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserCode = {
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}

const testProfile = {
  personalityType: 'INFJ',
  bio: 'Fun, outgoing and great at quizzes.',
  age: 26,
  gender: 'Female'
}

describe('POST /profiles', () => {

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
      .then(() => Profile.deleteMany())
      .then(() => done())
  })


  it('should return a 401 response without a token', done => {
    api.post('/api/profiles')
      .send(testProfile)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 201 response with a token', done => {
    api.post('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send(testProfile)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.post('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send(testProfile)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'favouriteDrinks',
          'personalityType',
          'bio',
          'age',
          'gender',
          'quizStrengths',
          'user'

        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.post('/api/profiles')
      .set('Authorization', `Bearer ${token}`)
      .send(testProfile)
      .end((err, res) => {
        const profile = res.body
        expect(profile._id).to.be.a('string')
        expect(profile.favouriteDrinks).to.be.an('array')
        expect(profile.personalityType).to.be.a('string')
        expect(profile.bio).to.be.a('string')
        expect(profile.age).to.be.a('number')
        expect(profile.gender).to.be.a('string')
        expect(profile.quizStrengths).to.be.an('array')
        expect(profile.user).to.be.an('object')
      
        done()
      })
  })


})
