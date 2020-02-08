const router = require('express').Router()
const pubs = require('../controllers/pubs') //TODO
const users = require('../controllers/auth') //TODO
const secureRoute = require('../lib/secureRoute') //TODO
const events = require('../controllers/events')//TODO

router.route('/pubs')
  .get(pubs.index)
  .post(secureRoute, pubs.create)

router.route('/pubs/:id')
  .get(pubs.show)
  .put(secureRoute, pubs.update)
  .delete(secureRoute, pubs.destroy)

router.route('/pubs/:id/comments')
  .post(secureRoute, pubs.commentCreate) //reviews?

router.route('/pubs/:id/comments/:commentId') 
  .delete(secureRoute, pubs.commentDelete) // reviews?

router.route('/pubs/:id/like')
  .get(secureRoute, pubs.like) /// do we have likes?

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