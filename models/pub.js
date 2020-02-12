const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  text: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const starRatingSchema = new mongoose.Schema({
  rating: { type: Number, min: 1, max: 5 },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

const pubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  city: { type: String, required: true },
  streetName: { type: String, required: true },
  postcode: { type: String, required: true, unique: true },
  phone: { type: String },
  website: { type: String },
  description: { type: String, maxlength: 500 },
  maxTeamSize: { type: Number, required: true },
  quizDay: { type: String, required: true },
  quizTime: { type: String, required: true },
  starRatings: [starRatingSchema],
  averagePintCost: { type: String, required: true },
  reviews: [reviewSchema],
  events: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

pubSchema
  .virtual('starRatingCount')
  .get(function () {
    return this.starRatings.length
  })

pubSchema
  .virtual('aveRating')
  .get(function () {
    if (this.starRating.length === 0) {
      return null
    } else {
      return this.starRating.reduce((acc, curr) => acc + curr) / this.starRating.length
    }
  })

pubSchema.set('toJSON', { virtuals: true })

pubSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Pub', pubSchema)