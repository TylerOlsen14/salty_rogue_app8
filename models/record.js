const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const RecordSchema = new Schema({
  ClientName: {
    type: String,
    required: false
  },
  ClientPhoneNumber: {
    type: Number,
    required: false,
  },
  ClientNotes: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Record = mongoose.model('client', RecordSchema);