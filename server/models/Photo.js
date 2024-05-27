// models/Photo.js
const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  myear: {
    type: String,
    required: true,
  },
  monthlyRate: {
    type: Number,
    required: true,
  },
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
