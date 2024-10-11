const express = require('express');
const mongoose = require('mongoose');
const mealRoutes = require('./route/mealRoute');
const userRoutes = require("./route/UserDetails");
const orpRoutes = require('./route/OrphanageRqRoute')
const reviewRoutes = require("./route/UserReview");
const hotelRoutes = require("./route/HotelDetails")
const orphanageRoutes = require("./route/OrphanageDetails")

const cors = require('cors');  // Import CORS to handle cross-origin requests

const app = express();

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

app.use('/api', mealRoutes);
app.use('/api', orpRoutes);
app.use("/api/user", userRoutes);
app.use("/api/review", reviewRoutes); 
app.use('/api/hotel', hotelRoutes);
app.use('/api/orphanage', orphanageRoutes);

mongoose.connect('mongodb+srv://spm:IhateSliit31@cluster0.fl3zzyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
