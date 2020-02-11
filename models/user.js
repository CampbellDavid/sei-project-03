const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favouriteDrinks: { type: [String] },
  personalityType: { type: String },
  bio: { type: String },
  age: { type: Number },
  gender: { type: String },
  quizStrengths: { type: [String] },
  profileImage: { type: String }
}, {
  timestamps: true
})


userSchema
  .set('toJSON', {
    virtuals: true,
    transform(doc, json) {
      delete json.password
      return json
    }
  })

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema.virtual('createdTeams', {
  ref: 'Team',
  localField: '_id',
  foreignField: 'teams.user'
})

userSchema.virtual('createdPubs', {
  ref: 'Pub',
  localField: '_id',
  foreignField: 'pubs.user'
})

userSchema.virtual('createdEvents', {
  ref: 'Event',
  localField: '_id',
  foreignField: 'events.user'
})

userSchema
  .pre('validate', function checkPassword(next) {
    if (this.isModified('password') && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function hashpassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(9))
    }
    next()
  })

userSchema.plugin(require('mongoose-unique-validator'))


module.exports = mongoose.model('User', userSchema)