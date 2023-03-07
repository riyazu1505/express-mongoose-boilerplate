const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  userid: { type: String, required: true },
  socketid: { type: String, required: true, default: null },
}, {
  timestamps: true,
  versionKey: false,
  collection: 'Users'
})


module.exports = schema
