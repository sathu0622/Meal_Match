const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  userEmail: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Rating', ratingSchema);
