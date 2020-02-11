/* global describe, beforeEach, afterEach, it, api, expect */

const Pub = require('../../models/pub')
const User = require('../../models/user')
const Team = require('../../models/team')

describe('GET /pubs/:id/teams', () => {

  beforeEach(done => {
    User.create({
      username: 'UserOne',
      email: 'email@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        Pub.create([
          {
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
          }, {
            name: 'The Red Lion',
            image: 'http://www.pubquizzers.com/images/pubs/abbey-bar_560.jpg',
            city: 'London',
            streetName: '48 Parliament St',
            postcode: 'SW1A 2NH',
            phone: '020 7930 5826',
            website: 'redlionwestminster.co.uk',
            description: 'Westminster pub with elaborate ceiling, politicians\' portraits and illustrious former clientele.',
            maxTeamSize: 6,
            quizDay: 'Friday',
            quizTime: '19:00',
            averagePintCost: '£5.00',
            user: user
          }
        ])
      })
      .then(createdPub => {
        pub = createdPub
        return Team.create({
          teamName: 'New Team'
        })
      })
      .then(() => done())
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Pub.deleteMany())
      .then(() => Team.deleteMany())
      .then(() => done())
  })

  it('should return 200 res', done => {
    api.get(`/api/pubs/${pub._id}/team`)
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return array', done => {
    api.get(`/api/pubs/${pub._id}/team`)
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('should return array of objs', done => {
    api.get(`/api/pubs/${pub._id}/team`)
      .end((err, res) => {
        res.body.forEach(pub => {
          expect(pub).to.be.an('object')
        })
        done()
      })
  })

  it('should return array of objs with correct fields and data types', done => {
    api.get(`/api/pubs/${pub._id}/team`)
      .end((err, res) => {
        res.body.forEach(pub => {

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
          expect(pub.averagePintCost).to.be.a('string')
          expect(pub.user).to.be.an('object')

        })
        done()
      })
  })

  it('should return an array of objects with the correct fields', done => {
    api.get(`/api/pubs/${pub._id}/team`)
      .end((err, res) => {
        res.body.forEach(pub => {
          expect(pub).to.contains.keys([
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
            'averagePintCost',
            'user'
          ])
        })
        done()
      })
  })

})