const Event = require('../models/event')

function index(req, res) {
  Event
    .find()
    .populate('user')
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
  Event
    .findById(req.params.id)
    .populate('user')
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

module.exports = { index, create, show, update, destroy }