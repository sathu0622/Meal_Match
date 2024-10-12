const OrphanageRq = require('../models/OrphanageRq'); 

const createOrphanageRq = async (req, res) => {
  try {
    const orphanageRq = new OrphanageRq(req.body);  // Renamed to avoid conflict
    await orphanageRq.save();
    res.status(201).json(orphanageRq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create OrphanageRq' });
  }
};

const getAllOrphanageRq = async (req, res) => {
  try {
    const orphanageRqList = await OrphanageRq.find();  // Use a descriptive variable name
    res.status(200).json(orphanageRqList);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch OrphanageRq' });
  }
};

const updateOrphanageRq = async (req, res) => {
  try {
    const updatedOrphanageRq = await OrphanageRq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOrphanageRq) {
      return res.status(404).json({ error: 'OrphanageRq not found' });
    }
    res.status(200).json(updatedOrphanageRq);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update OrphanageRq' });
  }
};

// Delete Orphanage Request
const deleteOrphanageRq = async (req, res) => {
  try {
    const orphanageRq = await OrphanageRq.findByIdAndDelete(req.params.id);
    if (!orphanageRq) {
      return res.status(404).json({ error: 'OrphanageRq not found' });
    }
    res.status(200).json({ message: 'OrphanageRq deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete OrphanageRq' });
  }
};

const getDataEmail = async (req, res) => {
  const { email } = req.query;
  
  try {
    const orphanageRq = await OrphanageRq.find({ email });  
    res.json(orphanageRq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createOrphanageRq,
  getAllOrphanageRq,
  updateOrphanageRq,
  deleteOrphanageRq,
  getDataEmail,
};
