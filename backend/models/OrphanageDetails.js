const mongoose = require('mongoose');

const orphanageSchema = new mongoose.Schema({
  orphanageName: { type: String, required: true },
  orphanagePhone: { type: String, required: true },
  orphanageLocation: { type: String, required: true },
  orphanageCategories: { type: [String], required: true }, 
  numberOfPersons: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    trim: true,
  }
});

module.exports = mongoose.model('Orphanage', orphanageSchema);