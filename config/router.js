
//!MOSTLY DONE NOW. BUT CHECK BACK LATER IF NEED TO ADD NEW PAGES

const router = require('express').Router()
const secureRoute = require('../lib/secureRoute')

const users = require('../controllers/auth')

const pubs = require('../controllers/pubs')
const events = require('../controllers/events')
// const teams = require('../controllers/teams')


// Pubs

router.route('/pubs')
  .get(pubs.index)
  .post(secureRoute, pubs.create)

router.route('/pubs/:id')
  .get(pubs.show)
  .put(secureRoute, pubs.update)
  .delete(secureRoute, pubs.destroy)

router.route('/pubs/:id/reviews')
  .post(secureRoute, pubs.reviewCreate)

router.route('/pubs/:id/reviews/:reviewId')
  .delete(secureRoute, pubs.reviewDelete)


// Events specific to a pub

router.route('/pubs/:id/events') // post and request data for pub specific events
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/pubs/:id/events/:id')
  .delete(secureRoute, events.destroy)
  .get(events.show)
  .put(secureRoute, events.update)


// All events

router.route('/events')
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/events/:id')
  .delete(secureRoute, events.destroy)
  .get(events.show)
  .put(secureRoute, events.update)


// Auth

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)


// Profiles

router.route('/profiles/:id')
  .delete(secureRoute, users.destroy)
  .put(secureRoute, users.update)
  .get(secureRoute, users.show)


// Teams

// router.route('/profiles')
//   .get(secureRoute, teams.show)
//   .post(secureRoute, teams.create)

// router.route('/profiles/:id')
//   .delete(secureRoute, teams.destroy)
//   .put(secureRoute, teams.update)

module.exports = router