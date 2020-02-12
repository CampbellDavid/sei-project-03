const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  teams: [{ type: mongoose.Schema.ObjectId, ref: 'Team' }],
  entryFee: { type: String, required: true },
  quizDay: { type: String, required: true },
  quizTime: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  pubName: { type: mongoose.Schema.ObjectId, ref: 'Pub' } // require later
})

eventSchema
  .virtual('teamsCount')
  .get(function () {
    return this.teams.length
  })

eventSchema.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    return json
  }
})

eventSchema.plugin(require('mongoose-unique-validator'))

module.exports = mongoose.model('Event', eventSchema)