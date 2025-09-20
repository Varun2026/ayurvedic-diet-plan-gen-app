const express = require('express');
const router = express.Router();
const { bookAppointment, getDoctorAppointments, getAppointmentById } = require('../controllers/appointment.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/book', bookAppointment);
router.get('/doctor', protect, getDoctorAppointments);
router.get('/:id', protect, getAppointmentById); // Add this route

module.exports = router;