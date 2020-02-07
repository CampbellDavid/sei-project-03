const mongoose = require('mongoose')

const teamsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

const drinksSchema = new mongoose.Schema({
  favouriteDrinks: { type: String }
})

const strengthSchema = new mongoose.Schema({
  quizStrengths: { type: String }
})

const profileSchema = new mongoose.Schema({
  favouriteDrinks: [ drinksSchema ],
  personalityType: { type: String },
  bio: { type: String },
  age: { type: Number },
  gender: { type: String },
  quizStrengths: [ strengthSchema ],
  teams: { teamsSchema }
})

module.exports = mongoose.model('Profile', profileSchema)