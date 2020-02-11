/* global api, describe, it, expect, beforeEach, afterEach */
const Pub = require('../../models/pub')
const User = require('../../models/user') // we need our user again to attribute a created animal a user

describe('GET /pubs/:id', () => {

  let pub// we will stored a reference to our created animal here, we will use this pub as the one we are tring to request, we store it so we can get its id to use in the requests

  beforeEach(done => {
    User.create({
      username: 'Jack',
      email: 'jack@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        return Pub.create({
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
          quizTime: '18:30',
          averagePintCost: '£6.50',
          user: user
        })
      })
      .then(createPub => {
        pub = createPub // <==== here is where we set that let abocve as the created pub, we can then access its id in the tests below
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Pub.deleteMany())
      .then(() => done())
  })

  it('should return a 404 not found for an invalid pubs id', done => {
    api.get('/api/pubs/1234')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return a 200 response', done => {
    api.get(`/api/pubs/${pub._id}`) // <=== and using that pub we have created and stored in the requests
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/pubs/${pub._id}`) // <=== and using that pub we have created and stored in the requests
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/pubs/${pub._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          '_id',
          'createdAt',  // invisible key
          'updatedAt',  // invisible key
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
          'averagePintCost',
          'user'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get(`/api/pubs/${pub._id}`)
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
        expect(pub.quizTime).to.be.a('string')
        expect(pub.averagePintCost).to.be.a('string')
        expect(pub.user).to.be.an('object')

        done()
      })
  })

})