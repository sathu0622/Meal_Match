// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());



// // MongoDB Connection
// mongoose.connect('mongodb+srv://spm:IhateSliit31@cluster0.fl3zzyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.log(err));

// // Define Schema
// const MealSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   quantity: Number
// });

// const Meal = mongoose.model('Meal', MealSchema);

// // Create Meal
// app.post('/meals', async (req, res) => {
//   const meal = new Meal(req.body);
//   await meal.save();
//   res.json(meal);
// });

// // Read all Meals
// app.get('/meals', async (req, res) => {
//   const meals = await Meal.find();
//   res.json(meals);
// });

// // Update Meal
// app.put('/meals/:id', async (req, res) => {
//   const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(meal);
// });

// // Delete Meal
// app.delete('/meals/:id', async (req, res) => {
//   await Meal.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Meal deleted' });
// });

// app.listen(5000, () => console.log('Server running on port 5000'));


const express = require('express');
const mongoose = require('mongoose');
const mealRoutes = require('./route/mealRoute');
const cors = require('cors');  // Import CORS to handle cross-origin requests

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// Routes
app.use('/api', mealRoutes);

// MongoDB Connection
mongoose.connect('mongodb+srv://spm:IhateSliit31@cluster0.fl3zzyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
