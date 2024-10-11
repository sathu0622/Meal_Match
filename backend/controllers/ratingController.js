const Rating = require('../models/Rating');

// Create a new rating
exports.createRating = async (req, res) => {
  try {
    const rating = new Rating(req.body);
    await rating.save();
    res.status(201).json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all ratings
exports.getRatings = async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a rating
exports.updateRating = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await Rating.findByIdAndUpdate(id, req.body, { new: true });
    res.json(rating);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a rating
exports.deleteRating = async (req, res) => {
  try {
    const { id } = req.params;
    await Rating.findByIdAndDelete(id);
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
