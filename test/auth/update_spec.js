/* global api, describe, it, expect, beforeEach, afterEach */

const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserCode = {
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test',
  personalityType: 'ABCD',
  bio: 'Bio for user 1',
  age: 30,
  gender: 'Female'
}

describe('PUT /profiles/:id', () => {

  let token, incorrectToken, profile

  beforeEach(done => {
    User.create(testUserCode)
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
        return User.create({
          username: 'testOne',
          email: 'testOne@email',
          password: 'test',
          passwordConfirmation: 'test',
          personalityType: 'ABCD',
          bio: 'Bio for user 1',
          age: 30,
          gender: 'Female'
        })
      })
      .then(updatedProfile => {
        profile = updatedProfile
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => done())
  })

  it('should return error code 401 with no token', done => {
    api.put(`/api/profiles/${profile._id}`)
      .send({ personalityType: 'ABCD' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return success code 201 with token', done => {
    api.put(`/api/profiles/${profile._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ personalityType: 'ABCD' })
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.put(`/api/profiles/${profile._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ personalityType: 'ABCD' })
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return correct fields', done => {
    api.put(`/api/profiles/${profile._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ personalityType: 'ABCD' })
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'username',
          'email',
          'password',
          'personalityType',
          'bio',
          'age',
          'gender',
          'user'
        ])
        done()
      })
  })


  it('should return correct data types', done => {
    api.put(`/api/profiles/${profile._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ personalityType: 'ABCD' })
      .end((err, res) => {
        const profile = res.body

        expect(profile._id).to.be.a('string')
        expect(profile.username).to.be.a('string')
        expect(profile.email).to.be.a('string')
        expect(profile.password).to.be.a('string')
        expect(profile.personalityType).to.be.a('string')
        expect(profile.bio).to.be.a('string')
        expect(profile.age).to.be.a('number')
        expect(profile.gender).to.be.a('string')
        expect(profile.user).to.be.an('object')

        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.put(`/api/profiles/${profile._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .send({ personalityType: 'ABCD' })
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})