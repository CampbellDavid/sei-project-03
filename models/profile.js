const mongoose = require('mongoose')

const teamsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

const profileSchema = new mongoose.Schema({
  favouriteDrinks: { type: String },
  personalityType: { type: String },
  bio: { type: String },
  age: { type: Number },
  gender: { type: String },
  quizStrengths: { type: String },
  teams: { teamsSchema }
})

module.exports = mongoose.model('Profile', profileSchema)