const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
},
{
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
  starRating: { type: Array },
  averagePintCost: { type: String, required: true },
  reviews: [ reviewSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
})

pubSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Pub', pubSchema)