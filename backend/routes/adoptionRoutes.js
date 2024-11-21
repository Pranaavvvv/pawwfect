const express = require('express');
const router = express.Router();
const { createAdoption, getAllApplications } = require('../controllers/adoptionController');

router.post('/submit', createAdoption);
router.get('/applications', getAllApplications);

module.exports = router;
