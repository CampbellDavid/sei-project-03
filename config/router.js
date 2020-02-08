
//!NOT DONE YET. NEED TO UPDATE INDEX.JS FILE FIRST -XUAN

const router = require('express').Router()
const pubs = require('../controllers/pubs') //TODO
const users = require('../controllers/auth') //TODO
const secureRoute = require('../lib/secureRoute') //TODO

router.route('/pubs')
  .get(pubs.index)
  .post(secureRoute, pubs.create)

router.route('/pubs/:id')
  .get(pubs.show)
  .put(secureRoute, pubs.update)
  .delete(secureRoute, pubs.destroy) 

router.route('/pubs/:id/reviews')
  .post(secureRoute, pubs.commentCreate)

router.route('/pubs/:id/reviews/:reviewId') 
  .delete(secureRoute, pubs.commentDelete)

router.route('/register')
  .post(users.register)

router.route('/login') 
  .post(users.login)

router.route('/profile')
  .get(secureRoute, users.profile)

module.exports = router