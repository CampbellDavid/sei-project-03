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
  .put(secureRoute, pubs.update)
  .get(pubs.show)

// Pub rating
router.route('/pubs/:id/ratings')
  .post(secureRoute, pubs.starRating)

// Pub reviews
router.route('/pubs/:id/reviews')
  .post(secureRoute, pubs.reviewCreate)

router.route('/pubs/:id/reviews/:reviewId')
  .delete(secureRoute, pubs.reviewDelete)



// Events specific to a pub

router.route('/pubs/:id/events')
  .get(events.indexForSpecificPub)
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

router.route('/profiles/:id/messages')
  .post(secureRoute, users.sendMessage)




// Teams

// Short routes

router.route('/teams')
  .get(teams.indexShort)
  .post(secureRoute, teams.create)

router.route('/teams/:teamId')
  .delete(secureRoute, teams.destroy)
  .put(secureRoute, teams.update)
  .post(secureRoute, teams.join)
  .patch(secureRoute, teams.leave)
  .get(teams.show)



// Long routes

router.route('/events/:eventId/teams')
  .get(teams.index)
  .post(secureRoute, teams.create)

router.route('/events/:eventId/teams/:teamId')
  .delete(secureRoute, teams.destroy)
  .put(secureRoute, teams.update)
  .post(secureRoute, teams.join)
  .patch(secureRoute, teams.leave)
  .get(teams.show)

module.exports = router