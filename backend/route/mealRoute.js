const express = require('express');
const {
  createMeal,
  getAllMeals,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal_Controller');

const router = express.Router();

// Create a new meal
router.post('/meals', createMeal);

// Get all meals
router.get('/meals', getAllMeals);

// Update a specific meal by ID
router.put('/meals/:id', updateMeal);

// Delete a specific meal by ID
router.delete('/meals/:id', deleteMeal);

module.exports = router;
