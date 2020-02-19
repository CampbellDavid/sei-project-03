const Event = require('../models/event')
const Pub = require('../models/pub')

function index(req, res) {
  Event
    .find()
    .populate('user')
    .populate({
      path: 'teams',
      populate: ({ path: 'members' })
    })
    .populate({
      path: 'teams',
      populate: ({ path: 'event' })
    })
    .populate({
      path: 'teams',
      populate: ({ path: 'user' })
    })
    .then(foundEvents => res.status(200).json(foundEvents))
    .catch(err => res.json(err))
}

function indexForSpecificPub(req, res) {
  Pub
    .findById(req.params.id)
    .populate({
      path: 'events',
      populate: ({
        path: 'teams',
        populate: ({
          path: 'members'
        })
      })
    })
    .then(foundEvents => res.status(200).json(foundEvents))
    .catch(err => res.json(err))
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Event
    .create(req.body)
    .then(createdEvent => res.status(201).json(createdEvent))
    .catch(next)
}

function show(req, res, next) {
  console.log(req.params.id)
  Event
    .findById(req.params.id)
    .populate('user')
    .populate({
      path: 'teams',
      populate: ({
        path: 'members'
      })
    })
    .populate({
      path: 'teams',
      populate: ({
        path: 'event'
      })
    })
    .populate({
      path: 'teams',
      populate: ({
        path: 'user'
      })
    })
    .then(event => {
      if (!event) return res.status(404).json({ message: 'Not Found' })
      res.status(200).json(event)
    })
    .catch(next)
}

function update(req, res, next) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) throw new Error('Not Found')
      if (!event.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(event, req.body)
      return event.save()
    })
    .then(updatedEvent => res.status(202).json(updatedEvent))
    .catch(next)
}

function destroy(req, res) {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) return res.status(404).json({ message: 'Not Found' })
      if (!event.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      return event.remove().then(res.sendStatus(204))
    })
    .catch(err => res.json(err))
}

module.exports = { index, create, show, update, destroy, indexForSpecificPub }