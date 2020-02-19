const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

function register(req, res) {
  User
    .create(req.body)
    .then(user => res.status(201).json({ 'message': `Registered with username: ${user.username}` }))
    .catch(err => res.status(422).json(err))
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
        userId: user._id,
        token
      })
    })
    .catch(err => res.status(422).json(err))
}

function displayProfileCreations(req, res) {
  User
    .findById(req.currentUser._id)
    .populate('createdPubs')
    .populate('createdEvents')
    .populate('createdTeams')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(422).json(err))
}

function show(req, res, next) {
  User
    .findById(req.params.id)
    .populate('user')
    .then(profile => {
      if (!profile) throw new Error('Not Found')
      res.status(200).json(profile)
    })
    .catch(next)
}

function update(req, res, next) {
  User
    .findById(req.params.id)
    .then(profile => {
      if (!profile) throw new Error('Not Found')
      if (!profile.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Not Authorized' })
      Object.assign(profile, req.body)
      return profile.save()
    })
    .then(updatedProfile => res.status(201).json(updatedProfile))
    .catch(next)
}

function destroy(req, res) {
  User
    .findById(req.params.id)
    .then(profile => {
      if (!profile) return res.status(404).json({ message: 'Not Found' })
      if (!profile.user.equals(req.currentUser._id)) {
        res.status(401).json({ message: 'Not Authorized' })
      } else {
        profile.remove().then(() => res.sendStatus(204))
      }
    })
    .catch(err => res.json(err))
}

function sendMessage(req, res) {
  User
    .findById(req.params.id)
    .then(profile => {
      if (!profile) return res.status(404).json({ message: 'Not Found' })
      if (!profile.user.equals(req.currentUser._id)) {
        res.status(401).json({ message: 'Not Authorized' })
      } else {
        profile.remove().then(() => res.sendStatus(204))
      }
    })
    .catch(err => res.json(err))
}

module.exports = { register, login, displayProfileCreations, show, update, destroy, sendMessage }