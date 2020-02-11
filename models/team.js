const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  captain: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  teamName: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
})

teamSchema
  .virtual('membersCount')
  .get(function () {
    return this.members.length
  })

teamSchema.set('toJSON', { virtuals: true })

teamSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Team', teamSchema)