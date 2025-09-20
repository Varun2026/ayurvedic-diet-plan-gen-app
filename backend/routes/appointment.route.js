const express = require('express');
const router = express.Router();
// This line now correctly imports all four functions from the controller
const { bookAppointment, getDoctorAppointments, getAppointmentById, getPatientAppointments } = require('../controllers/appointment.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/book', bookAppointment);
router.get('/doctor', protect, getDoctorAppointments);
router.get('/patient', protect, getPatientAppointments); // This route will now work
router.get('/:id', protect, getAppointmentById);

module.exports = router;
