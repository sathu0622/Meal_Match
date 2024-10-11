const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    required: true,
  },
  hotelPhone: {
    type: String,
    required: true,
  },
  hotelLocation: {
    type: String,
    required: true,
  },
  hotelType: {
    type: String,
    required: true,
    enum: ['luxury', 'budget', 'boutique'], 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
}, { timestamps: true });

module.exports = mongoose.model('Hotel', hotelSchema);
