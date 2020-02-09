const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  teamName: { type: String, required: true },
  entryFee: { type: String },
  quizDay: { type: String },
  quizTime: { type: String }
}
)

module.exports = mongoose.model('Event', eventSchema)