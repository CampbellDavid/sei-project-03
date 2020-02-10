const User = require('../models/user')
const jwt = require('jsonwebtoken')
const  { secret } = require('../config/environment')

function register(req, res) { 
  User
    .create(req.body)
    .then(user => res.status(201).json({ 'message': `Registered with username: ${user.username}` }))
    .catch(err => res.status(422).res.json(err))
}

function login(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        return res.status(401).json({ message: 'Incorrect Credentials' })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '24h' })
      res.status(202).json({
        message: `Hello ${user.username}, welcome back!`,
        token
      })
    })
    .catch(err => res.status(422).res.json(err))
}


function profile(req, res) {
  User
    .findById(req.currentUser._id)
    .populate('createdPubs')
    .populate('createdEvents')
    .populate('createdTeams')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(422).res.json(err))
}

module.exports = { register, login, profile }