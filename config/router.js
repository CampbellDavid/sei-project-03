const router = require('express').Router()
const secureRoute = require('../lib/secureRoute')

const users = require('../controllers/auth')
const pubs = require('../controllers/pubs')
const events = require('../controllers/events')
const teams = require('../controllers/teams')


// Pubs

router.route('/pubs') // done
  .get(pubs.index)
  .post(secureRoute, pubs.create)

router.route('/pubs/:id') // done
  .delete(secureRoute, pubs.destroy)
  .put(secureRoute, pubs.update)
  .get(pubs.show)

// Pub rating
router.route('/pubs/:id/ratings') // done
  .get(secureRoute, pubs.starRating)

// Pub reviews
router.route('/pubs/:id/reviews') // done
  .post(secureRoute, pubs.reviewCreate)

router.route('/pubs/:id/reviews/:reviewId') // done
  .delete(secureRoute, pubs.reviewDelete)



// Events specific to a pub

router.route('/pubs/:id/events') // done
  .get(events.indexForSpecificPub)
  .post(secureRoute, events.create)

router.route('/pubs/:id/events/:id') // done
  .delete(secureRoute, events.destroy)
  .get(events.show)
  .put(secureRoute, events.update)

// All events

router.route('/events') // done
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/events/:id') // done
  .delete(secureRoute, events.destroy)
  .get(events.show)
  .put(secureRoute, events.update)



// Auth

router.route('/register') // done
  .post(users.register)

router.route('/login') // done
  .post(users.login)



// Profiles

router.route('/profiles/:id') // come back to
  .delete(secureRoute, users.destroy)
  .get(users.show)
  .put(secureRoute, users.update)

router.route('/profiles/:id/messages') // necessary???
  .post(secureRoute, users.sendMessage)
  



// Teams

router.route('/events/:eventId/teams') // done
  .get(teams.index)
  .post(secureRoute, teams.create)

router.route('/events/:eventId/teams/:teamId') // done
  .delete(secureRoute, teams.destroy)
  .put(secureRoute, teams.update)
  .put(secureRoute, teams.join)
  .put(secureRoute, teams.leave) // check for functionality
  .get(teams.show)

module.exports = router