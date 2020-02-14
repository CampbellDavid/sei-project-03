const Pub = require('../models/pub')

function index(req, res) {
  Pub
    .find()
    .populate('user')
    .populate({
      path: 'events',
      populate: ({
        path: 'teams',
        // populate: ({
        //   path: 'captain'
        // })
      })
    })
    .populate({
      path: 'events',
      populate: ({
        path: 'teams',
        populate: ({
          path: 'members'
        })
      })
    })
    .populate({
      path: 'events',
      populate: ({
        path: 'teams',
        populate: ({
          path: 'user'
        })
      })
    })
    .then(foundPubs => {
      res.status(200).json(foundPubs)
    })
    .catch(err => res.json(err))
}

function create(req, res, next) {
  req.body.user = req.currentUser
  Pub
    .create(req.body)
    .then(createdPub => res.status(201).json(createdPub))
    .catch(next)
}

function show(req, res, next) {
  Pub
    .findById(req.params.id)
    .populate('user')
    .populate({
      path: 'events',
      populate: ({
        path: 'teams',
        // populate: ({
        //   path: 'captain'
        // })
      })
    })
    .populate({
      path: 'events',
      populate: ({
        path: 'teams',
        populate: ({
          path: 'members'
        })
      })
    })
    .populate({
      path: 'events',
      populate: ({
        path: 'teams',
        populate: ({
          path: 'user'
        })
      })
    })
    .then(pub => {
      if (!pub) return res.status(404).json({ message: 'Not Found' })
      res.status(200).json(pub)
    })
    .catch(next)
}

function update(req, res, next) {
  Pub
    .findById(req.params.id)
    .then(pub => {
      if (!pub) throw new Error('Not Found')
      if (!pub.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      Object.assign(pub, req.body)
      return pub.save()
    })
    .then(updatedPub => res.status(202).json(updatedPub))
    .catch(next)
}

function destroy(req, res) {
  Pub
    .findById(req.params.id)
    .then(pub => {
      if (!pub) return res.status(404).json({ message: 'Not Found' })
      if (!pub.user.equals(req.currentUser._id)) {
        res.status(401).json({ message: 'Unauthorised' })
      } else {
        pub.remove().then(() => res.sendStatus(204))
      }
    })
    .catch(err => res.json(err))
}

// * POST /pubs/:id/reviews 
function reviewCreate(req, res) {
  req.body.user = req.currentUser
  Pub
    .findById(req.params.id)
    .then(pub => {
      if (!pub) return res.status(404).json({ message: 'Not Found' })
      pub.reviews.push(req.body)
      return pub.save()
    })
    .then(pub => res.status(201).json(pub))
    .catch(err => res.json(err))
}

// * DELETE /pubs/:id/reviews/:reviewId
function reviewDelete(req, res) {
  Pub
    .findById(req.params.id)
    .then(pub => {
      if (!pub) return res.status(404).json({ message: 'Not Found ' })
      const review = pub.reviews.id(req.params.reviewId)
      console.log(review)
      if (!review) return res.status(404).json({ message: 'Not Found ' })
      if (!review.user.equals(req.currentUser._id)) return res.status(401).json({ message: 'Unauthorised' })
      review.remove()
      return pub.save()
    })
    .then(pub => res.status(202).json(pub))
    .catch(err => res.json(err))
}

// * GET /pubs/:id/ratings
function starRating(req, res) {
  console.log(req.body)
  Pub
    .findById(req.params.id)
    .then(pub => {
      if (!pub) return res.status(404).json({ message: 'Not Found' })
      if (pub.starRatings.some(starRating => starRating.user.equals(req.currentUser._id))) return pub
      pub.starRatings.push({ user: req.currentUser, rating: req.body.rating })
      return pub.save()
    })
    .then(pub => res.status(202).json(pub))
    .catch(err => res.json(err))
}

module.exports = { index, create, show, update, destroy, reviewCreate, reviewDelete, starRating }

// TODO: toggle star rating function