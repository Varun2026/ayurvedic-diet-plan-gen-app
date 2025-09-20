const express = require('express');
const router = express.Router();
const { bookAppointment, getDoctorAppointments } = require('../controllers/appointment.controller');
const { protect } = require('../middleware/auth.middleware'); // Import the middleware

// Public route for patients to book
router.post('/book', bookAppointment);

// Protected route for doctors to get their appointments
router.get('/doctor', protect, getDoctorAppointments);

module.exports = router;