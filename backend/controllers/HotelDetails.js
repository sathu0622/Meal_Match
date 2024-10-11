const Hotel = require('../models/HotelDetails');

const registerHotel = async (req, res) => {
  const { hotelName, hotelPhone, hotelLocation, hotelType, email } = req.body;

  try {
    const newHotel = new Hotel({
      hotelName,
      hotelPhone,
      hotelLocation,
      hotelType,
      email,
    });

    await newHotel.save();
    res.status(201).json({ success: true, message: 'Hotel registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed', error: error.message });
  }
};

const getHotel = async (req, res) => {
  try {
    const hotels = await Hotel.find(); 
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerHotel, getHotel };