const mongoose = require('mongoose');

const OrphanageRqSchema = new mongoose.Schema({
  name: String,
  address: String,
  contactNo: { type: String, required: true },  
  count: Number,
  items: String,
  comments: String,
  date: Date,
  email: String,
  mealTime: String,
  status: { type: Boolean, default: false },
  order: { type: Boolean, default: false }
});


const OrphanageRqModel = mongoose.model('OrphanageRq', OrphanageRqSchema);
module.exports = OrphanageRqModel;
