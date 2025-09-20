const express = require('express');
const router = express.Router();
const { getDoctors } = require('../controllers/doctor.controller');

// This single route will handle all doctor searches
router.get('/', getDoctors);

module.exports = router;