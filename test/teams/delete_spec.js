/* global api, describe, it, expect, beforeEach, afterEach */

const Team = require('../../models/team')
const Pub = require('../../models/pub')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = [{ // creating two users here for this test, will use the second user to test that they cannot update an pub they did not create, will also do the same with delete
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'testTwo',
  email: 'testTwo@email',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('DELETE /pubs/:id/teams/:id', () => {
  let token = null
  let incorrectToken = null
  let pub = null
  let team = null

  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Pub.create({
          name: 'Abbey Bar',
          image: 'http://www.pubquizzers.com/images/pubs/abbey-bar_560.jpg',
          city: 'London',
          streetName: 'Tower Hill',
          postcode: 'EC3N 1DD',
          phone: '020 7488 1918',
          website: 'abbey-bar.co.uk',
          description: 'Join us at Abbey for our Legendary pub quiz. The winning team will walk away with a £250 bar tab to use at Abbey, as well as a trophy to keep until the next quiz. Entry is FREE and complimentary nibbles are provided throughout the evening.',
          maxTeamSize: '8',
          quizDay: 'Tuesday',
          quizTime: '18:30',
          averagePintCost: '£6.50',
          user: users[0]
        })
      })
      .then(createdPub => {
        pub = createdPub // and storing our created pub
        return Team.create({
          teamName: 'New Team'
        })
      })
      .then(createdTeam => {
        team = createdTeam
        done()
      })
  })

  afterEach(done => { // as always removing any pubs and users after the tests are complete
    User.deleteMany()
      .then(() => Pub.deleteMany())
      .then(() => Team.deleteMany())
      .then(() => done())
  })

  it('should return a 401 response without a token', done => {
    api.delete(`/api/pubs/${pub._id}/teams/${team._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

  it('should return a 204 response with a token', done => {
    api.delete(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })

  it('should return no data', done => {
    api.delete(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })

  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/pubs/${pub._id}/teams/${team._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })

})