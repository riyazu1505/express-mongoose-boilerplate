const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  source: { type: String, unique: true },
  vehicle_id: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  source_date: { type: Date },
  source_speed: { type: String },
  source_status: { type: String },
  status: { type: String, default: 'active' },
}, {
  timestamps: true,
  versionKey: false,
  collection: 'vehicle'
})


module.exports = schema
