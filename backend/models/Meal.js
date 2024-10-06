const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    itemName: String,
    description: String,  // Added description field
    price: Number,
    discount: Number,
    quantity: Number,
    expTime: Date,
    isVegetarian: Boolean  // Added isVegetarian field
});

const MealModel = mongoose.model('Meal', MealSchema);  // Updated model name capitalization for consistency
module.exports = MealModel;
