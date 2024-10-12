const express = require('express');
const {
    createOrphanageRq,
    getAllOrphanageRq,
    updateOrphanageRq,
    deleteOrphanageRq,
    getDataEmail,
} = require('../controllers/OrphanageRq_Controller');
const OrphanageRqModel = require('../models/OrphanageRq');
const router = express.Router();

// Create a new meal
router.post('/orp', createOrphanageRq);

// Get all meals
router.get('/orp', getAllOrphanageRq);

router.get('/orpmail', getDataEmail);

// Update a specific meal by ID
router.put('/orp/:id', updateOrphanageRq);

// Delete a specific meal by ID
router.delete('/orp/:id', deleteOrphanageRq);


router.put('/orp/:id/status', async (req, res) => {
    try {
      const updatedRequest = await OrphanageRqModel.findByIdAndUpdate(
        req.params.id, 
        { status: true }, 
        { new: true } // Return the updated document
      );
      if (!updatedRequest) {
        return res.status(404).send('Request not found');
      }
      res.json(updatedRequest);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });


  router.put('/orp/:id/order', async (req, res) => {
    try {
      const updatedRequest = await OrphanageRqModel.findByIdAndUpdate(
        req.params.id, 
        { order: true }, 
        { new: true } // Return the updated document
      );
      if (!updatedRequest) {
        return res.status(404).send('Request not found');
      }
      res.json(updatedRequest);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });


module.exports = router;
