const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
  member: { type: String }
})

const teamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  teamName: { type: String, required: true },
  member: [ memberSchema ]
})

module.exports = mongoose.model('Team', teamSchema) 