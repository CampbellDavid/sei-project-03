/* global api, describe, it, expect, beforeEach, afterEach */

const User = require('../../models/user')

describe('GET /profiles/:id', () => {

  let profile

  beforeEach(done => {
    User.create({
      username: 'UserOne',
      email: 'email@email',
      password: 'pass',
      passwordConfirmation: 'pass',
      personalityType: 'UCLA',
      bio: 'Charming and charismatic.',
      age: 24,
      gender: 'Male'
    })
      .then(createdProfile => {
        profile = createdProfile
        done()
      })
  })


  afterEach(done => {
    User.deleteMany().then(() => done())
  })

  it('should return a 404 not found for an invalid profile id', done => {
    api.get('/api/profiles/invalidProfileId')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return a 200 response', done => {
    api.get(`/api/profiles/${profile._id}`) 
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/profiles/${profile._id}`) 
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/profiles/${profile._id}`)
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

  it('should return the correct data types', done => {
    api.get(`/api/profiles/${profile._id}`)
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

})