
//!MOSTLY DONE NOW. BUT CHECK BACK LATER IF NEED TO ADD NEW PAGES

const router = require('express').Router()
const pubs = require('../controllers/pubs') 
const users = require('../controllers/auth') 
const secureRoute = require('../lib/secureRoute')
const events = require('../controllers/events')

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

router.route('/pubs/:id/events')
  .get(events.index)
  .post(secureRoute, events.create)

router.route('/pubs/:id/events/:id')
  .delete(secureRoute, events.destroy)
  .get(events.show)
  .put(secureRoute, events.update)

router.route('/register')
  .post(users.register)

router.route('/login') 
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)

module.exports = router