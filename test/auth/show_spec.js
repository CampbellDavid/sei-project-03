/* global api, describe, it, expect, beforeEach, afterEach */

const Profile = require('../../models/profile')
const User = require('../../models/user')

describe('GET /profiles/:id', () => {

  let profile

  beforeEach(done => {
    User.create({
      username: 'UserOne',
      email: 'email@email',
      password: 'pass',
      passwordConfirmation: 'pass',
      // favouriteDrinks: ['Beer', 'Red Wine', 'Bud'],
      personalityType: 'UCLA',
      bio: 'Charming and charismatic.',
      age: 24,
      gender: 'Male'
      // quizStrengths: ['Latin', 'Science', 'GenEd'],
    })
      .then(createdProfile => {
        profile = createdProfile
        done()
      })
  })


  afterEach(done => {
    User.deleteMany()
      .then(() => Profile.deleteMany())
      .then(() => done())
  })

  it('should return a 404 not found for an invalid profile id', done => {
    api.get('/api/profiles/invalidProfileId')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return a 200 response', done => {
    api.get(`/api/profiles/${profile._id}`) // <=== and using that pub we have created and stored in the requests
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/profiles/${profile._id}`) // <=== and using that pub we have created and stored in the requests
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
    api.get(`/api/profiles/${profile._id}`)
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