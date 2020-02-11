const router = require('express').Router()
const secureRoute = require('../lib/secureRoute')

const users = require('../controllers/auth')
const pubs = require('../controllers/pubs')
const events = require('../controllers/events')
const teams = require('../controllers/teams')


// Pubs

router.route('/pubs')
  .get(pubs.index)
  .post(secureRoute, pubs.create)

router.route('/pubs/:id')
  .delete(secureRoute, pubs.destroy)
  .get(pubs.show)
  .put(secureRoute, pubs.update)

// Pub likes
router.route('/pubs/:id/likes')
  .get(secureRoute, pubs.like)

// Pub reviews
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
  .get(users.show)
  .put(secureRoute, users.update)



// Teams

router.route('/pubs/:id/teams')
  .get(teams.index)
  .post(secureRoute, teams.create)

router.route('/pubs/:id/teams/:teamId')
  .delete(secureRoute, teams.destroy)
  .get(teams.show)
  .put(secureRoute, teams.update)

module.exports = router

// TODO: teams to be linked to event route instead of pub route