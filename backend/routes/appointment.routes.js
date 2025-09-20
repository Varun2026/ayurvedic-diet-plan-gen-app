const express = require('express');
const router = express.Router();
const { bookAppointment } = require('../controllers/appointment.controller');

router.post('/book', bookAppointment);

module.exports = router;