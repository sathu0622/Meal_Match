const mongoose = require('mongoose');

const OrphanageRqSchema = new mongoose.Schema({
  name: String,
  address: String,
  contectNo: { type: String, required: true },  // Ensure contact number is required
  count: Number,
  items: String,
  comments: String,
  date: Date,
  email: String,
  mealTime: String,
  status: { type: Boolean, default: false }   // Correct the typo here
});

const OrphanageRqModel = mongoose.model('OrphanageRq', OrphanageRqSchema);
module.exports = OrphanageRqModel;
