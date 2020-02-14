const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  event: { type: mongoose.Schema.ObjectId, ref: 'Event' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
})

teamSchema
  .virtual('membersCount')
  .get(function () {
    return this.members.length
  })

teamSchema
  .virtual('captain')
  .get(function () {
    return this.members[0]
  })

teamSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    return json
  }
})

teamSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Team', teamSchema)