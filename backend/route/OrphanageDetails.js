const express = require('express');
const router = express.Router();
const { registerOrphanage } = require('../controllers/OrphanageDetails');

router.post('/register', registerOrphanage);

module.exports = router;
