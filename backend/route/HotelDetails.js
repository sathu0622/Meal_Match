const express = require('express');
const { registerHotel , getHotel} = require('../controllers/HotelDetails');

const router = express.Router();

router.post('/register', registerHotel);
router.get('/getHotels',getHotel)

module.exports = router;
