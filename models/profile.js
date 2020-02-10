const mongoose = require('mongoose')

const drinksSchema = new mongoose.Schema({
  favouriteDrink: { type: String }
})

const strengthSchema = new mongoose.Schema({
  quizStrength: { type: String }
})

const profileSchema = new mongoose.Schema({
  favouriteDrinks: [ drinksSchema ],
  personalityType: { type: String },
  bio: { type: String },
  age: { type: Number },
<<<<<<< HEAD
  gender: { type: String },
  quizStrengths: [ strengthSchema ]
=======
  gender: { type: String }
  // quizStrengths: [ strengthSchema ]
>>>>>>> development
})

module.exports = mongoose.model('Profile', profileSchema)