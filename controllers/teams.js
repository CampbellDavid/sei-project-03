//TODO 

//* CREATE 
//* UPDATE
//* DESTROY


const Pub = require('../models/pub')

function create(req, res, next) {
  req.body.user = req.currentUser
  Team
    .create(req.body)
    .then(createdPub => res.status(201).json(createdPub))
    .catch(next)
}


module.exports = { create, update, destroy }
