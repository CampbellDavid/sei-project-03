const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  captain: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }, // change to reflect most senior team member
  teamName: { type: String, required: true, unique: true },
  event: { type: mongoose.Schema.ObjectId, ref: 'Event' },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

teamSchema
  .virtual('membersCount')
  .get(function () {
    return this.members.length
  })

teamSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    return json
  }
})

teamSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Team', teamSchema)