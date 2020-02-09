const Profile = require('../models/profile')

function create(req, res, next) {
  req.body.user = req.currentUser
  Profile
    .create(req.body)
    .then(createdProfile => res.status(201).json(createdProfile))
    .catch(next)
}

function show(req, res, next) {
  Profile
    .findById(req.params.id)
    .populate('user')
    .then(profile => { 
      if (!profile) throw new Error('Not Found')
      res.status(200).json(profile)
    })
    .catch(next)
}

function update(req, res, next) {
  Profile
    .findById(req.params.id)
    .then(profile => {
      if (!profile) throw new Error('Not Found')
      if (!profile.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Not Authorized' })
      Object.assign(profile, req.body) 
      return profile.save()  
    })
    .then(updatedProfile => res.status(202).json(updatedProfile)) 
    .catch(next)
}

function destroy(req, res) {
  Profile
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

module.exports = { create, show, update, destroy }