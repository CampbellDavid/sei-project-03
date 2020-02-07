/* global api, describe, it, expect, beforeEach, afterEach */

const Pub = require('../../models/pub')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testPub = {
  name: 'Abbey Bar',
  image: 'http://www.pubquizzers.com/images/pubs/abbey-bar_560.jpg',
  city: 'London',
  streetName: 'Tower Hill',
  postcode: 'EC3N 1DD',
  phone: '020 7488 1918',
  website: 'abbey-bar.co.uk',
  description: 'Join us at Abbey for our Legendary pub quiz. The winning team will walk away with a £250 bar tab to use at Abbey, as well as a trophy to keep until the next quiz. Entry is FREE and complimentary nibbles are provided throughout the evening.',
  maxTeamSize: 8,
  quizDay: 'Tuesday',
  quizTime: '18:30', // discover time format
  starRating: [1, 2, 3, 4, 5, 5, 5, 5],
  averagePintCost: '£6.50',
  reviews: ['This was great', 'great service', 'quiz was awesome']
}

const testUserCode = {
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}

describe('POST /pubs', () => {

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
      .then(() => Pub.deleteMany())
      .then(() => done())
  })

  it('should return error code 401 with no token', done => {
    api.post('/api/pubs')
      .send(testPub)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return success code 201 with token', done => {
    api.post('/api/pubs')
      .set('Authorization', `Bearer ${token}`)
      .send(testPub)
      .end((err, res) => {
        expect(res.status).to.eq(201)
        done()
      })
  })

  it('should return an object', done => {
    api.post('/api/pubs')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return correct fields', done => {
    api.post('/api/pubs')
      .set('Authorization', `Bearer ${token}`)
      .send(testPub)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'name',
          'image',
          'city',
          'streetName',
          'postcode',
          'phone',
          'website',
          'description',
          'maxTeamSize',
          'quizDay',
          'quizTime',
          'starRating',
          'averagePintCost',
          'reviews',
          'user'
        ])
        done()
      })
  })


  it('should return correct data types', done => {
    api.post('/api/pubs')
      .set('Authorization', `Bearer ${token}`)
      .send(testPub)
      .end((err, res) => {
        const pub = res.body

        expect(pub._id).to.be.a('string')
        expect(pub.name).to.be.a('string')
        expect(pub.image).to.be.a('string')
        expect(pub.city).to.be.a('string')
        expect(pub.streetName).to.be.a('string')
        expect(pub.postcode).to.be.a('string')
        expect(pub.phone).to.be.a('string')
        expect(pub.website).to.be.a('string')
        expect(pub.description).to.be.a('string')
        expect(pub.maxTeamSize).to.be.a('number')
        expect(pub.quizDay).to.be.a('string')
        expect(pub.starRating).to.be.an('array')
        expect(pub.averagePintCost).to.be.a('string')
        expect(pub.reviews).to.be.an('array')
        expect(pub.user).to.be.an('object')

        done()
      })
  })


})