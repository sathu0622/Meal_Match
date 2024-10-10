const Meal = require('../models/Meal'); // Assuming you have a Meal model


// Create Meal
const createMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create meal' });
  }
};



// Read all Meals
// const getAllMeals = async (req, res) => {
//   try {
//     const meals = await Meal.find();
//     res.status(200).json(meals);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch meals' });
//   }
// };

const getAllMeals = async (req, res) => {
  const { email } = req.query;
  
  try {
    const meals = await Meal.find({ email });  // Use 'Meal' instead of 'MealModel'
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Update Meal
const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update meal' });
  }
};

// Delete Meal
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    res.status(200).json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete meal' });
  }
};


module.exports = {
  createMeal,
  getAllMeals,
  updateMeal,
  deleteMeal,
  // Export the new function
};
