const Review = require("../models/UserReview");

const userReview = async (req, res) => {
  const { email, description, stars } = req.body; 

  try {
    const newReview = new Review({ email, description, stars });
    await newReview.save();

    res.status(201).json({ success: true, message: "User review added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getReview = async (req, res) => {
  try {
    const reviews = await Review.find(); 
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params; 
    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found" });
    }

    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { userReview, getReview ,deleteReview};
