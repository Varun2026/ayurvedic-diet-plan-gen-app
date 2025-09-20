const express = require('express');
const router = express.Router();
const { getDoctors, getDoctorById } = require('../controllers/doctor.controller');

// GET /api/doctors (for searching)
router.get('/', getDoctors);

// GET /api/doctors/:id (for a single profile)
router.get('/:id', getDoctorById);

module.exports = router;