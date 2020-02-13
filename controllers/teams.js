const Team = require('../models/team')
const Event = require('../models/event')

function index(req, res) {
  Event
    .findById(req.params.eventId)
    .populate({
      path: 'teams',
      populate: ({ path: 'captain' })
    })
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
    .then(foundTeams => res.status(200).json(foundTeams))
    .catch(err => res.json(err))
}

function indexShort(req, res) {
  Team
    .find()
    .populate('captain')
    .populate('members')
    .populate('event')
    .populate('user')
    .then(foundTeams => res.status(200).json(foundTeams))
    .catch(err => res.json(err))
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Team
    .create(req.body)
    .then(createdTeam => res.status(201).json(createdTeam))
    .catch(next)
}

function show(req, res, next) {
  Team
    .findById(req.params.teamId)
    .populate('captain')
    .populate('members')
    .populate('event')
    .populate('user')
    .then(team => {
      if (!team) return res.status(404).json({ message: 'Not Found' })
      res.status(200).json(team)
    })
    .catch(next)
}

function update(req, res, next) {
  Team
    .findById(req.params.teamId)
    .then(team => {
      if (!team) throw new Error('Not Found')
      if (!team.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(team, req.body)
      return team.save()
    })
    .then(updatedTeam => res.status(202).json(updatedTeam))
    .catch(next)
}

function join(req, res, next) {
  req.body.user = req.currentUser
  Team
    .findById(req.params.teamId)
    .then(team => {
      if (!team) throw new Error('Not Found')
      team.members.push(req.body.user)
      return team.save()
    })
    .then(updatedTeam => res.status(201).json(updatedTeam))
    .catch(next)
}

function leave(req, res, next) {
  req.body.user = req.currentUser
  Team
    .findById(req.params.teamId)
    .then(team => {
      if (!team) throw new Error('Not Found')
      team.members.filter(member => {
        member._id !== req.body.user._id
        return team.save()
      })
    })
    .then(updatedTeam => res.status(201).json(updatedTeam))
    .catch(next)
}

function destroy(req, res) {
  Team
    .findById(req.params.teamId)
    .then(team => {
      if (!team) return res.status(404).json({ message: 'Not Found ' })
      if (!team.user.equals(req.currentUser._id)) {
        res.status(401).json({ message: 'Unauthorised' })
      } else {
        team.remove().then(() => res.sendStatus(204))
      }
    })
    .catch(err => res.json(err))
}

module.exports = { index, create, show, update, destroy, join, leave, indexShort }