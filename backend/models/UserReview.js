const mongoose = require("mongoose");

const userReviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  stars: {
    type: Number, 
    required: true,
  },
});

const Review = mongoose.model("Review", userReviewSchema);

module.exports = Review;
