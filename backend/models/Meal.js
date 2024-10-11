const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  category: { type: String, required: true },  // Ensure category is required
  price: Number,
  email: String,
  discount: Number,
  expiryTime: Date,
  isVegetarian: Boolean,
  quantity: { type: Number, default: 0 }  // Default quantity to 0
});


const MealModel = mongoose.model('Meal', MealSchema);  
module.exports = MealModel;
