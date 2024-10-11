const Orphanage = require('../models/OrphanageDetails');

const registerOrphanage = async (req, res) => {
  const { orphanageName, orphanagePhone, orphanageLocation, orphanageCategories, numberOfPersons, email } = req.body;
  console.log(req.body); 
  try {
    const newOrphanage = new Orphanage({
      orphanageName,
      orphanagePhone,
      orphanageLocation,
      orphanageCategories,
      numberOfPersons,
      email,
    });

    const savedOrphanage = await newOrphanage.save();
    res.status(201).json({ success: true, orphanage: savedOrphanage });
  } catch (error) {
    console.error("Orphanage save error: ", error); 
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerOrphanage };